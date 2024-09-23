<?php

use App\Http\Controllers\Aset\PemindahanAsetController;
use App\Http\Controllers\Aset\RekeningController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Master\BankController;
use App\Http\Controllers\Master\KategoriController;
use App\Http\Controllers\PerencanaanController;
use App\Http\Controllers\Transaksi\PemasukanController;
use App\Http\Controllers\Transaksi\PengeluaranController;
use App\Http\Controllers\UtangPiutang\PiutangController;
use App\Http\Controllers\UtangPiutang\UtangController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('login');
});
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');
    
    Route::prefix('master')->name('master.')->group(function () {
        Route::resource('kategori', KategoriController::class)->only(['index', 'store', 'update', 'destroy']);
        Route::resource('bank', BankController::class)->only(['index', 'store', 'update', 'destroy']);
    });

    Route::prefix('aset')->name('aset.')->group(function () {
        Route::resource('rekening', RekeningController::class)->only(['index', 'store', 'update', 'destroy']);
        Route::resource('pemindahan-aset', PemindahanAsetController::class)->only(['index', 'store', 'update', 'destroy']);
    });

    Route::get('perencanaan/print-pdf', [PerencanaanController::class, 'printPdf'])->name('perencanaan.print-pdf');
    Route::get('perencanaan/view', [PerencanaanController::class, 'view'])->name('perencanaan.view');
    Route::post('perencanaan/generate', [PerencanaanController::class, 'generate'])->name('perencanaan.generate');
    Route::resource('perencanaan', PerencanaanController::class)->names('perencanaan');
    Route::put('perencanaan/confirm/{perencanaan}', [PerencanaanController::class, 'confirm'])->name('perencanaan.confirm');
    Route::prefix('transaksi')->name('transaksi.')->group(function () {
        Route::resource('pemasukan', PemasukanController::class)->only(['index', 'store', 'update', 'destroy']);
        Route::get('pengeluaran/view', [PengeluaranController::class, 'view'])->name('pengeluaran.view');
        Route::resource('pengeluaran', PengeluaranController::class)->only(['index', 'store', 'update', 'destroy']);
    });
    Route::prefix('utang-piutang')->name('utang-piutang.')->group(function () {
        Route::resource('utang', UtangController::class)->only(['index', 'store', 'update', 'destroy']);
        Route::put('utang/bayar/{utang}', [UtangController::class, 'bayar'])->name('utang.bayar');
        Route::resource('piutang', PiutangController::class)->only(['index','store', 'update', 'destroy']);
    });
});

require __DIR__ . '/auth.php';
