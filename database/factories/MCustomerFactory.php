<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MCustomer>
 */
class MCustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'kode' => fake()->regexify('[A-Z]{4}[0-4]{4}'),
            'nama' => fake()->firstName() . ' ' . fake()->lastName(),
            'telp' => fake()->e164PhoneNumber(),
        ];
    }
}
