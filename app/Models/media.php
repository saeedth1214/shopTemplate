<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class media extends Model
{
    use HasFactory;
    public $table='medias';
    public $timestamps=true;
    const P_THUMBNAIL="product_thumbnail";
    const P_IMAGE="product_image";
    const P_3D_IMAGE="product_3D_IMAGE";
    const P_VIDEO="product_video";
    const CREATED_AT="created_at";
    const UPDATED_AT=null;
    const TYPES=[self::P_THUMBNAIL,self::P_IMAGE,self::P_3D_IMAGE,self::P_VIDEO];

    protected $guarded=['id'];

    public function product()
    {
        return $this->belongsTo(product::class, 'product_id', 'id');
    }
}
