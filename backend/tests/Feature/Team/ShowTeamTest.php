<?php

namespace Tests\Feature\Team;

use Tests\TestCase;
use App\Models\Team;
use App\Models\User;
use App\Enums\UserRole;
use Laravel\Sanctum\Sanctum;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ShowTeamTest extends TestCase
{
    use RefreshDatabase;

    public function test_manager_can_view_team_detail(): void
    {
        // Arrange
        $manager = User::factory()->create([
            'role' => UserRole::Manager,
        ]);

        Sanctum::actingAs($manager);

        $team = Team::factory()->create([
            'manager_id' => $manager->id,
        ]);

        User::factory()->count(3)->create([
            'team_id' => $team->id,
            'role' => UserRole::Staff,
        ]);

        // Act
        $response = $this->getJson(
            "/api/teams/{$team->uuid}"
        );

        // Assert
        $response
            ->assertOk()
            ->assertJson([
                'success' => true,
            ])
            ->assertJsonPath(
                'data.uuid',
                (string) $team->uuid
            )
            ->assertJsonPath(
                'data.name',
                $team->name
            )
            ->assertJsonPath(
                'data.member_count',
                3
            );
    }

    public function test_show_team_returns_404_when_team_not_found(): void
    {
        $manager = User::factory()->create([
            'role' => UserRole::Manager,
        ]);

        Sanctum::actingAs($manager);

        $response = $this->getJson(
            '/api/teams/00000000-0000-0000-0000-000000000000'
        );

        $response->assertNotFound();
    }
}
