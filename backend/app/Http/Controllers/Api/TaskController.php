<?php

namespace App\Http\Controllers\Api;

use App\Enums\TaskActivityAction;
use App\Http\Controllers\Controller;
use App\Http\Resources\TaskCollection;
use App\Http\Resources\TaskDetailResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Models\Task;
use App\Services\TaskActivityService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Project $project): TaskCollection
    {
        $tasks = $project->tasks()
            ->with([
                'assignee',
                'creator',
            ])
            ->withCount([
                'comments',
                'attachments',
            ])
            ->latest()
            ->get();

        return new TaskCollection($tasks);
    }

    public function store(Request $request, Project $project): TaskResource
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['required'],
            'priority' => ['required'],
            'assignee_id' => ['nullable', 'exists:users,id'],
            'start_date' => ['nullable', 'date'],
            'due_date' => ['nullable', 'date', 'after_or_equal:start_date'],
        ]);

        $validated['created_by'] = auth()->id();

        $task = $project->tasks()->create($validated);

        $task->load([
            'assignee',
            'creator',
        ]);

        $task->loadCount([
            'comments',
            'attachments',
        ]);

        TaskActivityService::record(
            task: $task,
            user: $request->user(),
            action: TaskActivityAction::CREATED,
            description: 'created the task'
        );

        return new TaskResource($task);
    }

   public function show(Project $project, Task $task): TaskDetailResource
    {
        $this->checkTask($project, $task);

        $task->load([

            'assignee',

            'creator',

            'comments.user',

            'attachments.user',

            'activities.user',

        ]);

        return new TaskDetailResource($task);
    }

    public function update(
        Request $request,
        Project $project,
        Task $task
    ): TaskResource {

        $this->checkTask($project, $task);

        $validated = $request->validate([
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['sometimes', 'required'],
            'priority' => ['sometimes', 'required'],
            'assignee_id' => ['nullable', 'exists:users,id'],
            'start_date' => ['nullable', 'date'],
            'due_date' => ['nullable', 'date', 'after_or_equal:start_date'],
        ]);

        if (array_key_exists('status', $validated)) {

            $validated['completed_at'] =
                $validated['status'] === 'done'
                    ? now()
                    : null;
        } else {
            $validated['completed_at'] = null;
        }

        $oldStatus = $task->status;
        $oldPriority = $task->priority;

        $task->update($validated);

        $task->load([
            'assignee',
            'creator',
        ]);

        $task->loadCount([
            'comments',
            'attachments',
        ]);

        TaskActivityService::record(
            task: $task,
            user: $request->user(),
            action: TaskActivityAction::UPDATED,
            description: 'updated the task'
        );

        if  (array_key_exists('status', $validated) &&
            $oldStatus !== $task->status) {

            TaskActivityService::record(
                task: $task,
                user: $request->user(),
                action: TaskActivityAction::STATUS_CHANGED,
                description: 'changed status',
                oldValue: $oldStatus->value,
                newValue: $task->status->value
            );

        }

        if (
            array_key_exists('priority', $validated) &&
            $oldPriority !== $task->priority
        ) {

            TaskActivityService::record(
                task: $task,
                user: $request->user(),
                action: TaskActivityAction::PRIORITY_CHANGED,
                description: 'changed priority',
                oldValue: $oldPriority->value,
                newValue: $task->priority->value
            );

        }

        return new TaskResource($task);
    }

    public function updateStatus(
    Request $request,
    Project $project,
    Task $task
    ): TaskResource
    {
        $this->checkTask($project, $task);

        $validated = $request->validate([
            'status' => ['required'],
        ]);

        $oldStatus = $task->status;

        $task->update([
            'status' => $validated['status'],
            'completed_at' => $validated['status'] === 'done'
                ? now()
                : null,
        ]);

        $task->load([
            'assignee',
            'creator',
        ]);

        $task->loadCount([
            'comments',
            'attachments',
        ]);

        if ($oldStatus !== $task->status) {
            TaskActivityService::record(
                task: $task,
                user: $request->user(),
                action: TaskActivityAction::STATUS_CHANGED,
                description: 'changed status',
                oldValue: $oldStatus->value,
                newValue: $task->status->value
            );
        }

        return new TaskResource($task);
    }

    public function destroy(Project $project, Task $task): JsonResponse
    {
        $this->checkTask($project, $task);

        $task->delete();

        return response()->json([
            'message' => 'Task deleted successfully.',
        ]);
    }

    private function checkTask(Project $project, Task $task): void
    {
        abort_if(
            $task->project_id !== $project->id,
            404
        );
    }
}
