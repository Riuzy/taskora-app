<?php

namespace Database\Factories;

use App\Enums\ProjectStatus;
use App\Models\Project;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    protected $model = Project::class;

    public function definition(): array
    {
        return [

            'uuid' => Str::uuid(),

            'team_id' => Team::factory(),

            'created_by' => User::factory(),

            'code' => strtoupper(
                fake()->unique()->lexify('PRJ???')
            ),

            'name' => fake()->sentence(2),

            'description' => fake()->paragraph(),

            'status' => ProjectStatus::Planning,

            'start_date' => now(),

            'end_date' => now()->addDays(30),

            'is_active' => true,

        ];
    }
}
