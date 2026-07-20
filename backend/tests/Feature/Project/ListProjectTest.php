<?php

namespace Tests\Feature\Project;

use Tests\TestCase;
use App\Models\Team;
use App\Models\User;
use App\Models\Project;
use App\Enums\UserRole;
use Laravel\Sanctum\Sanctum;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ListProjectTest extends TestCase
{
    use RefreshDatabase;

    public function test_manager_can_view_project_list(): void
    {
        $manager = User::factory()->create([
            'role' => UserRole::Manager,
        ]);

        Sanctum::actingAs($manager);

        $team = Team::factory()->create();

        Project::factory()
            ->count(5)
            ->create([
                'team_id' => $team->id,
                'created_by' => $manager->id,
            ]);

        $response = $this->getJson(
            '/api/projects'
        );

        $response
            ->assertOk()
            ->assertJsonPath(
                'success',
                true
            )
            ->assertJsonCount(
                5,
                'data'
            );
    }
}
