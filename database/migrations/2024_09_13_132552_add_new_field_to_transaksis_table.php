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
        Schema::table('transaksis', function (Blueprint $table) {
            $table->unsignedBigInteger('rekening_id')->nullable()->after('perencanaan_id');
            $table->boolean('is_sesuai')->default(1)->after('tanggal');
            
            $table->foreign('rekening_id')->references('id')->on('rekenings');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transaksis', function (Blueprint $table) {
            $table->dropColumn(['rekening_id', 'is_sesuai']);
        });
    }
};
