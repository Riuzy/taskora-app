<?php

namespace Tests\Feature\User;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AvailableUserTest extends TestCase
{
    use RefreshDatabase;

    public function test_manager_can_view_available_users(): void
    {
        $manager = User::factory()->create([
            'role' => UserRole::Manager,
        ]);

        User::factory()->count(3)->create([
            'role' => UserRole::Staff,
            'team_id' => null,
        ]);

        $response = $this
            ->actingAs($manager)
            ->getJson('/api/users/available');

        $response
            ->assertOk()
            ->assertJsonStructure([
                'success',
                'message',
                'data',
            ]);
    }
}
