<?php

namespace Tests\Feature\Team;

use App\Models\Team;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class DeleteTeamTest extends TestCase
{
    use RefreshDatabase;

    public function test_manager_can_delete_team(): void
    {
        $manager = User::factory()->create([
            'role' => 'manager',
        ]);

        Sanctum::actingAs($manager);

        $team = Team::factory()->create([
            'manager_id' => $manager->id,
        ]);

        $response = $this->deleteJson("/api/teams/{$team->uuid}");

        $response
            ->assertOk()
            ->assertJsonFragment([
                'success' => true,
            ]);

        $this->assertSoftDeleted('teams', [
            'id' => $team->id,
        ]);
    }
}
