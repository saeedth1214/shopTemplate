<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class option extends Model
{
    public $timestamps=false;

    protected $perPage=5;

    const GENERAL="general";
    const PARAMETER="parameter";
    const UI="ui";

    const TYPES=[self::GENERAL,self::PARAMETER,self::UI];

    protected $fillable=['id','option_slug','option_value','option_title','option_cat'];

    public function getOptionCatAttribute()
    {
        $option_cat= $this->attributes['option_cat'];
        $cat_name=[
            "ui"=>"ظاهری",
            "general"=>"عمومی",
            "parameter"=>"پارامتری",
        ];
        
        return $cat_name[$option_cat];
    }
}
