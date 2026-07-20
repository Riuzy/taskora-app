<?php

namespace Tests\Feature\Project;

use Tests\TestCase;
use App\Models\Team;
use App\Models\User;
use App\Models\Project;
use App\Enums\UserRole;
use Laravel\Sanctum\Sanctum;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ShowProjectTest extends TestCase
{
    use RefreshDatabase;

    public function test_manager_can_view_project_detail(): void
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

        $response = $this->getJson(
            "/api/projects/{$project->uuid}"
        );

        $response
            ->assertOk()
            ->assertJsonPath(
                'success',
                true
            )
            ->assertJsonPath(
                'data.uuid',
                (string) $project->uuid
            )
            ->assertJsonPath(
                'data.name',
                $project->name
            );
    }
}
