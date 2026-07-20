<?php

namespace Tests\Feature\User;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DeleteUserTest extends TestCase
{
    use RefreshDatabase;

    public function test_manager_can_delete_user(): void
    {
        $manager = User::factory()->create([
            'role' => UserRole::Manager,
        ]);

        $user = User::factory()->create();

        $response = $this
            ->actingAs($manager)
            ->deleteJson("/api/users/{$user->uuid}");

        $response->assertOk();

        $this->assertSoftDeleted($user);
    }
}
