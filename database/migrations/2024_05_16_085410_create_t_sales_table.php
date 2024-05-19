<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('t_sales', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('cust_id');
            $table->string('kode', 15);
            $table->dateTime('tgl');
            $table->decimal('subtotal', 10, 2);
            $table->decimal('diskon', 10, 2)->nullable();
            $table->decimal('ongkir', 10, 2)->nullable();
            $table->decimal('total_bayar', 10, 2);
            $table->timestamps();

            $table->foreign('cust_id')
                ->references('id')
                ->on('m_customer')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('t_sales_');
    }
};
