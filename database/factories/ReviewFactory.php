<?php

namespace Database\Factories;

use App\Models\Review;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\product;
use App\Models\User;

class ReviewFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Review::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $Pids=product::query()->pluck('id');
        $Uids=User::query()->pluck('id');
        return [
        'product_id'=>$this->faker->randomElement($Pids),
        'user_id'=>$this->faker->randomElement($Uids),
        'rate'=>$this->faker->randomElement([0,1,2,3,4,5]),
        'status' =>$this->faker->randomElement([0, 1]),
        'comment'=>$this->faker->text(20),
        'created_at' =>$this->faker->dateTime()
        ];
    }
}
