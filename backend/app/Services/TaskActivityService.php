<?php

namespace App\Services;

use App\Enums\TaskActivityAction;
use App\Models\Task;
use App\Models\TaskActivity;
use App\Models\User;

class TaskActivityService
{
    public static function record(
        Task $task,
        User $user,
        TaskActivityAction $action,
        string $description,
        ?string $oldValue = null,
        ?string $newValue = null
    ): TaskActivity {
        return TaskActivity::create([
            'task_id' => $task->id,
            'user_id' => $user->id,
            'action' => $action,
            'description' => $description,
            'old_value' => $oldValue,
            'new_value' => $newValue,
        ]);
    }
}
