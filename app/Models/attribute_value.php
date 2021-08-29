<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class attribute_value extends Model
{
    use HasFactory;
    protected $table="attribute_value";
    public $timestamps = false;

    protected $guarded=['id'];
}
