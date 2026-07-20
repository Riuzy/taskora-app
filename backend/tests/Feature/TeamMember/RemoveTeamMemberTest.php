<?php

namespace Tests\Feature\TeamMember;

use Tests\TestCase;
use App\Models\Team;
use App\Models\User;
use App\Enums\UserRole;
use Laravel\Sanctum\Sanctum;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RemoveTeamMemberTest extends TestCase
{
    use RefreshDatabase;

    public function test_manager_can_remove_team_member(): void
    {
        $manager = User::factory()->create([
            'role' => UserRole::Manager,
        ]);

        Sanctum::actingAs($manager);

        $team = Team::factory()->create([
            'manager_id' => $manager->id,
        ]);

        $staff = User::factory()->create([
            'role' => UserRole::Staff,
            'team_id' => $team->id,
        ]);

        $response = $this->deleteJson(
            "/api/teams/{$team->uuid}/members/{$staff->uuid}"
        );

        $response
            ->assertOk()
            ->assertJson([
                'success' => true,
            ]);

        $this->assertDatabaseHas('users', [

            'id' => $staff->id,

            'team_id' => null,

        ]);
    }
}
