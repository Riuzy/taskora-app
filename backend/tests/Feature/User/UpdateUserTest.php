<?php

namespace Tests\Feature\User;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UpdateUserTest extends TestCase
{
    use RefreshDatabase;

    public function test_manager_can_update_user(): void
    {
        $manager = User::factory()->create([
            'role' => UserRole::Manager,
        ]);

        $user = User::factory()->create();

        $response = $this
            ->actingAs($manager)
            ->putJson("/api/users/{$user->uuid}", [

                'employee_id' => $user->employee_id,

                'name' => 'Updated Name',

                'email' => $user->email,

                'phone' => $user->phone,

                'address' => $user->address,

                'gender' => $user->gender,

                'birth_date' => optional($user->birth_date)->format('Y-m-d'),

                'team_id' => null,

                'is_active' => true,

            ]);

        $response->assertOk();

        $this->assertDatabaseHas('users', [
            'name' => 'Updated Name',
        ]);
    }
}
