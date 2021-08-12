<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Repositories\ShamsiRepositories;

class reply extends Model
{
    use HasFactory;
    const CREATED_AT = 'created_at';
    const UPDATED_AT = null;
    protected $guarded = ['id'];
    protected $hidden=[
        "id"
    ];
    protected $table= "reply-message";

    public function message()
    {
        return $this->belongsTo(review::class, "message_id", "id");
    }

    public function getdateAttribute()
    {
        return ShamsiRepositories::miladi_to_shamsi($this->attributes['date']);
    }
}
