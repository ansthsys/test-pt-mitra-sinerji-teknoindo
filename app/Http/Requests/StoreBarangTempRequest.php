<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBarangTempRequest extends FormRequest
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

            'idBarang' => ['required', 'integer'],
            'jumlah' => ['required', 'numeric', 'min:1', 'max:50'],
            'diskon' => ['nullable', 'numeric', 'min:1', 'max:99'],
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
            'idBarang.required' => 'Barang tidak boleh kosong',
            'jumlah.required' => 'Jumlah tidak boleh kosong',
            'jumlah.numeric' => 'Jumlah harus berupa angka',
            'jumlah.min' => 'Jumlah kurang dari 1 pcs',
            'jumlah.max' => 'Maksimal jumlah 50 pcs',
            'diskon.min' => 'Diskon tidak boleh kurang dari 1%',
            'diskon.max' => 'Diskon maksimal 99%',
        ];
    }
}
