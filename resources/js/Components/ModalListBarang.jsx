import { useEffect, useState } from "react";
import { router, useForm } from "@inertiajs/react";
import TabelModalListBarang from "./TabelModalListBarang";
import InputRequired from "./InputRequired";
import LabelErrorInput from "./LabelErrorInput";

export default function ModalListBarang({
    items,
    modalRef,
    modalMode,
    selectedItem,
    setSelectedItem,
}) {
    const { data, setData, post, patch, processing, errors, reset } = useForm({
        id: "",
        idBarang: "",
        kode: "",
        nama: "",
        harga: "",
        jumlah: "",
        diskon: "",
    });

    const formatCurrency = (value) => {
        // if (!value) {
        //     return "0";
        // }

        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(value);
    };

    const checkMode = (selectedItem) => {
        const createData = (prev) => {
            if (modalMode === "Ubah" && selectedItem) {
                return {
                    id: selectedItem.id ?? "",
                    idBarang: selectedItem.idBarang ?? "",
                    kode: selectedItem.kodeBarang,
                    nama: selectedItem.namaBarang,
                    harga: selectedItem.harga,
                    jumlah: selectedItem.jumlah,
                    diskon: selectedItem.diskonPct,
                };
            } else {
                return prev;
            }
        };

        setData((prev) => createData(prev));
    };

    const handleSave = (e) => {
        e.preventDefault();
        const options = {
            replace: true,
            onSuccess: () => {
                reset();
                // router.get(
                //     route("transaction.create"),
                //     {},
                //     { replace: true, preserveState: true, only: ["items"] }
                // );
                modalRef.current.close();
            },
        };

        if (modalMode === "Buat") {
            post(route("transaction.storeTmpItem"), options);
        } else {
            patch(route("transaction.editByIdTmpItem", [data.id]), options);
        }
    };

    const handleCancel = (e) => {
        reset();
        setSelectedItem(null);
        console.log(data);
        return;
    };

    useEffect(() => {
        checkMode(selectedItem);
    }, [modalMode, selectedItem]);

    return (
        <dialog id="modal_item" ref={modalRef} className="modal px-5">
            <div className="modal-box w-full max-w-screen-md">
                <h3 className="font-bold text-lg mb-5 sticky top-0 z-20 bg-base-100">
                    {modalMode} Barang
                </h3>

                <div className="">
                    <TabelModalListBarang
                        data={data}
                        setData={setData}
                        items={items}
                        modalMode={modalMode}
                        selectedItem={selectedItem}
                    />

                    <div className="flex flex-col items-end justify-center gap-3 sm:justify-end w-full my-5">
                        <input hidden defaultValue={data.idBarang} readOnly />

                        <div className="w-full sm:max-w-64 max-w-xs">
                            <div className="flex flex-row justify-between items-center">
                                <p className="text-sm font-medium">
                                    Kode <InputRequired />
                                </p>

                                <label className="form-control w-full max-w-40 sm:max-w-44">
                                    <input
                                        type="text"
                                        placeholder="Kode"
                                        className="input input-bordered input-sm bg-gray-200 w-full max-w-40 sm:max-w-44"
                                        defaultValue={data.kode}
                                        readOnly
                                    />
                                </label>
                            </div>

                            {errors?.idBarang && (
                                <div className="flex justify-end">
                                    <div className="w-full max-w-40 sm:max-w-44">
                                        <LabelErrorInput
                                            message={
                                                "Pilih barang terlebih dahulu"
                                            }
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="w-full sm:max-w-64 max-w-xs">
                            <div className="flex flex-row justify-between items-center">
                                <p className="text-sm font-medium">
                                    Nama <InputRequired />
                                </p>

                                <label className="form-control w-full max-w-40 sm:max-w-44">
                                    <input
                                        type="text"
                                        placeholder="Nama"
                                        className="input input-bordered input-sm bg-gray-200 w-full max-w-40 sm:max-w-44"
                                        defaultValue={data.nama}
                                        readOnly
                                    />
                                </label>
                            </div>

                            {errors?.idBarang && (
                                <div className="flex justify-end">
                                    <div className="w-full max-w-40 sm:max-w-44">
                                        <LabelErrorInput
                                            message={
                                                "Pilih barang terlebih dahulu"
                                            }
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="w-full sm:max-w-64 max-w-xs">
                            <div className="flex flex-row justify-between items-center">
                                <p className="text-sm font-medium">
                                    Harga <InputRequired />
                                </p>

                                <label className="form-control w-full max-w-40 sm:max-w-44">
                                    <input
                                        type="number"
                                        placeholder="Harga"
                                        className="input input-bordered input-sm bg-gray-200 w-full max-w-40 sm:max-w-44"
                                        defaultValue={data.harga}
                                        readOnly
                                        hidden
                                    />
                                    <div className="input input-bordered input-sm bg-gray-200 w-full max-w-40 sm:max-w-44">
                                        {formatCurrency(data.harga)}
                                    </div>
                                </label>
                            </div>

                            {errors?.idBarang && (
                                <div className="flex justify-end">
                                    <div className="w-full max-w-40 sm:max-w-44">
                                        <LabelErrorInput
                                            message={
                                                "Pilih barang terlebih dahulu"
                                            }
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="w-full sm:max-w-64 max-w-xs">
                            <div className="flex flex-row justify-between items-center">
                                <p className="text-sm font-medium">
                                    Jumlah
                                    <InputRequired />
                                </p>

                                <label className="form-control w-full max-w-40 sm:max-w-44">
                                    <input
                                        type="number"
                                        min={0}
                                        name="jumlah"
                                        placeholder="Jumlah (pcs)"
                                        className="input input-bordered input-sm w-full max-w-40 sm:max-w-44"
                                        value={data.jumlah}
                                        onChange={(e) =>
                                            setData("jumlah", e.target.value)
                                        }
                                    />
                                </label>
                            </div>

                            {errors?.jumlah && (
                                <div className="flex justify-end">
                                    <div className="w-full max-w-40 sm:max-w-44">
                                        <LabelErrorInput
                                            message={errors.jumlah}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="w-full sm:max-w-64 max-w-xs">
                            <div className="flex flex-row justify-between items-center">
                                <p className="text-sm font-medium">Diskon</p>

                                <label className="form-control w-full max-w-40 sm:max-w-44">
                                    <input
                                        type="number"
                                        min={0}
                                        name="diskon"
                                        placeholder="Diskon (%)"
                                        className="input input-bordered input-sm w-full max-w-40 sm:max-w-44"
                                        value={data.diskon}
                                        onChange={(e) => {
                                            setData("diskon", e.target.value);
                                        }}
                                    />
                                </label>
                            </div>

                            {errors?.diskon && (
                                <div className="flex justify-end">
                                    <div className="w-full max-w-40 sm:max-w-44">
                                        <LabelErrorInput
                                            message={errors.diskon}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="modal-action">
                    <form method="dialog" className="inline-flex gap-3">
                        <button
                            className="btn btn-sm btn-neutral"
                            onClick={handleSave}
                            disabled={processing}
                        >
                            {modalMode === "Buat" ? "Simpan" : "Perbarui"}
                        </button>

                        <button
                            className="btn btn-sm btn-outline"
                            onClick={handleCancel}
                            disabled={processing}
                        >
                            Batal
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    );
}
