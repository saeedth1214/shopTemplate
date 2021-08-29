<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\product;

class OrderFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Order::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $Uids=User::query()->where('role','user')->pluck('id');
        $Pids=product::query()->pluck('id');
        return [
            "user_id"=>$this->faker->randomElement($Uids),
            "product_id"=>$this->faker->randomElement($Pids),
            "total_items"=>$this->faker->randomDigitNotZero(),
            "total_amount"=>$this->faker->randomDigitNotZero()*1000000,
            "status"=>$this->faker->randomElement(['pending', 'posted', 'completed', 'failed']),
            'created_at'=>$this->faker->dateTime()
        ];
    }
}
