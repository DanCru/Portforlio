<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('skills', function (Blueprint $table) {
            $table->string('icon_url')->nullable()->after('icon');
            // Keep proficiency for now but it won't be used in display
        });
        
        Schema::table('projects', function (Blueprint $table) {
            $table->text('role')->nullable()->after('content');
            $table->text('responsibilities')->nullable()->after('role');
            $table->json('gallery_images')->nullable()->after('image');
            $table->date('start_date')->nullable()->after('status');
            $table->date('end_date')->nullable()->after('start_date');
        });

        Schema::create('contact_messages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('subject');
            $table->text('message');
            $table->boolean('is_read')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::table('skills', function (Blueprint $table) {
            $table->dropColumn('icon_url');
        });
        
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn(['role', 'responsibilities', 'gallery_images', 'start_date', 'end_date']);
        });

        Schema::dropIfExists('contact_messages');
    }
};
