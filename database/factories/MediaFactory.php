<?php

namespace Database\Factories;

use App\Models\Media;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\product;

class MediaFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Media::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $images=[
            'iran-galaxy-j5-2016-j510f-sm-j510fzddthr-000000001-front-gold.jpg',
            'kisspng-laptop-vaio-computer-device-driver-installation-vaio-5ac5eb41520948.424033391522920257336.jpg',
            'desktop-01.jpg',
            '4_zu_3_teaser_GalaxyJ5.jpg',
            'Acer-Aspire-5_A514-54-54G_Gold_modelmain.png',
            'Acer-Aspire-5_A514-54-54G_with-FP-Backlit_Gold_gallery_02.png',
            'AcerAspire3A317-51__1__01.JPG',
            '71CwVBnShDL._AC_SX466_.jpg',
            'vaio-z-ultraportable-carbon-fiber-laptop-notebook.jpg',
        ];
        $pid=product::query()->pluck('id');
        return [
            'product_id'=>$this->faker->randomElement($pid),
            'type'=>$this->faker->randomElement(['product_image','slider_image']),
            'url'=>$this->faker->randomElement($images),
        ];
    }
}
