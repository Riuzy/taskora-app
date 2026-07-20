<?php

namespace Tests\Feature\Project;

use Tests\TestCase;
use App\Models\Team;
use App\Models\User;
use App\Models\Project;
use App\Enums\UserRole;
use App\Enums\ProjectStatus;
use Laravel\Sanctum\Sanctum;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UpdateProjectTest extends TestCase
{
    use RefreshDatabase;

    public function test_manager_can_update_project(): void
    {
        $manager = User::factory()->create([
            'role' => UserRole::Manager,
        ]);

        Sanctum::actingAs($manager);

        $team = Team::factory()->create();

        $project = Project::factory()->create([
            'team_id' => $team->id,
            'created_by' => $manager->id,
        ]);

        $response = $this->putJson(
            "/api/projects/{$project->uuid}",
            [
                'team_uuid' => $team->uuid,
                'code' => 'TASK',
                'name' => 'Taskora V2',
                'description' => 'Updated',
                'status' => ProjectStatus::Active->value,
                'start_date' => '2026-07-20',
                'end_date' => '2026-09-20',
                'is_active' => true,
            ]
        );

        $response->assertOk();

        $this->assertDatabaseHas(
            'projects',
            [
                'name' => 'Taskora V2',
                'status' => ProjectStatus::Active->value,
            ]
        );
    }
}
