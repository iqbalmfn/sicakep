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
        Schema::create('transaksi_asets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->unsignedBigInteger('initial_rekening_id')->nullable();
            $table->unsignedBigInteger('destination_rekening_id');
            $table->integer('nominal');
            $table->integer('biaya_administrasi')->default(0);
            $table->date('tanggal');
            $table->timestamps();

            $table->foreign('initial_rekening_id')->references('id')->on('rekenings');
            $table->foreign('destination_rekening_id')->references('id')->on('rekenings');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaksi_asets');
    }
};
