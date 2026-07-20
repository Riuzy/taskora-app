<?php

namespace Tests\Feature\User;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StoreUserTest extends TestCase
{
    use RefreshDatabase;

    public function test_manager_can_create_user(): void
    {
        $manager = User::factory()->create([
            'role' => UserRole::Manager,
        ]);

        $response = $this
            ->actingAs($manager)
            ->postJson('/api/users', [

                'employee_id' => 'EMP001',

                'name' => 'John Doe',

                'email' => 'john@example.com',

                'password' => 'password123',

                'phone' => '08123456789',

                'address' => 'Indonesia',

                'gender' => 'male',

                'birth_date' => '2000-01-01',

                'is_active' => true,

            ]);

        $response->assertCreated();

        $this->assertDatabaseHas('users', [
            'employee_id' => 'EMP001',
            'email' => 'john@example.com',
        ]);
    }
}
