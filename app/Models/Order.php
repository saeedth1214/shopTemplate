<?php

namespace App\Models;

use App\Repositories\ShamsiRepositories;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
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

    

    // public function getStatusAttribute()
    // {
    //     $map=[
    //         "completed"=>"تکمیل شده",
    //         "failed"=>"ناموفق",
    //     ];
    //     return $map[$this->attributes['status']];
    // }
}
