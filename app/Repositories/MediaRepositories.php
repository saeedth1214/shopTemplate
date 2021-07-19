<?php

namespace App\Repositories;

use App\Models\media;
use Illuminate\Support\Facades\DB;
use Imanghafoori\Helpers\Nullable;

class MediaRepositories extends BaseRepository
{
    protected $model = media::class;


    public function createMedia($data)
    {
        try {
            $res = $this->create($data);
        } catch (\Throwable $th) {
            return Nullable(null);
        }
        return Nullable($res);
    }
    public function getAllImageWithProName()
    {
        try {
            $res=media::query()->join("products", "medias.product_id", "products.id")
                ->select("medias.id as mid", "medias.url as murl", "medias.type as mtype", "products.title as title")->get();
        } catch (\Throwable $th) {
            return null;
        }

        return $res;
    }

    public function getImgUrl($pid)
    {
        return media::query()->where(['product_id' => $pid, 'type' => "product_image"])->select('url')->get();
    }

    public static function getlastImg($pid)
    {
        return (DB::table('medias')->where(['product_id' => $pid, 'type' => "product_image"])->orderBy('created_at', 'desc')->take(1)->value('url'));
    }

    public static function getThumbnailImg($pid)
    {
        return (DB::table('medias')->where(['product_id' => $pid, 'type' => "product_thumbnail"])->orderBy('created_at', 'desc')->take(3)->get(['url']))->toArray();
    }
}
