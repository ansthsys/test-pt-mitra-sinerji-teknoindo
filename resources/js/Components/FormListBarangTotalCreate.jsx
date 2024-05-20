import { useEffect, useState } from "react";
import InputRequired from "./InputRequired";
import LabelErrorInput from "./LabelErrorInput";

export default function FormListBarangTotalCreate({ data, setData, errors }) {
    const [maxDiskon, setMaxDiskon] = useState(0);
    const [maxOngkir, setMaxOngkir] = useState(0);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(value);
    };

    const handleChange = (e) => {
        const { name, value, max } = e.target;

        if (parseFloat(value) > parseFloat(max)) {
            return;
        }

        if (name === "diskon") {
            setMaxOngkir(data.subtotal - value);
        } else if (name === "ongkir") {
            setMaxDiskon(data.subtotal - value);
        }

        setData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    useEffect(() => {
        setMaxDiskon(data.subtotal - data.ongkir);
        setMaxOngkir(data.subtotal - data.diskon);
    }, [data, maxDiskon, maxOngkir]);

    return (
        <div className="flex flex-col items-end justify-center gap-3 sm:justify-end w-full mt-5">
            <div className="w-full sm:max-w-80 max-w-xs">
                <div className="flex flex-row justify-between items-center">
                    <p className="text-md font-extrabold">
                        Sub Total <InputRequired />
                    </p>

                    <label className="form-control w-full max-w-44">
                        <input
                            type="text"
                            placeholder="Subtotal"
                            className="input input-bordered input-sm bg-gray-200 w-full max-w-44 text-right"
                            defaultValue={data.subtotal}
                            readOnly
                            hidden
                        />
                        <div className="input input-bordered input-sm bg-gray-200 w-full max-w-44 text-right">
                            {formatCurrency(data.subtotal)}
                        </div>
                    </label>
                </div>

                {errors?.subtotal && (
                    <div className="flex justify-end">
                        <div className="w-full max-w-44">
                            <LabelErrorInput message={errors.subtotal} />
                        </div>
                    </div>
                )}
            </div>

            <div className="w-full sm:max-w-80 max-w-xs">
                <div className="flex flex-row justify-between items-center">
                    <p className="text-md font-extrabold">Diskon</p>

                    <label className="form-control w-full max-w-44">
                        <input
                            type="number"
                            min={0}
                            max={maxDiskon}
                            placeholder="Diskon (Rp)"
                            className="input input-bordered input-sm w-full max-w-44 text-right"
                            name="diskon"
                            value={data.diskon}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                {errors?.diskon && (
                    <div className="flex justify-end">
                        <div className="w-full max-w-44">
                            <LabelErrorInput message={errors.diskon} />
                        </div>
                    </div>
                )}
            </div>

            <div className="w-full sm:max-w-80 max-w-xs">
                <div className="flex flex-row justify-between items-center">
                    <p className="text-md font-extrabold">Ongkir</p>

                    <label className="form-control w-full max-w-44">
                        <input
                            type="number"
                            min={0}
                            max={maxOngkir}
                            placeholder="Ongkos kirim"
                            className="input input-bordered input-sm w-full max-w-44 text-right"
                            name="ongkir"
                            value={data.ongkir}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                {errors?.ongkir && (
                    <div className="flex justify-end">
                        <div className="w-full max-w-44">
                            <LabelErrorInput message={errors.ongkir} />
                        </div>
                    </div>
                )}
            </div>

            <div className="w-full sm:max-w-80 max-w-xs">
                <div className="flex flex-row justify-between items-center">
                    <p className="text-md font-extrabold">
                        Total Bayar <InputRequired />
                    </p>

                    <label className="form-control w-full max-w-44">
                        <input
                            type="text"
                            placeholder="Total Bayar"
                            className="input input-bordered input-sm bg-gray-200 w-full max-w-44 text-right"
                            defaultValue={formatCurrency(data.totalBayar)}
                            readOnly
                            hidden
                        />
                        <div className="input input-bordered input-sm bg-gray-200 w-full max-w-44 text-right">
                            {formatCurrency(data.totalBayar)}
                        </div>
                    </label>
                </div>

                {errors?.totalBayar && (
                    <div className="flex justify-end">
                        <div className="w-full max-w-44">
                            <LabelErrorInput message={errors.totalBayar} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
