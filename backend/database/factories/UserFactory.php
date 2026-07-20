<?php

namespace Database\Factories;

use App\Enums\UserRole;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    public function definition(): array
    {
        return [
            'uuid' => Str::uuid(),

            'team_id' => null,

            'employee_id' => 'EMP-' . fake()->unique()->numberBetween(1001, 9999),

            'name' => fake()->name(),

            'email' => fake()->unique()->safeEmail(),

            'password' => Hash::make('password'),

            'role' => UserRole::Staff,

            'phone' => fake()->phoneNumber(),

            'address' => fake()->address(),

            'avatar' => null,

            'gender' => fake()->randomElement([
                'male',
                'female',
            ]),

            'birth_date' => fake()->date(),

            'is_active' => true,

            'remember_token' => Str::random(10),
        ];
    }
}