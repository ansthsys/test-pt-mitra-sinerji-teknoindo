import { useState, useRef, forwardRef, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
    PencilSquareIcon,
    ArchiveBoxXMarkIcon,
} from "@heroicons/react/20/solid";
import FormListBarangTotalCreate from "./FormListBarangTotalCreate";
import ModalListBarang from "./ModalListBarang";

const ModalCreateItem = forwardRef(function (props, ref) {
    return (
        <ModalListBarang
            modalRef={ref}
            items={props.items}
            modalMode={props.modalMode}
            selectedItem={props.selectedItem}
            setSelectedItem={props.setSelectedItem}
        />
    );
});

export default function FormListBarangCreate({
    items,
    itemsTemp,
    data,
    setData,
    errors,
}) {
    const [modalMode, setModalMode] = useState("Buat");
    const [selectedItem, setSelectedItem] = useState(null);
    const modalRef = useRef();

    const formatCurrency = (value) => {
        if (!value) {
            return "-";
        } else {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(value);
        }
    };

    const openModalCreate = () => {
        setModalMode("Buat");
        setSelectedItem(null);
        modalRef.current.showModal();
    };

    const openModalEdit = (row) => {
        setModalMode("Ubah");
        setSelectedItem(row);
        modalRef.current.showModal();
    };

    const handleDelete = (id) => {
        router.delete(route("transaction.deleteByIdTmpItem", id), {
            replace: true,
            onSuccess: () => {
                console.log("success delete");
                router.get(
                    route("transaction.create"),
                    {},
                    {
                        replace: true,
                        preserveState: true,
                        only: ["items"],
                    }
                );
            },
        });
    };

    useEffect(() => {}, [itemsTemp, data]);

    return (
        <>
            <div className="card card-compact w-full bg-base-100 rounded-lg shadow-xl py-3">
                <div className="card-body">
                    <div className="w-full flex flex-row justify-between items-center mb-5">
                        <p className="card-title">List Barang</p>
                        <button
                            className="btn btn-neutral btn-sm join-item"
                            onClick={openModalCreate}
                        >
                            <PlusIcon className="size-5 text-content-neutral" />
                            <span className="hidden sm:inline">Barang</span>
                        </button>
                    </div>

                    <div className="overflow-x-auto max-h-96 min-h-44">
                        <table className="table">
                            <thead className="sticky top-0 bg-base-100 z-10">
                                <tr>
                                    <th className="text-center" rowSpan="2">
                                        No
                                    </th>
                                    <th className="text-center" rowSpan="2">
                                        Kode Barang
                                    </th>
                                    <th className="text-center" rowSpan="2">
                                        Nama Barang
                                    </th>
                                    <th className="text-center" rowSpan="2">
                                        Qty
                                    </th>
                                    <th className="text-center" rowSpan="2">
                                        Harga Bandrol
                                    </th>
                                    <th className="text-center" colSpan="2">
                                        Diskon
                                    </th>
                                    <th className="text-center" rowSpan="2">
                                        Harga Diskon
                                    </th>
                                    <th className="text-center" rowSpan="2">
                                        Total
                                    </th>
                                    <th
                                        className="text-center md:min-w-52"
                                        colSpan="2"
                                        rowSpan="2"
                                    >
                                        Aksi
                                    </th>
                                </tr>
                                <tr>
                                    <th className="text-center">(%)</th>
                                    <th className="text-center">(Rp)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemsTemp.length > 0 ? (
                                    itemsTemp?.map((item, index) => {
                                        return (
                                            <tr className="hover" key={index}>
                                                <th>{index + 1}</th>
                                                <td>{item.kodeBarang}</td>
                                                <td>{item.namaBarang}</td>
                                                <td className="text-center">
                                                    {item.jumlah}
                                                </td>
                                                <td className="text-right">
                                                    {formatCurrency(item.harga)}
                                                </td>
                                                <td className="text-center">
                                                    {item.diskonPct}%
                                                </td>
                                                <td className="text-right">
                                                    {formatCurrency(
                                                        item.diskonNilai
                                                    )}
                                                </td>
                                                <td className="text-right">
                                                    {formatCurrency(
                                                        item.hargaDiskon
                                                    )}
                                                </td>
                                                <td className="text-right">
                                                    {formatCurrency(item.total)}
                                                </td>
                                                <td>
                                                    <div className="flex gap-3 items-center justify-center">
                                                        <button
                                                            className="btn btn-xs btn-outline"
                                                            onClick={(e) => {
                                                                openModalEdit(
                                                                    item
                                                                );
                                                            }}
                                                        >
                                                            <PencilSquareIcon className="size-4" />{" "}
                                                            <span className="hidden md:inline">
                                                                Ubah
                                                            </span>
                                                        </button>
                                                        <button
                                                            className="btn btn-xs btn-outline"
                                                            onClick={(e) =>
                                                                handleDelete(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            <ArchiveBoxXMarkIcon className="size-4" />{" "}
                                                            <span className="hidden md:inline">
                                                                Hapus
                                                            </span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr className="hover">
                                        <td
                                            colSpan={11}
                                            className="text-center"
                                        >
                                            Tidak ada pembelian barang
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <FormListBarangTotalCreate
                        items={items}
                        data={data}
                        setData={setData}
                        errors={errors}
                    />
                </div>
            </div>

            <ModalCreateItem
                items={items}
                ref={modalRef}
                modalMode={modalMode}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
            />
        </>
    );
}
