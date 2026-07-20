<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'fadhillah@taskora.test'],
            [
                'uuid' => Str::uuid(),
                'employee_id' => 'EMP-0001',
                'name' => 'Fadhillah Ahmad',
                'password' => 'password',
                'role' => UserRole::Manager,
                'phone' => '081234567890',
                'address' => 'Madiun, Jawa Timur',
                'gender' => 'male',
                'avatar' => null,
                'is_active' => true,
            ]
        );

        User::updateOrCreate(
            ['email' => 'rifandi@taskora.test'],
            [
                'uuid' => Str::uuid(),
                'employee_id' => 'EMP-0002',
                'name' => 'Rifandi Usdan',
                'password' => 'password',
                'role' => UserRole::Staff,
                'phone' => '081234567891',
                'address' => 'Madiun, Jawa Timur',
                'gender' => 'male',
                'avatar' => null,
                'is_active' => true,
            ]
        );
    }
}