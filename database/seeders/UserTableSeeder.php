<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'name' => 'Iqbal Muhammad Fajar N',
                'username' => 'iqbalmfn',
                'email' => 'iqbalmfn@gmail.com',
                'password' => bcrypt('Iqbal_2804'),
            ],
            [
                'name' => 'Evi Novitasari',
                'username' => 'evinvita',
                'email' => 'evinovita@gmail.com',
                'password' => bcrypt('evi123'),
            ]
        ];

        User::insert($data);
    }
}
