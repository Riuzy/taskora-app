<?php

namespace App\Http\Controllers\Api;

use App\Enums\TaskActivityAction;
use App\Http\Controllers\Controller;
use App\Http\Resources\CommentResource;
use App\Models\Project;
use App\Models\Task;
use App\Models\TaskComment;
use App\Services\TaskActivityService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TaskCommentController extends Controller
{
    public function index(Project $project, Task $task)
    {
        abort_if($task->project_id !== $project->id, Response::HTTP_NOT_FOUND);

        $comments = $task->comments()
            ->with('user')
            ->latest()
            ->get();

        return CommentResource::collection($comments);
    }

    public function store(Request $request, Project $project, Task $task)
    {
        abort_if($task->project_id !== $project->id, Response::HTTP_NOT_FOUND);

        $data = $request->validate([
            'content' => ['required', 'string', 'max:5000'],
        ]);

        $comment = $task->comments()->create([
            'user_id' => auth()->id(),
            'content' => $data['content'],
        ]);

        $comment->load('user');

        TaskActivityService::record(
            task: $task,
            user: $request->user(),
            action: TaskActivityAction::COMMENT_ADDED,
            description: 'added a comment'
        );

        return (new CommentResource($comment))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function destroy(Request $request, Project $project, Task $task, TaskComment $comment)
    {
        if ($task->project_id !== $project->id) {
            abort(404);
        }

        if ($comment->task_id !== $task->id) {
            abort(404);
        }

        $user = auth()->user();

        // Hanya pemilik komentar atau manager yang boleh menghapus
        if (
            $comment->user_id !== $user->id &&
            !$user->isManager()
        ) {
            abort(403, 'You are not allowed to delete this comment.');
        }

        $comment->delete();

        TaskActivityService::record(
            task: $task,
            user: $request->user(),
            action: TaskActivityAction::COMMENT_DELETED,
            description: 'deleted a comment'
        );

        return response()->json([
            'message' => 'Comment deleted successfully.',
        ]);
    }
}
