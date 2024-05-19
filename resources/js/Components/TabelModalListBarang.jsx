import { useEffect, useState } from "react";

export default function TabelModalListBarang({ items, data, setData }) {
    const handleChange = (row) => {
        setData({
            ...data,
            idBarang: row.id,
            kode: row.kode,
            nama: row.nama,
        });
    };

    useEffect(() => {}, [items]);

    return (
        <>
            <div className="overflow-x-auto max-h-60">
                <table className="table table-sm table-pin-rows">
                    <thead>
                        <tr>
                            <th></th>
                            <th>No</th>
                            <th>Kode</th>
                            <th>Nama</th>
                            <th>Harga</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length > 0 ? (
                            items?.map((item, index) => {
                                return (
                                    <tr className="hover" key={index}>
                                        <td>
                                            <input
                                                type="radio"
                                                name="items"
                                                className="radio radio-sm"
                                                defaultValue={item.id}
                                                onChange={() =>
                                                    handleChange(item)
                                                }
                                            />
                                        </td>
                                        <td>{index + 1}</td>
                                        <td>{item.kode}</td>
                                        <td>{item.nama}</td>
                                        <td>{item.harga}</td>
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
