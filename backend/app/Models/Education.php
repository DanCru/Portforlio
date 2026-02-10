<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    use HasFactory;

    protected $table = 'educations';

    protected $fillable = [
        'degree',
        'school',
        'period',
        'gpa',
        'description',
        'image',
        'sort_order',
        'is_active'
    ];

    protected $casts = [
        'degree' => 'array',
        'school' => 'array',
        'description' => 'array',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];
}
