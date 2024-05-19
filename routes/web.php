<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TransactionController;

Route::get('/', function () {
    return to_route('transaction.index');
});

Route::controller(TransactionController::class)
    ->prefix('transactions')
    ->name('transaction.')
    ->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/create', 'store')->name('store');

        Route::post('/create/item', 'storeItem')->name('storeItem');
        Route::post('/create/item/tmp', 'storeTmpItem')->name('storeTmpItem');
        Route::patch('/create/item/tmp/{idTmpItem}', 'editByIdTmpItem')->name('editByIdTmpItem');
        Route::delete('/create/item/tmp', 'deleteAllTmpItem')->name('deleteAllTmpItem');
        Route::delete('/create/item/tmp/{idTmpItem}', 'deleteByIdTmpItem')->name('deleteByIdTmpItem');
    });
