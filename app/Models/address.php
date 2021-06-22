<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class address extends Model
{
    public $timestamps = false;

    protected $guarded = ['id'];

    //


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
