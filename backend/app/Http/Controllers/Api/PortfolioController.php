<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PortfolioSetting;
use App\Models\Experience;
use App\Models\Skill;
use App\Models\Education;
use App\Models\Project;
use App\Models\Certification;

class PortfolioController extends Controller
{
    public function index()
    {
        $settings = PortfolioSetting::all()->pluck('value', 'key');
        
        $experiences = Experience::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get();

        $skills = Skill::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get()
            ->groupBy('category');

        $educations = Education::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get();

        $projects = Project::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get();

        $certifications = Certification::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get();

        return response()->json([
            'settings' => $settings,
            'experiences' => $experiences,
            'skills' => $skills,
            'educations' => $educations,
            'projects' => $projects,
            'certifications' => $certifications,
        ])->header('Cache-Control', 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0')
          ->header('Pragma', 'no-cache')
          ->header('Expires', '0');
    }
}
