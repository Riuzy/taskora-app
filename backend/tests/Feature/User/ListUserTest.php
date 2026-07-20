<?php

namespace Tests\Feature\User;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ListUserTest extends TestCase
{
    use RefreshDatabase;

    public function test_manager_can_view_user_list(): void
    {
        $manager = User::factory()->create([
            'role' => UserRole::Manager,
        ]);

        User::factory()->count(5)->create();

        $response = $this
            ->actingAs($manager)
            ->getJson('/api/users');

        $response
            ->assertOk()
            ->assertJsonStructure([
                'success',
                'message',
                'data',
            ]);
    }
}
