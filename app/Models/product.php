<?php

namespace App\Models;

use App\Repositories\ShamsiRepositories;
use Illuminate\Database\Eloquent\Model;

class product extends Model
{
    public $timestamps = false;
    //
    protected $perPage = 5;

    protected $guarded = ['id'];

//    protected $fillable=['product_id','user_id','comment','created_at','rate',];

    public function getdateAttribute()
    {
        return ShamsiRepositories::miladi_to_shamsi($this->attributes['created_at']);
    }


    public function reveiws ()
    {
        return $this->hasMany(review::class);
    }
//     public function comments()
//     {
// //        is user
//         return $this->hasMany(review::class);

//            ->where('status',1)->with(array('user'=>function($query){

//            $query->select('id','fullname','avatar');
//        }))->addSelect('rate','comment')->get();
//         return $this->hasMany(review::class )->where('status',1)->with('user:id,fullname,avatar')->get();
//     }

    public function medias()
    {
        return $this->hasMany(media::class);
    }
    public function order()
    {
        return $this->hasOne(order::class);
    }

    public function productImage()
    {
        return $this->hasMany(media::class)->where("type", "product_image")->orderBy("created_at", "desc")->first();
    }

    public function slideImages()
    {
        return $this->hasMany(media::class)->where("type", 'slider_image')->orderBy("created_at", "desc")->get(["url"]);
    }

    public function category()
    {
        return $this->hasOne(category::class);
    }
    public function brand()
    {
        return $this->hasOne(brand::class);
    }
    public function getPriceAttribute()
    {
        $price = $this->attributes["price"];
        return number_format($price);
    }
}
