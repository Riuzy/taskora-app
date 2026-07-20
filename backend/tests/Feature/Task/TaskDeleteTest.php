<?php

namespace Tests\Feature\Task;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskDeleteTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_delete_task(): void
    {
        $user = User::factory()->create();

        $project = Project::factory()->create();

        $task = Task::factory()->create([
            'project_id' => $project->id,
        ]);

        $response = $this
            ->actingAs($user)
            ->deleteJson("/api/projects/{$project->uuid}/tasks/{$task->uuid}");

        $response
            ->assertOk()
            ->assertJson([
                'message' => 'Task deleted successfully.',
            ]);

        $this->assertSoftDeleted($task);
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
            ->deleteJson("/api/projects/{$projectA->uuid}/tasks/{$task->uuid}")
            ->assertNotFound();
    }

    public function test_guest_cannot_delete_task(): void
    {
        $project = Project::factory()->create();

        $task = Task::factory()->create([
            'project_id' => $project->id,
        ]);

        $this
            ->deleteJson("/api/projects/{$project->uuid}/tasks/{$task->uuid}")
            ->assertUnauthorized();
    }
}
