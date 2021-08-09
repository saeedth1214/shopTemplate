<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\brand;
use App\Models\category;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        Product::query()->truncate();
        $Cids = category::query()->pluck('id');
        $Bids = brand::query()->pluck('id');
        return [
            'description' => $this->faker->text(40),
            'title' => $this->faker->title(10),
            'price' => ($this->faker->randomDigit() + 1) *1000,
            'quantity' => ($this->faker->randomDigit() + 1),
            'category_id' => $this->faker->randomElement($Cids),
            'brand_id' => $this->faker->randomElement($Bids),
            'created_at'=>$this->faker->dateTime()
        ];
    }
}
