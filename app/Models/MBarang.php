<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MBarang extends Model
{
    use HasFactory;


    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'm_barang';

    protected $fillable = [
        'kode',
        'nama',
        'harga',
    ];

    public function tSalesDet(): HasMany
    {
        return $this->hasMany(TSalesDet::class);
    }
}
