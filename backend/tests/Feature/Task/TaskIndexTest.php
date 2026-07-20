<?php

namespace Tests\Feature\Task;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskIndexTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_get_project_tasks(): void
    {
        $user = User::factory()->create();

        $project = Project::factory()->create();

        Task::factory()
            ->count(5)
            ->create([
                'project_id' => $project->id,
            ]);

        $response = $this
            ->actingAs($user)
            ->getJson("/api/projects/{$project->uuid}/tasks");

        $response
            ->assertOk()
            ->assertJsonCount(5, 'data');
    }

    public function test_guest_cannot_get_tasks(): void
    {
        $project = Project::factory()->create();

        $this
            ->getJson("/api/projects/{$project->uuid}/tasks")
            ->assertUnauthorized();
    }
}
