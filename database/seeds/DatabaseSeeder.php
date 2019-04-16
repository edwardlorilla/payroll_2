<?php

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
        // $this->call(UsersTableSeeder::class);
        \App\Job::create([
            'job_title' => 'Sample Jobs',
            'standard_pay' => '1000'
        ]);
        $this->call(LaratrustSeeder::class);
    }
}
