import InputRequired from "@/Components/InputRequired";
import LabelErrorInput from "./LabelErrorInput";

export default function FormTransaksiCreate({ data, setData, errors }) {
    return (
        <div className="card card-compact rounded-lg w-full sm:w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Transaksi</h2>

                <div>
                    <label className="form-control w-full max-w-md mx-auto">
                        <div className="label">
                            <span className="label-text">
                                Nomor Transaksi
                                <InputRequired />
                            </span>
                        </div>
                        <input
                            type="text"
                            placeholder="Nomor Transaksi"
                            className="input input-bordered border-neutral input-sm focus:outline-neutral/80 focus:border-neutral bg-gray-200 w-full max-w-md"
                            defaultValue={data.noTransaksi}
                            readOnly
                        />
                        {errors?.noTransaksi && (
                            <LabelErrorInput message={errors.noTransaksi} />
                        )}
                    </label>

                    <label className="form-control w-full max-w-md mx-auto">
                        <div className="label">
                            <span className="label-text">
                                Tanggal Transaksi
                                <InputRequired />
                            </span>
                        </div>
                        <input
                            type="date"
                            placeholder="Nomor Transaksi"
                            className="input input-bordered border-neutral input-sm focus:outline-neutral/80 focus:border-neutral w-full max-w-md"
                            defaultValue={data.tglTransaksi}
                            onChange={(e) =>
                                setData("tglTransaksi", e.target.value)
                            }
                        />
                        {errors?.tglTransaksi && (
                            <LabelErrorInput message={errors.tglTransaksi} />
                        )}
                    </label>
                </div>

                <div className="card-actions justify-end"></div>
            </div>
        </div>
    );
}
