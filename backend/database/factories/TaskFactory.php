<?php

namespace Database\Factories;

use App\Enums\TaskPriority;
use App\Enums\TaskStatus;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    public function definition(): array
    {
        return [
            'project_id' => Project::factory(),

            'assignee_id' => User::factory(),

            'created_by' => User::factory(),

            'title' => fake()->sentence(),

            'description' => fake()->paragraph(),

            'status' => fake()->randomElement(TaskStatus::cases()),

            'priority' => fake()->randomElement(TaskPriority::cases()),

            'start_date' => now(),

            'due_date' => now()->addDays(rand(1, 14)),

            'completed_at' => null,
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | Status
    |--------------------------------------------------------------------------
    */

    public function todo(): static
    {
        return $this->state(fn () => [
            'status' => TaskStatus::TODO,
            'completed_at' => null,
        ]);
    }

    public function inProgress(): static
    {
        return $this->state(fn () => [
            'status' => TaskStatus::IN_PROGRESS,
            'completed_at' => null,
        ]);
    }

    public function review(): static
    {
        return $this->state(fn () => [
            'status' => TaskStatus::REVIEW,
            'completed_at' => null,
        ]);
    }

    public function done(): static
    {
        return $this->state(fn () => [
            'status' => TaskStatus::DONE,
            'completed_at' => now(),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Priority
    |--------------------------------------------------------------------------
    */

    public function lowPriority(): static
    {
        return $this->state(fn () => [
            'priority' => TaskPriority::LOW,
        ]);
    }

    public function mediumPriority(): static
    {
        return $this->state(fn () => [
            'priority' => TaskPriority::MEDIUM,
        ]);
    }

    public function highPriority(): static
    {
        return $this->state(fn () => [
            'priority' => TaskPriority::HIGH,
        ]);
    }

    public function criticalPriority(): static
    {
        return $this->state(fn () => [
            'priority' => TaskPriority::CRITICAL,
        ]);
    }

     public function overdue(): static
    {
        return $this->state(fn () => [
            'status' => TaskStatus::IN_PROGRESS,
            'due_date' => now()->subDays(2),
            'completed_at' => null,
        ]);
    }

    public function dueToday(): static
    {
        return $this->state(fn () => [
            'due_date' => today(),
        ]);
    }

    public function upcoming(): static
    {
        return $this->state(fn () => [
            'due_date' => now()->addDays(7),
        ]);
    }


}
