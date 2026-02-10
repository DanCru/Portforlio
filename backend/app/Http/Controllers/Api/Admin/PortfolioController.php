<?php

namespace App\Http\Controllers\Api\Admin;

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
    // Settings
    public function updateSettings(Request $request)
    {
        \Illuminate\Support\Facades\Log::info('updateSettings', $request->all());
        
        try {
            $data = $request->validate([
                'settings' => 'required|array',
                'settings.*.key' => 'required|string',
                'settings.*.value' => 'nullable',
            ]);

            foreach ($data['settings'] as $setting) {
                PortfolioSetting::updateOrCreate(
                    ['key' => $setting['key']],
                    ['value' => $setting['value']]
                );
            }
            
            return response()->json(['message' => 'Settings updated successfully']);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Settings Update Failed: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Generic CRUD helper
    private function explicitModel($type) {
        return match($type) {
            'experience' => Experience::class,
            'skill' => Skill::class,
            'education' => Education::class,
            'project' => Project::class,
            'certification' => Certification::class,
            default => null
        };
    }

    private function handleImageUpload(Request $request, $modelInstance = null) {
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('uploads', 'public');
            return '/storage/' . $path;
        }
        return $modelInstance ? $modelInstance->image : null;
    }

    public function index($type)
    {
        $model = $this->explicitModel($type);
        if (!$model) return response()->json(['error' => 'Invalid type'], 400);

        return $model::orderBy('sort_order', 'asc')->get();
    }

    public function store(Request $request, $type)
    {
        $model = $this->explicitModel($type);
        if (!$model) return response()->json(['error' => 'Invalid type'], 400);

        $data = $request->all();

        // Handle Image Upload
        if ($request->hasFile('image')) {
            $data['image'] = $this->handleImageUpload($request);
        }

        // Handle JSON fields that might be sent as strings (important for FormData)
        foreach ($data as $key => $value) {
            if (is_string($value) && in_array($key, ['title', 'description', 'content', 'position', 'company', 'school', 'degree', 'achievements', 'technologies', 'tech_stack', 'features', 'metrics', 'name', 'issuer'])) {
                $decoded = json_decode($value, true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    $data[$key] = $decoded;
                }
            }
        }

        $item = $model::create($data);
        return response()->json($item);
    }

    public function update(Request $request, $type, $id)
    {
        $model = $this->explicitModel($type);
        if (!$model) return response()->json(['error' => 'Invalid type'], 400);

        $item = $model::findOrFail($id);
        $data = $request->all();

        // Handle Image Upload
        if ($request->hasFile('image')) {
            $data['image'] = $this->handleImageUpload($request);
        }

        // Handle JSON fields that might be sent as strings
        foreach ($data as $key => $value) {
             if (is_string($value) && in_array($key, ['title', 'description', 'content', 'position', 'company', 'school', 'degree', 'achievements', 'technologies', 'tech_stack', 'features', 'metrics', 'name', 'issuer'])) {
                $decoded = json_decode($value, true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    $data[$key] = $decoded;
                }
            }
        }

        $item->update($data);
        return response()->json($item);
    }

    public function destroy($type, $id)
    {
        $model = $this->explicitModel($type);
        if (!$model) return response()->json(['error' => 'Invalid type'], 400);

        $model::destroy($id);
        return response()->json(['message' => 'Deleted successfully']);
    }
    
    public function reorder(Request $request, $type)
    {
        $model = $this->explicitModel($type);
        if (!$model) return response()->json(['error' => 'Invalid type'], 400);

        $items = $request->input('items'); // [{id: 1, sort_order: 1}, ...]
        foreach ($items as $item) {
            $model::where('id', $item['id'])->update(['sort_order' => $item['sort_order']]);
        }
        return response()->json(['message' => 'Reordered successfully']);
    }
}
