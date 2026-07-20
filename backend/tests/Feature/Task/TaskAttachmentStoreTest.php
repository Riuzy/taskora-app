<?php

namespace Tests\Feature\Task;

use App\Models\Project;
use App\Models\Task;
use App\Models\TaskAttachment;
use App\Models\Team;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class TaskAttachmentStoreTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_upload_attachment(): void
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

        $file = UploadedFile::fake()->create(
            'design.pdf',
            500,
            'application/pdf'
        );

        $response = $this->postJson(
            "/api/projects/{$project->uuid}/tasks/{$task->uuid}/attachments",
            [
                'file' => $file,
            ]
        );

        $response
            ->assertCreated()
            ->assertJsonStructure([
                'data' => [
                    'uuid',
                    'original_name',
                    'file_name',
                    'extension',
                    'mime_type',
                    'size',
                    'url',
                    'uploaded_by',
                    'created_at',
                ]
            ]);

        $this->assertDatabaseHas('task_attachments', [
            'task_id' => $task->id,
            'user_id' => $user->id,
            'original_name' => 'design.pdf',
        ]);

        $attachment = TaskAttachment::first();

        Storage::disk('public')->assertExists(
            $attachment->path
        );
    }

    public function test_file_is_required(): void
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

        $response = $this->postJson(
            "/api/projects/{$project->uuid}/tasks/{$task->uuid}/attachments",
            []
        );

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors([
                'file',
            ]);
    }

    public function test_return_404_if_task_not_belongs_to_project(): void
    {
        Storage::fake('public');

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

        $file = UploadedFile::fake()->create(
            'design.pdf',
            500,
            'application/pdf'
        );

        $response = $this->postJson(
            "/api/projects/{$projectA->uuid}/tasks/{$task->uuid}/attachments",
            [
                'file' => $file,
            ]
        );

        $response->assertNotFound();
    }

    public function test_guest_cannot_upload_attachment(): void
    {
        Storage::fake('public');

        $project = Project::factory()->create();

        $task = Task::factory()->create([
            'project_id' => $project->id,
        ]);

        $file = UploadedFile::fake()->create(
            'design.pdf',
            500
        );

        $response = $this->postJson(
            "/api/projects/{$project->uuid}/tasks/{$task->uuid}/attachments",
            [
                'file' => $file,
            ]
        );

        $response->assertUnauthorized();
    }
}
