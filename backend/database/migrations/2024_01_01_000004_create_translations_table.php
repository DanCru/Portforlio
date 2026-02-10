<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('translations', function (Blueprint $table) {
            $table->id();
            $table->string('key')->index(); // e.g. 'home.title'
            $table->string('locale')->index(); // e.g. 'en', 'vi'
            $table->text('value')->nullable();
            $table->timestamps();

            $table->unique(['key', 'locale']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('translations');
    }
};
