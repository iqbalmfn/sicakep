<?php

use App\Http\Controllers\Master\KategoriController;
use App\Http\Controllers\PemasukanController;
use App\Http\Controllers\PengeluaranController;
use App\Http\Controllers\PerencanaanController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Auth/Login');
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    
    Route::prefix('master')->name('master.')->group(function () {
        Route::resource('kategori', KategoriController::class)->only(['index', 'store', 'update', 'destroy']);
    });

    Route::get('perencanaan/print-pdf', [PerencanaanController::class, 'printPdf'])->name('perencanaan.print-pdf');
    Route::get('perencanaan/view', [PerencanaanController::class, 'view'])->name('perencanaan.view');
    Route::resource('perencanaan', PerencanaanController::class)->names('perencanaan');
    Route::put('perencanaan/confirm/{perencanaan}', [PerencanaanController::class, 'confirm'])->name('perencanaan.confirm');
    Route::prefix('transaksi')->name('transaksi.')->group(function () {
        Route::resource('pemasukan', PemasukanController::class)->only(['index', 'store', 'update', 'destroy']);
        Route::resource('pengeluaran', PengeluaranController::class)->only(['index', 'store', 'update', 'destroy']);
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
