<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class attribute extends Model
{
    use HasFactory;
    public $timestamps = false;
    public $table = "attributes";
    public $perPage = 5;
    const TINY_TEXT = 'tinytext';
    const BIG_TEXT = 'bigtext';
    const INTEGER_T = 'integer';
    const FLOAT_T = 'float';
    const TYPES = [
        self::TINY_TEXT, self::BIG_TEXT,
        self::INTEGER_T, self::FLOAT_T
    ];
    

    public $fillable = ['slug', 'title', 'type'];

    public function categories()
    {
        return $this->belongsToMany(category::class, 'category_attribute', 'attribute_id', 'category_id');
    }
    // public function getTypeAttribute($type)
    // {
    //     // $type=$this->attributes['type'];
    //     switch ($type) {
    //         case self::TINY_TEXT:
    //             return " <input type='text' class='form-control form-control-sm' required name=' attr[$id]'/>";
    //         case self::BIG_TEXT:
    //             return "<textarea class='form-control form-control-sm big-text' required name=' attr[$id]' cols='10' rows='5' placeholder='توضیحات ...'></textarea>";
    //         case self::INTEGER_T:
    //             return " <input type='number' min='0' max='4096'  class='form-control form-control-sm' required name=' attr[$id]'/>";
    //         case self::FLOAT_T:
    //             return " <input type='number' step='0.1' min='0' max='100000000' class='form-control form-control-sm' required name='attr[$id]'/>";
    //     }
    // }
}
