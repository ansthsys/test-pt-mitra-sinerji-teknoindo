<?php

namespace Database\Seeders;

use App\Models\MBarang;
use App\Models\MCustomer;
use App\Models\TSales;
use Carbon\Carbon;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        MBarang::factory(15)->create();
        MCustomer::factory(15)->create();

        TSales::insert([
            [
                'kode' => '202403-0001',
                'tgl' => '2024-03-16 17:42:38',
                'cust_id' => 1,
                'subtotal' => 0,
                'diskon' => 0,
                'ongkir' => 0,
                'total_bayar' => 0,
            ]
        ]);
    }
}
