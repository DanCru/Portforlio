<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Certification extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'issuer',
        'issue_date',
        'url',
        'image',
        'sort_order',
        'is_active'
    ];

    protected $casts = [
        'name' => 'array',
        'issuer' => 'array',
        'issue_date' => 'date',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];
}
