import { useEffect, useState } from "react";

export default function TabelModalListBarang({
    items,
    data,
    setData,
    modalMode,
    selectedItem,
}) {
    const formatCurrency = (value) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(value);
    };

    const handleChange = (row) => {
        setData({
            ...data,
            idBarang: row.id,
            kode: row.kode,
            nama: row.nama,
            harga: row.harga,
        });
    };

    useEffect(() => {}, [items]);

    return (
        <>
            <div className="overflow-x-auto max-h-60">
                <table className="table table-sm table-pin-rows">
                    <thead>
                        <tr>
                            <th className="text-center"></th>
                            <th className="text-center">No</th>
                            <th className="text-center">Kode</th>
                            <th className="text-center">Nama</th>
                            <th className="text-center">Harga</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length > 0 ? (
                            items?.map((item, index) => {
                                return (
                                    <tr
                                        className={`hover ${
                                            selectedItem?.idBarang ===
                                                item.id && "bg-base-200"
                                        }`}
                                        key={index}
                                    >
                                        <td>
                                            <input
                                                type="radio"
                                                name="items"
                                                className="radio radio-sm"
                                                defaultValue={item.id}
                                                onChange={() =>
                                                    handleChange(item)
                                                }
                                                disabled={modalMode !== "Buat"}
                                            />
                                        </td>
                                        <td>{index + 1}</td>
                                        <td className="text-center">
                                            {item.kode}
                                        </td>
                                        <td>{item.nama}</td>
                                        <td className="text-right">
                                            {formatCurrency(item.harga)}
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr className="hover">
                                <td colSpan={5} className="text-center">
                                    Tidak ada barang
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
