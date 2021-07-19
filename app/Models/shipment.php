<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class shipment extends Model
{

    public $timestamps=false;

    const REGISTERED="registered";
    const POSETD="posted";
    const DELEIVERED="delivered";


    const STATUS=[self::REGISTERED,self::POSETD,self::DELEIVERED];
}
