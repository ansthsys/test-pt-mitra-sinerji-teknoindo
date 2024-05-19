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
        Schema::create('t_sales_det', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('sales_id');
            $table->unsignedInteger('barang_id');
            $table->decimal('harga_bandrol', 10, 2);
            $table->integer('qty');
            $table->decimal('diskon_pct', 10, 2)->nullable()->default(0);
            $table->decimal('diskon_nilai', 10, 2)->nullable();
            $table->decimal('harga_diskon', 10, 2);
            $table->decimal('total', 10, 2);
            $table->timestamps();

            $table->foreign('sales_id')
                ->references('id')
                ->on('t_sales')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('barang_id')
                ->references('id')
                ->on('m_barang')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('t_sales_det');
    }
};
