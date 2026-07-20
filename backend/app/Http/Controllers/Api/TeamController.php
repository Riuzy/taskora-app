<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TeamCollection;
use App\Http\Resources\TeamDetailResource;
use App\Http\Resources\TeamResource;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TeamController extends Controller
{

    public function index(Request $request)
    {
        $query = Team::query()
            ->with('manager')
            ->withCount('members');

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $teams = $query
            ->latest()
            ->paginate(10);

        return new TeamCollection($teams);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'is_active' => ['sometimes','boolean'],
        ]);

        $team = Team::create([
            'uuid' => Str::uuid(),
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'manager_id' => $request->user()->id,
            'is_active' => $validated['is_active'] ?? true,
        ]);

        $team->load('manager')
            ->loadCount('members');

        return response()->json([
            'success' => true,
            'message' => 'Team created successfully.',
            'data' => new TeamResource($team),
        ], 201);
    }

    public function show(string $uuid)
    {
        $team = Team::query()
            ->with([
                'manager',
                'members',
            ])
            ->withCount('members')
            ->where('uuid', $uuid)
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'message' => 'Team detail retrieved successfully.',
            'data' => new TeamDetailResource($team),
        ]);
    }

    public function update(Request $request, string $uuid)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'is_active' => ['required', 'boolean'],
        ]);

        $team = Team::where('uuid', $uuid)->firstOrFail();

        $team->update([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'is_active' => $validated['is_active'],
        ]);

        $team->load('manager')
            ->loadCount('members');

        return response()->json([
            'success' => true,
            'message' => 'Team updated successfully.',
            'data' => new TeamResource($team),
        ]);
    }

    public function destroy(string $uuid)
    {
        $team = Team::where('uuid', $uuid)->firstOrFail();

        if ($team->members()->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete team because it still has members.',
            ], 422);
        }

        $team->delete();

        return response()->json([
            'success' => true,
            'message' => 'Team deleted successfully.',
        ]);
    }

    public function myTeam(Request $request)
    {
        $team = Team::query()
            ->with([
                'manager',
                'members',
            ])
            ->withCount('members')
            ->findOrFail($request->user()->team_id);

        return new TeamResource($team);
    }
}
