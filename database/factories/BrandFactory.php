<?php

namespace Database\Factories;

use App\Models\Brand;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\category;

class BrandFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Brand::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        Brand::query()->truncate();
        $ids=category::query()->pluck('id');
        return [
            'slug'=>$this->faker->name(10),
            'title'=>$this->faker->name(10),
            'category_id'=>$this->faker->randomElement($ids),
        ];
    }
}
