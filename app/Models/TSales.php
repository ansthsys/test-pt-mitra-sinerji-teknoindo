<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TSales extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 't_sales';

    protected $fillable = [
        'cust_id',
        'kode',
        'tgl',
        'subtotal',
        'diskon',
        'ongkir',
        'total_bayar',
    ];

    public function mCustomer(): BelongsTo
    {
        return $this->belongsTo(MCustomer::class);
    }

    public function tSalesDet(): HasMany
    {
        return $this->hasMany(TSalesDet::class);
    }
}
