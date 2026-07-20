<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class TeamFactory extends Factory
{
    public function definition(): array
    {
        return [
            'uuid' => Str::uuid(),

            'name' => fake()->company().' Team',

            'description' => fake()->sentence(),

            'manager_id' => User::factory(),

            'is_active' => true,
        ];
    }
}
