<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TSalesDet extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 't_sales_det';

    protected $fillable = [
        'sales_id',
        'barang_id',
        'harga_bandrol',
        'qty',
        'diskon_pct',
        'diskon_nilai',
        'harga_diskon',
        'total',
    ];

    public function tSales(): BelongsTo
    {
        return $this->belongsTo(TSales::class);
    }

    public function mBarang(): BelongsTo
    {
        return $this->belongsTo(MBarang::class);
    }
}
