<?php

namespace Tests\Feature\TeamMember;

use Tests\TestCase;
use App\Models\Team;
use App\Models\User;
use App\Enums\UserRole;
use Laravel\Sanctum\Sanctum;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AddTeamMemberTest extends TestCase
{
    use RefreshDatabase;

    public function test_manager_can_add_members_to_team(): void
    {
        $manager = User::factory()->create([
            'role' => UserRole::Manager,
        ]);

        Sanctum::actingAs($manager);

        $team = Team::factory()->create([
            'manager_id' => $manager->id,
        ]);

        $users = User::factory()
            ->count(3)
            ->create([
                'role' => UserRole::Staff,
                'team_id' => null,
            ]);

        $response = $this->postJson(
            "/api/teams/{$team->uuid}/members",
            [
                'user_uuids' => $users
                    ->pluck('uuid')
                    ->toArray(),
            ]
        );

        $response
            ->assertOk()
            ->assertJson([
                'success' => true,
            ]);

        foreach ($users as $user) {

            $this->assertDatabaseHas('users', [

                'id' => $user->id,

                'team_id' => $team->id,

            ]);

        }
    }
}
