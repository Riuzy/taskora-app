<?php

namespace Tests\Feature\Api\Task;

use App\Models\Project;
use App\Models\Task;
use App\Models\TaskComment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class TaskCommentTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_task_comments(): void
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user);

        $project = Project::factory()->create();

        $task = Task::factory()->create([
            'project_id' => $project->id,
        ]);

        TaskComment::factory()->count(3)->create([
            'task_id' => $task->id,
            'user_id' => $user->id,
        ]);

        $response = $this->getJson(
            "/api/projects/{$project->uuid}/tasks/{$task->uuid}/comments"
        );

        $response
            ->assertOk()
            ->assertJsonCount(3, 'data');
    }

    public function test_can_create_comment(): void
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user);

        $project = Project::factory()->create();

        $task = Task::factory()->create([
            'project_id' => $project->id,
        ]);

        $response = $this->postJson(
            "/api/projects/{$project->uuid}/tasks/{$task->uuid}/comments",
            [
                'content' => 'This is a comment.',
            ]
        );

        $response
            ->assertCreated()
            ->assertJsonPath('data.content', 'This is a comment.');

        $this->assertDatabaseHas('task_comments', [
            'task_id' => $task->id,
            'user_id' => $user->id,
            'content' => 'This is a comment.',
        ]);
    }

    public function test_content_is_required(): void
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user);

        $project = Project::factory()->create();

        $task = Task::factory()->create([
            'project_id' => $project->id,
        ]);

        $response = $this->postJson(
            "/api/projects/{$project->uuid}/tasks/{$task->uuid}/comments",
            []
        );

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors([
                'content',
            ]);
    }

    public function test_can_delete_own_comment(): void
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user);

        $project = Project::factory()->create();

        $task = Task::factory()->create([
            'project_id' => $project->id,
        ]);

        $comment = TaskComment::factory()->create([
            'task_id' => $task->id,
            'user_id' => $user->id,
        ]);

        $response = $this->deleteJson(
            "/api/projects/{$project->uuid}/tasks/{$task->uuid}/comments/{$comment->uuid}"
        );

        $response
            ->assertOk();

        $this->assertSoftDeleted('task_comments', [
            'id' => $comment->id,
        ]);
    }

    public function test_cannot_delete_other_user_comment(): void
    {
        $owner = User::factory()->create();

        $anotherUser = User::factory()->create();

        Sanctum::actingAs($anotherUser);

        $project = Project::factory()->create();

        $task = Task::factory()->create([
            'project_id' => $project->id,
        ]);

        $comment = TaskComment::factory()->create([
            'task_id' => $task->id,
            'user_id' => $owner->id,
        ]);

        $response = $this->deleteJson(
            "/api/projects/{$project->uuid}/tasks/{$task->uuid}/comments/{$comment->uuid}"
        );

        $response->assertForbidden();
    }
}
