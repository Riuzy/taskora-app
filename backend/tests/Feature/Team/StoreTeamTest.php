<?php

namespace Tests\Feature\Team;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class StoreTeamTest extends TestCase
{
    use RefreshDatabase;

    public function test_manager_can_create_team(): void
    {
        $manager = User::factory()->create([
            'role' => 'manager',
        ]);

        Sanctum::actingAs($manager);

        $response = $this->postJson('/api/teams', [
            'name' => 'Development Team',
            'description' => 'Development Team',
            'manager_id' => $manager->id,
            'is_active' => true,
        ]);

        $response
            ->assertCreated()
            ->assertJsonFragment([
                'success' => true,
            ]);

        $this->assertDatabaseHas('teams', [
            'name' => 'Development Team',
        ]);
    }
}