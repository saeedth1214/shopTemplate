<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class dashbord extends Model
{
    public $timestamps = false;

    protected $guarded = ['id'];

    protected $table="dashbord";
    protected $hidden=["id"];
    //
}
