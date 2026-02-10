<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function index()
    {
        return response()->json(
            Skill::where('is_active', true)
                ->orderBy('sort_order', 'asc')
                ->get()
        );
    }
}
