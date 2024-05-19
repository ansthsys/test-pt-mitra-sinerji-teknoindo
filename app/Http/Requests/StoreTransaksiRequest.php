<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTransaksiRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "idKustomer" => ["required", "integer"],
            "noTransaksi" => ["required", "string"],
            "tglTransaksi" => ["required", "date"],
            "subtotal" => ["required", "numeric"],
            "diskon" => ["nullable", "numeric", "min:1", "lte:subtotal"],
            "ongkir" => ["nullable", "numeric", "min:1", "lte:subtotal"],
            "totalBayar" => ["required", "numeric"],
            "items" => ["required", "array"],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            "idKustomer.required" => "Kustomer tidak boleh kosong",
            "noTransaksi.required" => "Nomor transaksi tidak boleh kosong",
            "noTransaksi.string" => "Nomor transaksi harus berupa huruf",
            "tglTransaksi.required" => "Tanggal transaksi tidak boleh kosong",
            "tglTransaksi.date" => "Tanggal transaksi harus berupa tanggal",
            "subtotal.required" => "Subtotal tidak boleh kosong (tambah barang dahulu)",
            "subtotal.numeric" => "Subtotal harus berupa angka",
            "diskon.numeric" => "Diskon harus berupa angka",
            "diskon.min" => "Diskon minimal Rp. 1.00,-",
            "diskon.lte" => "Diskon melebihi Subtotal",
            "ongkir.numeric" => "Ongkir harus berupa angka",
            "ongkir.min" => "Ongkir minimal Rp. 1.00,-",
            "ongkir.lte" => "Ongkir melebihi Subtotal",
            "totalBayar.required" => "Total bayar tidak boleh kosong",
            "totalBayar.numeric" => "Total bayar harus berupa angka",
            "items.required" => "Barang tidak boleh kosong",
        ];
    }
}
