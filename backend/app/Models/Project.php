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
        'image',
        'tech_stack',
        'features',
        'metrics',
        'duration',
        'team',
        'status',
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
        'tech_stack' => 'array',
        'features' => 'array',
        'metrics' => 'array',
        'is_active' => 'boolean',
    ];
}
