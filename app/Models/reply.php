<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class reply extends Model
{
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

    public function getdataAttribute()
    {
        return ShamsiRepositories::miladi_to_shamsi($this->attributes['created_at']);
    }
}
