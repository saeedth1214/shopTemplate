<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class brand extends Model
{
    use HasFactory;
    public $table="brands";
    public $timestamps = false;
    public $perPage = 4;

    //

    public $fillable = ['slug', 'title', "category_id"];

    public function category()
    {
        return $this->belongsTo(category::class, 'category_id');
    }
}
