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
        // 1. Experiences
        Schema::table('experiences', function (Blueprint $table) {
            $table->text('position')->change(); 
            $table->text('company')->change();
            $table->text('location')->nullable()->change();
            $table->text('description')->nullable()->change();
        });

        // 2. Projects
        Schema::table('projects', function (Blueprint $table) {
            $table->text('title')->change();
            $table->text('slug')->nullable()->change();
            $table->text('category')->nullable()->change();
            $table->text('description')->nullable()->change();
            $table->text('long_description')->nullable()->change();
            $table->text('content')->nullable()->change();
        });

        // 3. Educations
        Schema::table('educations', function (Blueprint $table) {
            $table->text('degree')->change();
            $table->text('school')->change();
            $table->text('description')->nullable()->change();
        });

        // 4. Certifications
        Schema::table('certifications', function (Blueprint $table) {
            $table->text('name')->change();
            $table->text('issuer')->change();
        });
    }

    public function down(): void
    {
        // 
    }
};
