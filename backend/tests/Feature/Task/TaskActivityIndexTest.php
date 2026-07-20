<?php

namespace Tests\Feature\Task;

use App\Enums\TaskActivityAction;
use App\Models\Project;
use App\Models\Task;
use App\Models\TaskActivity;
use App\Models\Team;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class TaskActivityIndexTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_list_task_activities(): void
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

        TaskActivity::factory()
            ->count(3)
            ->create([
                'task_id' => $task->id,
                'user_id' => $user->id,
            ]);

        $response = $this->getJson(
            "/api/projects/{$project->uuid}/tasks/{$task->uuid}/activities"
        );

        $response
            ->assertOk()
            ->assertJsonCount(3, 'data');
    }

    public function test_guest_cannot_list_task_activities(): void
    {
        $project = Project::factory()->create();

        $task = Task::factory()->create([
            'project_id' => $project->id,
        ]);

        $response = $this->getJson(
            "/api/projects/{$project->uuid}/tasks/{$task->uuid}/activities"
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
            "/api/projects/{$projectA->uuid}/tasks/{$task->uuid}/activities"
        );

        $response->assertNotFound();
    }

    public function test_activity_resource_structure_is_correct(): void
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

        TaskActivity::factory()->create([
            'task_id' => $task->id,
            'user_id' => $user->id,
            'action' => TaskActivityAction::CREATED,
            'description' => 'created task',
        ]);

        $response = $this->getJson(
            "/api/projects/{$project->uuid}/tasks/{$task->uuid}/activities"
        );

        $response
            ->assertOk()
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'uuid',
                        'action',
                        'description',
                        'old_value',
                        'new_value',
                        'user' => [
                            'uuid',
                            'name',
                        ],
                        'created_at',
                    ],
                ],
            ]);
    }
}
