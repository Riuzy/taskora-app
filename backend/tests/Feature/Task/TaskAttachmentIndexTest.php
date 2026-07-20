<?php

namespace Tests\Feature\Task;

use App\Models\Project;
use App\Models\Task;
use App\Models\TaskAttachment;
use App\Models\Team;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class TaskAttachmentIndexTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_list_task_attachments(): void
    {
        $team = Team::factory()->create();

        $user = User::factory()->create([
            'team_id' => $team->id,
        ]);

        Sanctum::actingAs($user);

        $project = Project::factory()->create([
            'team_id' => $team->id,
            'created_by' => $user->id,
        ]);

        $task = Task::factory()->create([
            'project_id' => $project->id,
            'assignee_id' => $user->id,
            'created_by' => $user->id,
        ]);

        TaskAttachment::factory()
            ->count(3)
            ->create([
                'task_id' => $task->id,
                'user_id' => $user->id,
            ]);

        $response = $this->getJson(
            "/api/projects/{$project->uuid}/tasks/{$task->uuid}/attachments"
        );

        $response
            ->assertOk()
            ->assertJsonCount(3, 'data');
    }

    public function test_guest_cannot_list_task_attachments(): void
    {
        $project = Project::factory()->create();

        $task = Task::factory()->create([
            'project_id' => $project->id,
        ]);

        $response = $this->getJson(
            "/api/projects/{$project->uuid}/tasks/{$task->uuid}/attachments"
        );

        $response->assertUnauthorized();
    }

    public function test_return_404_if_task_not_belongs_to_project(): void
    {
        $team = Team::factory()->create();

        $user = User::factory()->create([
            'team_id' => $team->id,
        ]);

        Sanctum::actingAs($user);

        $projectA = Project::factory()->create([
            'team_id' => $team->id,
            'created_by' => $user->id,
        ]);

        $projectB = Project::factory()->create([
            'team_id' => $team->id,
            'created_by' => $user->id,
        ]);

        $task = Task::factory()->create([
            'project_id' => $projectB->id,
            'assignee_id' => $user->id,
            'created_by' => $user->id,
        ]);

        $response = $this->getJson(
            "/api/projects/{$projectA->uuid}/tasks/{$task->uuid}/attachments"
        );

        $response->assertNotFound();
    }
}
