<?php

namespace App\Http\Controllers\Api;

use App\Enums\TaskActivityAction;
use App\Http\Controllers\Controller;
use App\Http\Resources\AttachmentResource;
use App\Models\Project;
use App\Models\Task;
use App\Models\TaskAttachment;
use App\Services\TaskActivityService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TaskAttachmentController extends Controller
{
    public function index(Project $project, Task $task)
    {
        if ($task->project_id !== $project->id) {
            abort(404);
        }

        $attachments = $task->attachments()
            ->with('user')
            ->latest()
            ->get();

        return AttachmentResource::collection($attachments);
    }

    public function store(Request $request, Project $project, Task $task)
    {
        if ($task->project_id !== $project->id) {
            abort(404);
        }

        $request->validate([
            'file' => [
                'required',
                'file',
                'max:10240', // 10 MB
            ],
        ]);

        $file = $request->file('file');

        $fileName = Str::uuid() . '.' . $file->getClientOriginalExtension();

        $path = $file->storeAs(
            'tasks',
            $fileName,
            'public'
        );

        $attachment = TaskAttachment::create([
            'task_id' => $task->id,
            'user_id' => auth()->id(),

            'original_name' => $file->getClientOriginalName(),
            'file_name' => $fileName,
            'mime_type' => $file->getMimeType(),
            'extension' => $file->getClientOriginalExtension(),
            'size' => $file->getSize(),
            'path' => $path,
        ]);

        $attachment->load('user');

        TaskActivityService::record(
            task: $task,
            user: $request->user(),
            action: TaskActivityAction::ATTACHMENT_UPLOADED,
            description: 'uploaded attachment',
            newValue: $attachment->original_name
        );

        return (new AttachmentResource($attachment))
            ->response()
            ->setStatusCode(201);
    }

    public function destroy(
        Request $request,
        Project $project,
        Task $task,
        TaskAttachment $attachment
    ) {
        if ($task->project_id !== $project->id) {
            abort(404);
        }

        if ($attachment->task_id !== $task->id) {
            abort(404);
        }

        $user = auth()->user();

        if (
            $attachment->user_id !== $user->id &&
            !$user->isManager()
        ) {
            abort(403);
        }

        if (Storage::disk('public')->exists($attachment->path)) {
            Storage::disk('public')->delete($attachment->path);
        }

        $attachment->delete();

        TaskActivityService::record(
            task: $task,
            user: $request->user(),
            action: TaskActivityAction::ATTACHMENT_DELETED,
            description: 'deleted attachment',
            oldValue: $attachment->original_name
        );

        return response()->json([
            'message' => 'Attachment deleted successfully.',
        ]);
    }
}