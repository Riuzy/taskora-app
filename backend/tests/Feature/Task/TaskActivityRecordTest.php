<?php

namespace Tests\Feature\Task;

use App\Enums\ProjectStatus;
use App\Enums\TaskActivityAction;
use App\Enums\TaskPriority;
use App\Enums\TaskStatus;
use App\Models\Project;
use App\Models\Task;
use App\Models\Team;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class TaskActivityRecordTest extends TestCase
{
    use RefreshDatabase;

    public function test_creating_task_records_created_activity(): void
    {
        $team = Team::factory()->create();

        $user = User::factory()->create([
            'team_id' => $team->id,
        ]);

        Sanctum::actingAs($user);

        $project = Project::factory()->create([
            'team_id' => $team->id,
            'created_by' => $user->id,
            'status' => ProjectStatus::Planning,
        ]);

        $payload = [
            'title' => 'Implement Login',
            'description' => 'Create login page',
            'assignee_id' => $user->id,
            'priority' => TaskPriority::MEDIUM->value,
            'status' => TaskStatus::TODO->value,
            'start_date' => now()->toDateString(),
            'due_date' => now()->addDays(7)->toDateString(),
        ];

        $response = $this->postJson(
            "/api/projects/{$project->uuid}/tasks",
            $payload
        );

        $response->assertCreated();

        $taskUuid = $response->json('data.uuid');

        $task = Task::where('uuid', $taskUuid)->first();

        $this->assertNotNull($task);

        $this->assertDatabaseHas('task_activities', [
            'task_id' => $task->id,
            'user_id' => $user->id,
            'action' => TaskActivityAction::CREATED->value,
            'description' => 'created the task',
        ]);
    }

    public function test_updating_status_records_status_changed_activity(): void
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

        $task = Task::factory()->todo()->create([
            'project_id' => $project->id,
            'assignee_id' => $user->id,
            'created_by' => $user->id,
        ]);

        $response = $this->putJson(
            "/api/projects/{$project->uuid}/tasks/{$task->uuid}",
            [
                'title' => $task->title,
                'description' => $task->description,
                'status' => TaskStatus::IN_PROGRESS->value,
                'priority' => $task->priority->value,
                'assignee_id' => $user->id,
                'start_date' => optional($task->start_date)->toDateString(),
                'due_date' => optional($task->due_date)->toDateString(),
            ]
        );

        $response->assertOk();

        $this->assertDatabaseHas('task_activities', [
            'task_id' => $task->id,
            'user_id' => $user->id,
            'action' => TaskActivityAction::STATUS_CHANGED->value,
            'old_value' => TaskStatus::TODO->value,
            'new_value' => TaskStatus::IN_PROGRESS->value,
        ]);
    }

    public function test_updating_priority_records_priority_changed_activity(): void
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

        $task = Task::factory()->mediumPriority()->create([
            'project_id' => $project->id,
            'assignee_id' => $user->id,
            'created_by' => $user->id,
        ]);

        $response = $this->putJson(
            "/api/projects/{$project->uuid}/tasks/{$task->uuid}",
            [
                'title' => $task->title,
                'description' => $task->description,
                'status' => $task->status->value,
                'priority' => TaskPriority::HIGH->value,
                'assignee_id' => $user->id,
                'start_date' => optional($task->start_date)->toDateString(),
                'due_date' => optional($task->due_date)->toDateString(),
            ]
        );

        $response->assertOk();

        $this->assertDatabaseHas('task_activities', [
            'task_id' => $task->id,
            'user_id' => $user->id,
            'action' => TaskActivityAction::PRIORITY_CHANGED->value,
            'old_value' => TaskPriority::MEDIUM->value,
            'new_value' => TaskPriority::HIGH->value,
        ]);
    }
}
