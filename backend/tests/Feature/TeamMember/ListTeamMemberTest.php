<?php

namespace Tests\Feature\TeamMember;

use Tests\TestCase;
use App\Models\Team;
use App\Models\User;
use App\Enums\UserRole;
use Laravel\Sanctum\Sanctum;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ListTeamMemberTest extends TestCase
{
    use RefreshDatabase;

    public function test_manager_can_view_team_members(): void
    {
        // Arrange
        $manager = User::factory()->create([
            'role' => UserRole::Manager,
        ]);

        Sanctum::actingAs($manager);

        $team = Team::factory()->create([
            'manager_id' => $manager->id,
        ]);

        User::factory()
            ->count(5)
            ->create([
                'team_id' => $team->id,
                'role' => UserRole::Staff,
            ]);

        // Act
        $response = $this->getJson(
            "/api/teams/{$team->uuid}/members"
        );

        // Assert
        $response
            ->assertOk()
            ->assertJson([
                'success' => true,
            ])
            ->assertJsonCount(
                5,
                'data'
            );
    }

    public function test_returns_empty_when_team_has_no_members(): void
    {
        // Arrange
        $manager = User::factory()->create([
            'role' => UserRole::Manager,
        ]);

        Sanctum::actingAs($manager);

        $team = Team::factory()->create([
            'manager_id' => $manager->id,
        ]);

        // Act
        $response = $this->getJson(
            "/api/teams/{$team->uuid}/members"
        );

        // Assert
        $response
            ->assertOk()
            ->assertJson([
                'success' => true,
            ])
            ->assertJsonCount(
                0,
                'data'
            );
    }
}
