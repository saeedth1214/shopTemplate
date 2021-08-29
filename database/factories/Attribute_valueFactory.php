<?php

namespace Database\Factories;

use App\Models\Attribute_value;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\product;
use App\Models\attribute;
use App\Models\category;

class Attribute_valueFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Attribute_value::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {

        $Pids = product::query()->pluck('id');
        $Cids = category::query()->pluck('id');
        $Atids = attribute::query()->pluck('id');

        return [
            'product_id'=>$this->faker->randomElement($Pids),
            'category_id'=>$this->faker->randomElement($Cids),
            'attribute_id'=>$this->faker->randomElement($Atids),
            'value'=>$this->faker->name(10)
        ];
    }
}
