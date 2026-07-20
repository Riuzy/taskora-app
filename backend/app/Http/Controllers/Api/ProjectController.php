<?php

namespace App\Http\Controllers\Api;

use App\Enums\ProjectStatus;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::query()
            ->with([
                'team',
                'creator',
            ]);

        if ($request->filled('search')) {

            $search = $request->search;

            $query->where(function ($q) use ($search) {

                $q->where('code', 'like', "%{$search}%")
                    ->orWhere('name', 'like', "%{$search}%");

            });

        }

        if ($request->filled('status')) {

            $query->where(
                'status',
                $request->status
            );

        }

        if ($request->filled('team_uuid')) {

            $team = Team::where(
                'uuid',
                $request->team_uuid
            )->first();

            if ($team) {

                $query->where(
                    'team_id',
                    $team->id
                );

            }

        }

        $projects = $query
            ->latest()
            ->get();

        return ProjectResource::collection($projects);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([

            'team_uuid' => [
                'required',
                'uuid',
                'exists:teams,uuid',
            ],

            'code' => [
                'required',
                'string',
                'max:20',
                'unique:projects,code',
            ],

            'name' => [
                'required',
                'string',
                'max:100',
            ],

            'description' => [
                'nullable',
                'string',
            ],

            'status' => [
                'required',
                Rule::enum(ProjectStatus::class),
            ],

            'start_date' => [
                'nullable',
                'date',
            ],

            'end_date' => [
                'nullable',
                'date',
                'after_or_equal:start_date',
            ],

            'is_active' => [
                'required',
                'boolean',
            ],

        ]);

        $team = Team::where(
            'uuid',
            $validated['team_uuid']
        )->firstOrFail();

        $project = Project::create([

            'uuid' => Str::uuid(),

            'team_id' => $team->id,

            'created_by' => Auth::id(),

            'code' => $validated['code'],

            'name' => $validated['name'],

            'description' => $validated['description'] ?? null,

            'status' => $validated['status'],

            'start_date' => $validated['start_date'] ?? null,

            'end_date' => $validated['end_date'] ?? null,

            'is_active' => $validated['is_active'],

        ]);

        $project->load([
            'team',
            'creator',
        ]);

        return (new ProjectResource($project))
            ->response()
            ->setStatusCode(201);
    }

    public function show(string $uuid)
    {
        $project = Project::query()
            ->with([
                'team',
                'creator',
            ])
            ->where('uuid', $uuid)
            ->firstOrFail();

       return new ProjectResource($project);
    }

    public function update(
        Request $request,
        string $uuid
    )
    {
        $project = Project::where(
            'uuid',
            $uuid
        )->firstOrFail();

        $validated = $request->validate([

            'team_uuid' => [
                'required',
                'uuid',
                'exists:teams,uuid',
            ],

            'code' => [
                'required',
                'string',
                'max:20',
                Rule::unique(
                    'projects',
                    'code'
                )->ignore($project->id),
            ],

            'name' => [
                'required',
                'string',
                'max:100',
            ],

            'description' => [
                'nullable',
                'string',
            ],

            'status' => [
                'required',
                Rule::enum(ProjectStatus::class),
            ],

            'start_date' => [
                'nullable',
                'date',
            ],

            'end_date' => [
                'nullable',
                'date',
                'after_or_equal:start_date',
            ],

            'is_active' => [
                'required',
                'boolean',
            ],

        ]);

        $team = Team::where(
            'uuid',
            $validated['team_uuid']
        )->firstOrFail();

        $project->update([

            'team_id' => $team->id,

            'code' => $validated['code'],

            'name' => $validated['name'],

            'description' => $validated['description'] ?? null,

            'status' => $validated['status'],

            'start_date' => $validated['start_date'] ?? null,

            'end_date' => $validated['end_date'] ?? null,

            'is_active' => $validated['is_active'],

        ]);

        $project->load([
            'team',
            'creator',
        ]);

        return new ProjectResource($project);
    }

    public function destroy(string $uuid)
    {
        $project = Project::where(
            'uuid',
            $uuid
        )->firstOrFail();

        $project->delete();

        return response()->json([
            'message' => 'Project deleted successfully.',
        ]);
    }
}
