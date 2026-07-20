<?php

namespace Tests\Feature\Team;

use App\Models\Team;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class UpdateTeamTest extends TestCase
{
    use RefreshDatabase;

    public function test_manager_can_update_team(): void
    {
        $manager = User::factory()->create([
            'role' => 'manager',
        ]);

        Sanctum::actingAs($manager);

        $team = Team::factory()->create([
            'manager_id' => $manager->id,
        ]);

        $response = $this->putJson("/api/teams/{$team->uuid}", [
            'name' => 'Backend Team',
            'description' => 'Backend Development',
            'manager_id' => $manager->id,
            'is_active' => true,
        ]);

        $response
            ->assertOk()
            ->assertJsonFragment([
                'success' => true,
            ]);

        $this->assertDatabaseHas('teams', [
            'name' => 'Backend Team',
        ]);
    }
}
