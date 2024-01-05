<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        $this->call([
            UserRoleSeeder::class,
            UserSeeder::class,
            FacultyCleanSeeder::class,
            ModuleAndRolePermissionSeeder::class,
            RefRateSeeder::class,
            RefStatusSeeder::class,
            RefCivilStatusSeeder::class,
            RefNationalitySeeder::class,
            RefRegionSeeder::class,
            RefReligionSeeder::class,
            RefReligionSeeder::class,
            SchoolLevelSeeder::class,
            RefPositionSeeder::class,
        ]);
    }
}