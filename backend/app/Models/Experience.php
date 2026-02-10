<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasFactory;

    protected $fillable = [
        'position',
        'company',
        'location',
        'period',
        'description',
        'achievements',
        'technologies',
        'rank',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'position' => 'array',
        'company' => 'array',
        'location' => 'array',
        'description' => 'array',
        'achievements' => 'array',
        'technologies' => 'array',
        'is_active' => 'boolean',
    ];
}
