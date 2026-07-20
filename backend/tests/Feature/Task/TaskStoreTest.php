<?php

namespace Tests\Feature\Task;

use App\Enums\TaskPriority;
use App\Enums\TaskStatus;
use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskStoreTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_task(): void
    {
        $user = User::factory()->create();

        $project = Project::factory()->create();

        $response = $this
            ->actingAs($user)
            ->postJson("/api/projects/{$project->uuid}/tasks", [
                'title' => 'Implement Login',
                'description' => 'Login Feature',
                'status' => TaskStatus::TODO->value,
                'priority' => TaskPriority::HIGH->value,
            ]);

        $response
            ->assertCreated()
            ->assertJsonStructure([
                'data' => [
                    'uuid',
                    'title',
                    'description',
                    'status',
                    'status_label',
                    'priority',
                    'priority_label',
                    'assignee',
                    'creator',
                    'start_date',
                    'due_date',
                    'completed_at',
                    'created_at',
                    'updated_at',
                ],
            ]);

        $this->assertDatabaseHas('tasks', [
            'title' => 'Implement Login',
            'created_by' => $user->id,
            'project_id' => $project->id,
        ]);

        $this->assertDatabaseCount('tasks', 1);
    }

    public function test_title_is_required(): void
    {
        $user = User::factory()->create();

        $project = Project::factory()->create();

        $response = $this
            ->actingAs($user)
            ->postJson("/api/projects/{$project->uuid}/tasks", []);

        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'title',
            ]);
    }
}
