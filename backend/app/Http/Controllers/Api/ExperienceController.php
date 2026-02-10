<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    public function index()
    {
        return response()->json(
            Experience::where('is_active', true)
                ->orderBy('sort_order', 'asc')
                ->get()
        );
    }
}
