<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->string('position');
            $table->string('company');
            $table->string('location')->nullable();
            $table->string('period'); // e.g. "2023 - Present"
            $table->text('description')->nullable();
            $table->json('achievements')->nullable();
            $table->json('technologies')->nullable();
            $table->string('rank')->nullable(); // e.g. "Level 3"
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('experiences');
    }
};
