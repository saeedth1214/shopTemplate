<?php

namespace App\Models;

use App\Repositories\ShamsiRepositories;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class review extends Model
{
    use HasFactory;
    const CREATED_AT = 'created_at';
    const UPDATED_AT = null;
    protected $guarded = ['id'];

    public $perPage = 5;

    public function product()
    {
        return $this->belongsTo(product::class, 'product_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function getdataAttribute()
    {
        return ShamsiRepositories::miladi_to_shamsi($this->attributes['created_at']);
    }

    public function replys()
    {
        return $this->hasMany(reply::class, "message_id", "id");
    }
    public function getStatusAttribute()
    {
        $map = [
           'غیر فعال',
           'فعال',
       ];

        return $map[$this->attributes['status']];
    }
}
