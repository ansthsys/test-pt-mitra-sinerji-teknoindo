import { useRef, useState, useEffect, lazy } from "react";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";

const InputRequired = lazy(() => import("@/Components/InputRequired"));
const LabelErrorInput = lazy(() => import("./LabelErrorInput"));
const ModalCustomer = lazy(() => import("./ModalCustomer"));

export default function FormKustomerCreate({
    data,
    setData,
    errors,
    customers,
}) {
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const modalRef = useRef(null);

    const openModal = () => {
        modalRef.current.showModal();
    };

    const handleSave = () => {
        setData({
            ...data,
            idKustomer: selectedCustomer?.id,
            kodeKustomer: selectedCustomer?.kode,
            namaKustomer: selectedCustomer?.nama,
            telpKustomer: selectedCustomer?.telp,
        });
    };

    useEffect(() => {}, [selectedCustomer, data]);

    return (
        <>
            <div className="card card-compact rounded-lg w-full sm:w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Kustomer</h2>

                    <div>
                        <input hidden defaultValue={data.idKustomer} />
                        <label className="form-control w-full max-w-md mx-auto">
                            <div className="label">
                                <span className="label-text">
                                    Kode Kustomer
                                    <InputRequired />
                                </span>
                            </div>
                            <div className="join flex flex-row">
                                <input
                                    className="input input-bordered border-neutral input-sm focus:outline-neutral/80 focus:border-neutral join-item bg-gray-200 w-full max-w-md"
                                    placeholder="Kode kustomer"
                                    value={data.kodeKustomer}
                                    readOnly
                                />
                                <button
                                    className="btn btn-outline btn-sm join-item"
                                    onClick={openModal}
                                >
                                    <DocumentMagnifyingGlassIcon className="size-5 text-content-neutral" />
                                </button>
                            </div>

                            {errors?.idKustomer && (
                                <LabelErrorInput
                                    message={"Kode kustomer tidak boleh kosong"}
                                />
                            )}
                        </label>

                        <label className="form-control w-full max-w-md mx-auto">
                            <div className="label">
                                <span className="label-text">
                                    Nama Kustomer
                                    <InputRequired />
                                </span>
                            </div>
                            <input
                                type="text"
                                placeholder="Nama kustomer"
                                className="input input-bordered border-neutral input-sm focus:outline-neutral/80 focus:border-neutral bg-gray-200 w-full max-w-md"
                                value={data.namaKustomer}
                                readOnly
                            />

                            {errors?.idKustomer && (
                                <LabelErrorInput
                                    message={"Nama kustomer tidak boleh kosong"}
                                />
                            )}
                        </label>

                        <label className="form-control w-full max-w-md mx-auto">
                            <div className="label">
                                <span className="label-text">
                                    Telepon Kustomer
                                    <InputRequired />
                                </span>
                            </div>
                            <input
                                type="text"
                                placeholder="Telepon kustomer"
                                className="input input-bordered border-neutral input-sm focus:outline-neutral/80 focus:border-neutral bg-gray-200 w-full max-w-md"
                                value={data.telpKustomer}
                                readOnly
                            />

                            {errors?.idKustomer && (
                                <LabelErrorInput
                                    message={"Nomor telepon tidak boleh kosong"}
                                />
                            )}
                        </label>
                    </div>

                    <div className="card-actions justify-end"></div>
                </div>
            </div>

            <dialog id="modal_customer" ref={modalRef} className="modal px-5">
                <div className="modal-box w-full max-w-screen-md">
                    <h3 className="font-bold text-lg mb-5">Pilih Kustomer</h3>

                    <div className="">
                        <ModalCustomer
                            customers={customers}
                            setData={setData}
                            selectedCustomer={selectedCustomer}
                            setSelectedCustomer={setSelectedCustomer}
                            // handleSelect={handleSelect}
                        />
                    </div>

                    <div className="modal-action">
                        <form method="dialog" className="inline-flex gap-3">
                            <button
                                className="btn btn-sm btn-neutral"
                                onClick={handleSave}
                            >
                                Simpan
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}
