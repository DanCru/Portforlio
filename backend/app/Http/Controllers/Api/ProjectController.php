<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        return response()->json(
            Project::where('is_active', true)
                ->orderBy('sort_order', 'asc')
                ->get()
        );
    }

    public function show($slug)
    {
        $project = Project::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return response()->json($project);
    }
}
