<?php

namespace Tests\Feature\Team;

use App\Models\Team;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ListTeamTest extends TestCase
{
    use RefreshDatabase;

    public function test_manager_can_view_team_list(): void
    {
        $manager = User::factory()->create([
            'role' => 'manager',
        ]);

        Team::factory()->count(3)->create([
            'manager_id' => $manager->id,
        ]);

        Sanctum::actingAs($manager);

        $response = $this->getJson('/api/teams');

        $response
            ->assertOk()
            ->assertJsonStructure([
                'data',
                'meta',
            ]);
    }
}
