<?php

namespace App\Models;

use App\Repositories\ShamsiRepositories;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;
    protected $guarded = ["id"];
    public $timestamps = true;

    const CREATED_AT = 'created_at';
    const UPDATED_AT = null;
  
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function product()
    {
        return $this->belongsTo(product::class, 'product_id', 'id');
    }

    public function getdateAttribute()
    {
        return ShamsiRepositories::miladi_to_shamsi($this->attributes['date']);
    }


    public function getCreatedAtAttribute()
    {
        $map=[
            4=>"فروردین",
            5=>"اردیبهشت",
            6=>"خرداد",
            7=>"تیر",
            8=>"مرداد",
            9=>"شهریور",
            10=>"مهر",
            11=>"آبان",
            12=>"آذر",
            1=>"دی",
            2=>"بهمن",
            3=>"اسفند",
        ];
        return $map[$this->attributes['created_at']];
    }
    

    // public function getStatusAttribute()
    // {
    //     $map=[
    //         "completed"=>"تکمیل شده",
    //         "failed"=>"ناموفق",
    //     ];
    //     return $map[$this->attributes['status']];
    // }
}
