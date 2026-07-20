<?php

namespace Tests\Feature\Project;

use Tests\TestCase;
use App\Models\Team;
use App\Models\User;
use App\Enums\UserRole;
use App\Enums\ProjectStatus;
use Laravel\Sanctum\Sanctum;
use Illuminate\Foundation\Testing\RefreshDatabase;

class StoreProjectTest extends TestCase
{
    use RefreshDatabase;

    public function test_manager_can_create_project(): void
    {
        $manager = User::factory()->create([
            'role' => UserRole::Manager,
        ]);

        Sanctum::actingAs($manager);

        $team = Team::factory()->create();

        $response = $this->postJson(
            '/api/projects',
            [
                'team_uuid' => $team->uuid,
                'code' => 'TASK',
                'name' => 'Taskora Website',
                'description' => 'Project Description',
                'status' => ProjectStatus::Planning->value,
                'start_date' => '2026-07-20',
                'end_date' => '2026-08-20',
                'is_active' => true,
            ]
        );

        $response
            ->assertCreated()
            ->assertJsonFragment([
                'success' => true,
            ]);

        $this->assertDatabaseHas(
            'projects',
            [
                'code' => 'TASK',
                'name' => 'Taskora Website',
            ]
        );
    }
}
