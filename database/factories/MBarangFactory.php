<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\MBarang;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MBarang>
 */
class MBarangFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'kode' => fake()->regexify('[A-Z]{2}[0-4]{3}'),
            'nama' => fake()->word(),
            'harga' => round(fake()->numberBetween(125000, 325000), -3),
        ];
    }
}
