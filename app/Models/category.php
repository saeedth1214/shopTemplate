<?php

namespace App\Models;

use App\Repositories\CategoryRepositories;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Config;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class category extends Model
{
    use HasFactory;
    public $timestamps = false;
    public $perPage = 4;

    //

    public $fillable = ['slug', 'title'];

    public function attributes()
    {
        return $this->belongsToMany(attribute::class, 'category_attribute');
    }


    public function brands()
    {
        return $this->hasMany(brand::class, "category_id");
    }


    public function products()
    {
        return $this->hasMany(product::class, "category_id")->get(["products.title", 'products.category_id', 'products.id', 'products.price', "products.brand_id", "products.quantity"]);
    }
    // public function getParentAttribute()
    // {
    //     $parent = $this->attributes['parent'];

    //     /** @var  CategoryRepositories $catRepo */
    //     $catRepo = resolve(CategoryRepositories::class);
    //     return $parent == 1 ? 'دسته بندی اصلی' : $catRepo->findByField($parent);
    // }

    // public function getBannerAttribute()
    // {
    //     $arr = explode("/", $this->attributes['banner']);
    //     $banner = end($arr);
    //     $filePath = Config::get('constants.options.UPLOAD_PATH') . $banner;
    //     if (file_exists(file_exists($filePath)) and is_readable($filePath)) ;
    //     {
    //         $basePath = Config::get('constants.options.BASE_URL') . $filePath;
    //         return "<a href='$basePath'><img src='$basePath' alt='banner' class='banner'></a>   ";
    //     }
    //     return "عکسی انتخاب نشده است";
    // }
}
