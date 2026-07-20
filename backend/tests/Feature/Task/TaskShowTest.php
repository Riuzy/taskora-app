<?php

namespace Tests\Feature\Task;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskShowTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_view_task(): void
    {
        $user = User::factory()->create();

        $project = Project::factory()->create();

        $task = Task::factory()->create([
            'project_id' => $project->id,
        ]);

        $response = $this
            ->actingAs($user)
            ->getJson("/api/projects/{$project->uuid}/tasks/{$task->uuid}");

        $response
            ->assertOk()
            ->assertJsonPath('data.uuid', $task->uuid)
            ->assertJsonPath('data.title', $task->title);
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
            ->getJson("/api/projects/{$projectA->uuid}/tasks/{$task->uuid}")
            ->assertNotFound();
    }

    public function test_guest_cannot_view_task(): void
    {
        $project = Project::factory()->create();

        $task = Task::factory()->create([
            'project_id' => $project->id,
        ]);

        $this
            ->getJson("/api/projects/{$project->uuid}/tasks/{$task->uuid}")
            ->assertUnauthorized();
    }
}
