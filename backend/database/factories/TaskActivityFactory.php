<?php

namespace Database\Factories;

use App\Enums\TaskActivityAction;
use App\Models\Task;
use App\Models\TaskActivity;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskActivityFactory extends Factory
{
    protected $model = TaskActivity::class;

    public function definition(): array
    {
        return [

            'task_id' => Task::factory(),

            'user_id' => User::factory(),

            'action' => TaskActivityAction::CREATED,

            'description' => fake()->sentence(),

            'old_value' => null,

            'new_value' => null,

        ];
    }
}
