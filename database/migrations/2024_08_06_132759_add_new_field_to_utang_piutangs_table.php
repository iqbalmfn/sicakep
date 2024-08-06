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
        Schema::table('utang_piutangs', function (Blueprint $table) {
            $table->unsignedBigInteger('piutang_master_id')->nullable()->after('user_id');
            $table->enum('jenis', ['cash', 'transfer'])->after('tipe');

            $table->foreign('piutang_master_id')->references('id')->on('piutang_masters');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('utang_piutangs', function (Blueprint $table) {
            $table->dropColumn(['piutang_master_id','jenis']);
        });
    }
};
