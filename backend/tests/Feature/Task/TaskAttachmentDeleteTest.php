<?php

namespace Tests\Feature\Task;

use App\Enums\UserRole;
use App\Models\Project;
use App\Models\Task;
use App\Models\TaskAttachment;
use App\Models\Team;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class TaskAttachmentDeleteTest extends TestCase
{
    use RefreshDatabase;

    public function test_owner_can_delete_attachment(): void
    {
        Storage::fake('public');

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

        Storage::disk('public')->put(
            'tasks/test.pdf',
            'dummy file'
        );

        $attachment = TaskAttachment::factory()->create([
            'task_id' => $task->id,
            'user_id' => $user->id,
            'path' => 'tasks/test.pdf',
        ]);

        $response = $this->deleteJson(
            "/api/projects/{$project->uuid}/tasks/{$task->uuid}/attachments/{$attachment->uuid}"
        );

        $response->assertOk();

        $this->assertSoftDeleted('task_attachments', [
            'id' => $attachment->id,
        ]);

        Storage::disk('public')->assertMissing(
            'tasks/test.pdf'
        );
    }

    public function test_non_owner_cannot_delete_attachment(): void
    {
        Storage::fake('public');

        $team = Team::factory()->create();

        $owner = User::factory()->create([
            'team_id' => $team->id,
        ]);

        $user = User::factory()->create([
            'team_id' => $team->id,
        ]);

        Sanctum::actingAs($user);

        $project = Project::factory()->create([
            'team_id' => $team->id,
            'created_by' => $owner->id,
        ]);

        $task = Task::factory()->create([
            'project_id' => $project->id,
            'assignee_id' => $owner->id,
            'created_by' => $owner->id,
        ]);

        Storage::disk('public')->put(
            'tasks/test.pdf',
            'dummy file'
        );

        $attachment = TaskAttachment::factory()->create([
            'task_id' => $task->id,
            'user_id' => $owner->id,
            'path' => 'tasks/test.pdf',
        ]);

        $response = $this->deleteJson(
            "/api/projects/{$project->uuid}/tasks/{$task->uuid}/attachments/{$attachment->uuid}"
        );

        $response->assertForbidden();
    }

    public function test_manager_can_delete_any_attachment(): void
    {
        Storage::fake('public');

        $team = Team::factory()->create();

        $owner = User::factory()->create([
            'team_id' => $team->id,
            'role' => UserRole::Staff,
        ]);

        $manager = User::factory()->create([
            'team_id' => $team->id,
            'role' => UserRole::Manager,
        ]);

        Sanctum::actingAs($manager);

        $project = Project::factory()->create([
            'team_id' => $team->id,
            'created_by' => $owner->id,
        ]);

        $task = Task::factory()->create([
            'project_id' => $project->id,
            'assignee_id' => $owner->id,
            'created_by' => $owner->id,
        ]);

        Storage::disk('public')->put(
            'tasks/test.pdf',
            'dummy file'
        );

        $attachment = TaskAttachment::factory()->create([
            'task_id' => $task->id,
            'user_id' => $owner->id,
            'path' => 'tasks/test.pdf',
        ]);

        $response = $this->deleteJson(
            "/api/projects/{$project->uuid}/tasks/{$task->uuid}/attachments/{$attachment->uuid}"
        );

        $response->assertOk();

        $this->assertSoftDeleted('task_attachments', [
            'id' => $attachment->id,
        ]);

        Storage::disk('public')->assertMissing(
            'tasks/test.pdf'
        );
    }

    public function test_return_404_if_attachment_not_belongs_to_task(): void
    {
        Storage::fake('public');

        $team = Team::factory()->create();

        $user = User::factory()->create([
            'team_id' => $team->id,
        ]);

        Sanctum::actingAs($user);

        $project = Project::factory()->create([
            'team_id' => $team->id,
            'created_by' => $user->id,
        ]);

        $taskA = Task::factory()->create([
            'project_id' => $project->id,
            'assignee_id' => $user->id,
            'created_by' => $user->id,
        ]);

        $taskB = Task::factory()->create([
            'project_id' => $project->id,
            'assignee_id' => $user->id,
            'created_by' => $user->id,
        ]);

        $attachment = TaskAttachment::factory()->create([
            'task_id' => $taskB->id,
            'user_id' => $user->id,
        ]);

        $response = $this->deleteJson(
            "/api/projects/{$project->uuid}/tasks/{$taskA->uuid}/attachments/{$attachment->uuid}"
        );

        $response->assertNotFound();
    }

    public function test_guest_cannot_delete_attachment(): void
    {
        $project = Project::factory()->create();

        $task = Task::factory()->create([
            'project_id' => $project->id,
        ]);

        $attachment = TaskAttachment::factory()->create([
            'task_id' => $task->id,
        ]);

        $response = $this->deleteJson(
            "/api/projects/{$project->uuid}/tasks/{$task->uuid}/attachments/{$attachment->uuid}"
        );

        $response->assertUnauthorized();
    }
}
