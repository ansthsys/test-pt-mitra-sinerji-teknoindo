import { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import HeaderIndex from "@/Components/HeaderIndex";

export default function Index({ data, search }) {
    const [grandTotal, setGrandTotal] = useState(0);

    const countGrandTotal = (arr) => {
        const total = arr?.reduce((acc, curr) => {
            return acc + parseFloat(curr.total_bayar);
        }, 0);

        setGrandTotal(total);
    };

    const formatDate = (val) => {
        return Intl.DateTimeFormat("id-ID", {
            dateStyle: "medium",
        }).format(new Date(val));
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(value);
    };

    useEffect(() => {
        countGrandTotal(data);
    }, [data]);

    return (
        <Layout titlePage="Daftar Transaksi" headComponent={<HeaderIndex />}>
            <Head title="Daftar Transaksi" />

            <div className="card w-full rounded-lg bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="overflow-x-auto h-[29rem]">
                        <table className="table table-pin-rows table-pin-cols">
                            <thead>
                                <tr>
                                    <td className="text-center">No</td>
                                    <td className="text-center">
                                        No Transaksi
                                    </td>
                                    <td className="text-center">Tanggal</td>
                                    <td className="text-center">
                                        Nama Kustomer
                                    </td>
                                    <td className="text-center">
                                        Jumlah Barang
                                    </td>
                                    <td className="text-center">Sub Total</td>
                                    <td className="text-center">Diskon</td>
                                    <td className="text-center">Ongkir</td>
                                    <th className="text-center">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length > 0 ? (
                                    data.map((item, index) => {
                                        return (
                                            <tr className="hover" key={item.id}>
                                                <td className="text-center">
                                                    {index + 1}
                                                </td>
                                                <td className="text-center text-nowrap">
                                                    {item.kode}
                                                </td>
                                                <td className="text-center text-nowrap">
                                                    {formatDate(item.tgl)}
                                                </td>
                                                <td className="text-left text-nowrap">
                                                    {item.nama_kustomer}
                                                </td>
                                                <td className="text-center">
                                                    {item.jumlah_barang}
                                                </td>
                                                <td className="text-right">
                                                    {formatCurrency(
                                                        item.subtotal
                                                    )}
                                                </td>
                                                <td className="text-right">
                                                    {formatCurrency(
                                                        item.diskon
                                                    )}
                                                </td>
                                                <td className="text-right">
                                                    {formatCurrency(
                                                        item.ongkir
                                                    )}
                                                </td>
                                                <th className="text-right">
                                                    {formatCurrency(
                                                        item.total_bayar
                                                    )}
                                                </th>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={9} className="text-center">
                                            Tidak ada data
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td className="text-center"></td>
                                    <td className="text-center"></td>
                                    <td className="text-center"></td>
                                    <td className="text-center"></td>
                                    <th className="text-center" colSpan={4}>
                                        <span className="text-neutral font-black text-[14px]">
                                            Grand Total
                                        </span>
                                    </th>
                                    <th className="text-right">
                                        <span className="text-neutral font-black text-[14px]">
                                            {formatCurrency(grandTotal)}
                                        </span>
                                    </th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
