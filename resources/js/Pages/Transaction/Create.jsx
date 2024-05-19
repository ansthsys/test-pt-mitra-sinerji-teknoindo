import { useEffect, useState } from "react";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import HeaderCreate from "@/Components/HeaderCreate";
import FormTransaksiCreate from "@/Components/FormTransaksiCreate";
import FormKustomerCreate from "@/Components/FormKustomerCreate";
import FormListBarangCreate from "@/Components/FormListBarangCreate";

export default function Create({ noTransaksi, customers, items, itemsTemp }) {
    const { data, setData, post, processing, errors, transform } = useForm({
        noTransaksi: noTransaksi,
        tglTransaksi: "",
        idKustomer: "",
        kodeKustomer: "",
        namaKustomer: "",
        telpKustomer: "",
        subtotal: "",
        diskon: "",
        ongkir: "",
        totalBayar: "",
        items: [],
    });

    const countSubtotal = (arr) => {
        if (arr.length < 1) return "";

        return arr?.reduce((acc, item) => {
            return acc + item.total;
        }, 0);
    };

    const countTotalBayar = () => {
        console.log("count total bayar");

        setData((prev) => {
            const subtotal = parseFloat(Number(prev.subtotal));
            const diskon = parseFloat(Number(prev.diskon));
            const ongkir = parseFloat(Number(prev.ongkir));
            const totalBayar = parseFloat(Number(subtotal - (diskon + ongkir)));

            return {
                ...prev,
                totalBayar,
            };
        });
    };

    const initFormPricing = () => {
        console.log("init form pricing");
        const subtotal = countSubtotal(itemsTemp);

        setData({
            ...data,
            subtotal,
            totalBayar: subtotal,
        });
    };

    const handleCancel = (e) => {
        e.preventDefault();
        router.delete(route("transaction.deleteAllTmpItem"));
    };

    const hanldeSubmit = () => {
        transform((data) => {
            return {
                ...data,
                items: itemsTemp,
            };
        });

        post(route("transaction.store"));
    };

    const onBackButtonEvent = (e) => {
        e.preventDefault();
        router.get(
            e.target.location.href,
            {},
            {
                replace: true,
                onSuccess: () => {
                    router.delete(route("transaction.deleteAllTmpItem"));
                },
            }
        );
    };

    useEffect(() => {
        initFormPricing();
        countTotalBayar();
        window.addEventListener("popstate", onBackButtonEvent);

        return () => {
            countTotalBayar();
            window.removeEventListener("popstate", onBackButtonEvent);
        };
    }, [data.diskon, data.ongkir, itemsTemp]);

    return (
        <Layout titlePage="Tambah Transaksi" headComponent={<HeaderCreate />}>
            <Head title="Tambah Transaksi" />

            <div className="flex flex-col md:flex-row justify-center md:justify-start items-center md:items-start gap-5">
                <FormTransaksiCreate
                    data={data}
                    setData={setData}
                    errors={errors}
                />
                <FormKustomerCreate
                    data={data}
                    setData={setData}
                    errors={errors}
                    customers={customers}
                />
            </div>

            <div className="divider"></div>

            <div className="">
                <FormListBarangCreate
                    itemsTemp={itemsTemp}
                    items={items}
                    data={data}
                    setData={setData}
                    errors={errors}
                />
            </div>

            <div className="divider"></div>

            <div className="w-full flex flex-row items-center justify-center gap-5">
                <button
                    className="btn btn-sm btn-neutral"
                    onClick={hanldeSubmit}
                    disabled={processing}
                >
                    Simpan
                </button>
                <button
                    className="btn btn-sm btn-outline"
                    disabled={processing}
                    onClick={handleCancel}
                >
                    Batal
                </button>
            </div>
        </Layout>
    );
}
