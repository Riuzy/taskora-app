<?php

namespace Tests\Feature\Task;

use App\Enums\TaskActivityAction;
use App\Models\Project;
use App\Models\Task;
use App\Models\TaskActivity;
use App\Models\TaskAttachment;
use App\Models\TaskComment;
use App\Models\Team;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class TaskDetailTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_view_task_detail(): void
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

        TaskComment::factory()->count(2)->create([
            'task_id' => $task->id,
            'user_id' => $user->id,
        ]);

        TaskAttachment::factory()->count(2)->create([
            'task_id' => $task->id,
            'user_id' => $user->id,
        ]);

        TaskActivity::factory()->count(3)->create([
            'task_id' => $task->id,
            'user_id' => $user->id,
            'action' => TaskActivityAction::CREATED,
        ]);

        $response = $this->getJson(
            "/api/projects/{$project->uuid}/tasks/{$task->uuid}"
        );

        $response
            ->assertOk()
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

                    'comments',

                    'attachments',

                    'activities',

                    'start_date',

                    'due_date',

                    'completed_at',

                    'created_at',

                    'updated_at',

                ]
            ]);

        $response->assertJsonCount(2, 'data.comments');

        $response->assertJsonCount(2, 'data.attachments');

        $response->assertJsonCount(3, 'data.activities');
    }

    public function test_guest_cannot_view_task_detail(): void
    {
        $project = Project::factory()->create();

        $task = Task::factory()->create([
            'project_id' => $project->id,
        ]);

        $response = $this->getJson(
            "/api/projects/{$project->uuid}/tasks/{$task->uuid}"
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
            "/api/projects/{$projectA->uuid}/tasks/{$task->uuid}"
        );

        $response->assertNotFound();
    }
}
