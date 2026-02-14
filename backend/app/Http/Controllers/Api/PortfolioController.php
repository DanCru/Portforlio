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
use Illuminate\Support\Facades\Storage;

class PortfolioController extends Controller
{
    // Model mapping for polymorphic admin routes
    private function getModel(string $type)
    {
        $models = [
            'experiences' => Experience::class,
            'experience' => Experience::class,
            'skills' => Skill::class,
            'skill' => Skill::class,
            'educations' => Education::class,
            'education' => Education::class,
            'projects' => Project::class,
            'project' => Project::class,
            'certifications' => Certification::class,
            'certification' => Certification::class,
        ];

        return $models[$type] ?? null;
    }

    // ==================
    // PUBLIC ENDPOINTS
    // ==================

    public function publicIndex()
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

    public function showProject($slug)
    {
        $project = Project::where('is_active', true)->get()->first(function ($p) use ($slug) {
            $slugData = $p->slug;
            if (is_array($slugData)) {
                return ($slugData['vi'] ?? '') === $slug || ($slugData['en'] ?? '') === $slug;
            }
            return $slugData === $slug;
        });

        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        return response()->json($project);
    }

    // ==================
    // ADMIN ENDPOINTS
    // ==================

    public function updateSettings(Request $request)
    {
        $settings = $request->input('settings', []);
        
        foreach ($settings as $setting) {
            PortfolioSetting::updateOrCreate(
                ['key' => $setting['key']],
                ['value' => $setting['value']]
            );
        }

        return response()->json(['message' => 'Settings updated successfully']);
    }

    public function index($type)
    {
        $modelClass = $this->getModel($type);
        if (!$modelClass) {
            return response()->json(['message' => 'Invalid type'], 400);
        }

        return response()->json(
            $modelClass::orderBy('sort_order', 'asc')->get()
        );
    }

    public function store(Request $request, $type)
    {
        $modelClass = $this->getModel($type);
        if (!$modelClass) {
            return response()->json(['message' => 'Invalid type'], 400);
        }

        $data = $request->except(['image', 'icon_url_file', 'gallery_images_files']);
        
        // Parse JSON strings back to arrays
        foreach ($data as $key => $value) {
            if (is_string($value) && in_array($key, ['title', 'slug', 'category', 'description', 'long_description', 'content', 'position', 'company', 'location', 'degree', 'school', 'name', 'issuer', 'role', 'responsibilities', 'tech_stack', 'features', 'metrics', 'achievements', 'technologies'])) {
                $decoded = json_decode($value, true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    $data[$key] = $decoded;
                }
            }
            if (in_array($key, ['start_date', 'end_date', 'issue_date']) && $value === '') {
                $data[$key] = null;
            }
        }

        // Handle main image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('portfolio', 'public');
            $data['image'] = '/storage/' . $path;
        }

        // Handle skill icon upload
        if ($request->hasFile('icon_url_file')) {
            $path = $request->file('icon_url_file')->store('portfolio/icons', 'public');
            $data['icon_url'] = '/storage/' . $path;
        }

        // Handle gallery images upload
        if ($request->hasFile('gallery_images_files')) {
            $galleryPaths = [];
            foreach ($request->file('gallery_images_files') as $file) {
                $path = $file->store('portfolio/gallery', 'public');
                $galleryPaths[] = '/storage/' . $path;
            }
            $existing = isset($data['gallery_images']) ? json_decode($data['gallery_images'], true) : [];
            $data['gallery_images'] = array_merge($existing ?: [], $galleryPaths);
        }

        $item = $modelClass::create($data);
        
        return response()->json($item, 201);
    }

    public function update(Request $request, $type, $id)
    {
        $modelClass = $this->getModel($type);
        if (!$modelClass) {
            return response()->json(['message' => 'Invalid type'], 400);
        }

        $item = $modelClass::findOrFail($id);
        $data = $request->except(['image', 'icon_url_file', 'gallery_images_files', '_method']);

        // Parse JSON strings back to arrays
        foreach ($data as $key => $value) {
            if (is_string($value) && in_array($key, ['title', 'slug', 'category', 'description', 'long_description', 'content', 'position', 'company', 'location', 'degree', 'school', 'name', 'issuer', 'role', 'responsibilities', 'tech_stack', 'features', 'metrics', 'achievements', 'technologies'])) {
                $decoded = json_decode($value, true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    $data[$key] = $decoded;
                }
            }
            if (in_array($key, ['start_date', 'end_date', 'issue_date']) && $value === '') {
                $data[$key] = null;
            }
        }

        // Handle main image upload
        if ($request->hasFile('image')) {
            // Delete old image
            if ($item->image) {
                $oldPath = str_replace('/storage/', '', $item->image);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image')->store('portfolio', 'public');
            $data['image'] = '/storage/' . $path;
        }

        // Handle skill icon upload
        if ($request->hasFile('icon_url_file')) {
            if (isset($item->icon_url) && $item->icon_url) {
                $oldPath = str_replace('/storage/', '', $item->icon_url);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('icon_url_file')->store('portfolio/icons', 'public');
            $data['icon_url'] = '/storage/' . $path;
        }

        // Handle gallery images upload
        if ($request->hasFile('gallery_images_files')) {
            $galleryPaths = [];
            foreach ($request->file('gallery_images_files') as $file) {
                $path = $file->store('portfolio/gallery', 'public');
                $galleryPaths[] = '/storage/' . $path;
            }
            $existing = $item->gallery_images ?: [];
            $data['gallery_images'] = array_merge($existing, $galleryPaths);
        }

        $item->update($data);
        
        return response()->json($item);
    }

    public function destroy($type, $id)
    {
        $modelClass = $this->getModel($type);
        if (!$modelClass) {
            return response()->json(['message' => 'Invalid type'], 400);
        }

        $item = $modelClass::findOrFail($id);
        
        // Delete associated image
        if (isset($item->image) && $item->image) {
            $path = str_replace('/storage/', '', $item->image);
            Storage::disk('public')->delete($path);
        }

        $item->delete();
        
        return response()->json(['message' => 'Item deleted successfully']);
    }

    public function reorder(Request $request, $type)
    {
        $modelClass = $this->getModel($type);
        if (!$modelClass) {
            return response()->json(['message' => 'Invalid type'], 400);
        }

        $items = $request->input('items', []);
        
        foreach ($items as $item) {
            $modelClass::where('id', $item['id'])->update(['sort_order' => $item['sort_order']]);
        }

        return response()->json(['message' => 'Items reordered successfully']);
    }
}
