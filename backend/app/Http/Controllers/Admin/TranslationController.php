<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Translation;
use Illuminate\Http\Request;

class TranslationController extends Controller
{
    public function index()
    {
        return Translation::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'key' => 'required|string',
            'locale' => 'required|string|max:10',
            'value' => 'required|string',
        ]);

        $translation = Translation::create($validated);
        return response()->json($translation, 201);
    }

    public function show(Translation $translation)
    {
        return $translation;
    }

    public function update(Request $request, Translation $translation)
    {
        $validated = $request->validate([
            'value' => 'required|string',
        ]);

        $translation->update($validated);
        return response()->json($translation);
    }

    public function destroy(Translation $translation)
    {
        $translation->delete();
        return response()->json(null, 204);
    }
}
