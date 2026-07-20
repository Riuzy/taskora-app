<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TaskActivityResource;
use App\Models\Project;
use App\Models\Task;

class TaskActivityController extends Controller
{
    public function index(Project $project, Task $task)
    {
        if ($task->project_id !== $project->id) {
            abort(404);
        }

        $activities = $task
            ->activities()
            ->with('user')
            ->latest()
            ->get();

        return TaskActivityResource::collection($activities);
    }
}
