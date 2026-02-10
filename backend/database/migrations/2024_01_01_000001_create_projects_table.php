<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category')->nullable(); // Added
            $table->text('description')->nullable();
            $table->longText('long_description')->nullable(); // Added
            $table->longText('content')->nullable();
            $table->string('image')->nullable();
            $table->json('tech_stack')->nullable();
            $table->json('features')->nullable(); // Added
            $table->json('metrics')->nullable(); // Added
            $table->string('duration')->nullable(); // Added
            $table->string('team')->nullable(); // Added
            $table->string('status')->default('Completed'); // Added
            $table->string('live_url')->nullable();
            $table->string('github_url')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
