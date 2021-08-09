<?php

namespace Database\Factories;

use App\Models\Attribute;
use Illuminate\Database\Eloquent\Factories\Factory;

class AttributeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Attribute::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'slug'=>$this->faker->name(10),
            'title'=>$this->faker->name(10),
            'type'=>$this->faker->randomElement([ 'tinytext', 'bigtext', 'integer', 'float']),
        ];
    }
}
