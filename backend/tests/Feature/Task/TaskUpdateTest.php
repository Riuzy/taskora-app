<?php

namespace Tests\Feature\Task;

use App\Enums\TaskPriority;
use App\Enums\TaskStatus;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskUpdateTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_update_task(): void
    {
        $user = User::factory()->create();

        $project = Project::factory()->create();

        $task = Task::factory()->create([
            'project_id' => $project->id,
        ]);

        $response = $this
            ->actingAs($user)
            ->putJson("/api/projects/{$project->uuid}/tasks/{$task->uuid}", [
                'title' => 'Updated Task',
                'description' => 'Updated Description',
                'status' => TaskStatus::DONE->value,
                'priority' => TaskPriority::HIGH->value,
                'assignee_id' => null,
                'start_date' => now()->toDateString(),
                'due_date' => now()->addDay()->toDateString(),
            ]);

        $response->assertOk();

        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'title' => 'Updated Task',
            'status' => TaskStatus::DONE->value,
            'priority' => TaskPriority::HIGH->value,
        ]);

        $this->assertNotNull(
            $task->fresh()->completed_at
        );
    }

    public function test_title_is_required(): void
    {
        $user = User::factory()->create();

        $project = Project::factory()->create();

        $task = Task::factory()->create([
            'project_id' => $project->id,
        ]);

        $response = $this
            ->actingAs($user)
            ->putJson("/api/projects/{$project->uuid}/tasks/{$task->uuid}", [
                'title' => '',
            ]);

        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'title',
            ]);
    }

    public function test_return_404_if_task_not_belongs_to_project(): void
    {
        $user = User::factory()->create();

        $projectA = Project::factory()->create();

        $projectB = Project::factory()->create();

        $task = Task::factory()->create([
            'project_id' => $projectB->id,
        ]);

        $this
            ->actingAs($user)
            ->putJson("/api/projects/{$projectA->uuid}/tasks/{$task->uuid}", [
                'title' => 'Updated',
                'status' => TaskStatus::TODO->value,
                'priority' => TaskPriority::LOW->value,
            ])
            ->assertNotFound();
    }
}
