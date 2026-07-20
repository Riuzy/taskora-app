<?php

namespace Database\Factories;

use App\Models\Task;
use App\Models\TaskAttachment;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class TaskAttachmentFactory extends Factory
{
    protected $model = TaskAttachment::class;

    public function definition(): array
    {
        return [
            'task_id' => Task::factory(),
            'user_id' => User::factory(),

            'original_name' => 'document.pdf',

            'file_name' => Str::uuid().'.pdf',

            'mime_type' => 'application/pdf',

            'extension' => 'pdf',

            'size' => fake()->numberBetween(1000, 100000),

            'path' => 'tasks/'.Str::uuid().'.pdf',
        ];
    }
}
