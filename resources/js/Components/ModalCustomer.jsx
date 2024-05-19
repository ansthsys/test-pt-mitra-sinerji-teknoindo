import { useEffect, useState } from "react";

export default function ModalCustomer({
    customers,
    selectedCustomer,
    setSelectedCustomer,
}) {
    useEffect(() => {}, [selectedCustomer]);

    return (
        <div className="overflow-x-auto max-h-96">
            <table className="table table-pin-rows">
                <thead>
                    <tr>
                        <th></th>
                        <th>No</th>
                        <th>Kode</th>
                        <th>Nama</th>
                        <th>Telepon</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.length > 0 ? (
                        customers?.map((customer, index) => {
                            return (
                                <tr className="hover" key={index}>
                                    <td>
                                        <input
                                            type="radio"
                                            name="customers"
                                            className="radio"
                                            defaultValue={customer.id}
                                            onChange={() =>
                                                setSelectedCustomer(customer)
                                            }
                                            defaultChecked={
                                                selectedCustomer?.id ===
                                                customer.id
                                            }
                                        />
                                    </td>
                                    <th>{index + 1}</th>
                                    <td>{customer.kode}</td>
                                    <td>{customer.nama}</td>
                                    <td>{customer.telp}</td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr className="hover">
                            <td colSpan={5} className="text-center">
                                Tidak ada kustomer
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
