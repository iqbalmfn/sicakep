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
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->bigInteger('sender_id')->unsigned()->nullable();
            $table->string('title');
            $table->string('type');
            $table->text('message');
            $table->string('url')->nullable();
            $table->dateTime('read_at')->nullable();
            $table->timestamps();

            $table->foreign('sender_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
