<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\category;
use App\Models\brand;
use App\Models\product;
use App\Models\User;
use Illuminate\Support\Facades\Schema;
use App\Models\media;
use App\Models\attribute;
use App\Models\attribute_value;
use Database\Factories\ReviewFactory;
use App\Models\review;
use App\Models\reply;
use App\Models\Order;
use Illuminate\Support\Facades\DB;
use Faker\Factory;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $faker=Factory::create();
        Schema::disableForeignKeyConstraints();
        // category::factory()->count(5)->create();
        // brand::factory(5)->create();
        // product::factory(20)->create();
        // User::factory(10)->create();

        // media::factory(20)->create();

        // attribute::factory(10)->create();
        // attribute_value::factory(15)->create();

        // review::factory(20)->create();
        // reply::factory(20)->create();


        // Order::factory(20)->create();

        $aIds=attribute::query()->pluck('id');
        $cIds=category::query()->pluck('id');
        $data=[];
        for ($i=0; $i <10 ; $i++) {
            $data[]=[ "attribute_id"=> $faker->randomElement($aIds), "category_id"=> $faker->randomElement($cIds)];
        }
        DB::table('category_attribute')->insert($data);
    }
}
