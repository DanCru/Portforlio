<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Translation;
use Illuminate\Http\Request;

class TranslationController extends Controller
{
    public function index(Request $request)
    {
        $locale = $request->query('locale', 'en');
        
        $translations = Translation::where('locale', $locale)
            ->pluck('value', 'key');

        return response()->json($translations);
    }
}
