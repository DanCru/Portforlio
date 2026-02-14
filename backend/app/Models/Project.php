<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'category',
        'description',
        'long_description',
        'content',
        'role',
        'responsibilities',
        'image',
        'gallery_images',
        'tech_stack',
        'features',
        'metrics',
        'duration',
        'team',
        'status',
        'start_date',
        'end_date',
        'live_url',
        'github_url',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'title' => 'array',
        'slug' => 'array',
        'category' => 'array',
        'description' => 'array',
        'long_description' => 'array',
        'content' => 'array',
        'role' => 'array',
        'responsibilities' => 'array',
        'tech_stack' => 'array',
        'features' => 'array',
        'metrics' => 'array',
        'gallery_images' => 'array',
        'is_active' => 'boolean',
    ];
}
