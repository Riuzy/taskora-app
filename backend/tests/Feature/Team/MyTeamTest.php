<?php

namespace Tests\Feature\Team;

use App\Models\Team;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class MyTeamTest extends TestCase
{
    use RefreshDatabase;

    public function test_staff_can_view_their_team(): void
    {
        $manager = User::factory()->create([
            'role' => 'manager',
        ]);

        $team = Team::factory()->create([
            'manager_id' => $manager->id,
        ]);

        $staff = User::factory()->create([
            'role' => 'staff',
            'team_id' => $team->id,
        ]);

        Sanctum::actingAs($staff);

        $response = $this->getJson('/api/teams/my-team');

        $response
            ->assertOk()
            ->assertJsonFragment([
                'uuid' => $team->uuid,
            ]);
    }
}
