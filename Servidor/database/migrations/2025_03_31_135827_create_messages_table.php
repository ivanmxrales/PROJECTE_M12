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
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->dateTime('sent');
            $table->unsignedBigInteger('user_id_sent');
            $table->foreign('user_id_sent')->references('id')->on('users');
            $table->unsignedBigInteger('user_id_received');
            $table->foreign('user_id_received')->references('id')->on('users');
            $table->boolean('received');
            $table->string('content');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
