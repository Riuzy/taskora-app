<?php

namespace Tests\Feature\User;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ShowUserTest extends TestCase
{
    use RefreshDatabase;

    public function test_manager_can_view_user_detail(): void
    {
        $manager = User::factory()->create([
            'role' => UserRole::Manager,
        ]);

        $user = User::factory()->create();

        $response = $this
            ->actingAs($manager)
            ->getJson("/api/users/{$user->uuid}");

        $response
            ->assertOk()
            ->assertJsonFragment([
                'uuid' => $user->uuid,
            ]);
    }
}
