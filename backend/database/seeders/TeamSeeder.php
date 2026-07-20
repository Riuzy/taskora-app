<?php

namespace Database\Seeders;

use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TeamSeeder extends Seeder
{
    public function run(): void
    {
        $manager = User::where('role', 'manager')->first();

        if (!$manager) {
            return;
        }

        Team::create([
            'uuid' => Str::uuid(),
            'name' => 'Development Team',
            'description' => 'Software Development Division',
            'manager_id' => $manager->id,
            'is_active' => true,
        ]);
    }
}
