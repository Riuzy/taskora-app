<?php

namespace Database\Seeders;

use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;

class AssignTeamSeeder extends Seeder
{
    public function run(): void
    {
        $team = Team::first();

        if (!$team) {
            return;
        }

        User::query()->update([
            'team_id' => $team->id,
        ]);
    }
}
