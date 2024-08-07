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
            $table->unsignedBigInteger('perencanaan_id')->nullable()->after('user_id');

            $table->foreign('perencanaan_id')->references('id')->on('perencanaans');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('utang_piutangs', function (Blueprint $table) {
            $table->dropColumn(['perencanaan_id']);
        });
    }
};
