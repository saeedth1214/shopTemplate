<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\media;
use App\Repositories\MediaRepositories;
use App\Repositories\ProductRepositories;
use Illuminate\Support\Facades\Storage;
use App\Responses\ResponsesFacade;
use Illuminate\Support\Facades\DB;

class MediaController extends Controller
{
    private $mediaRepo = null;
    private $productRepo = null;
    public function __construct()
    {
        $this->mediaRepo = resolve(MediaRepositories::class);
        $this->productRepo = resolve(ProductRepositories::class);
    }
    public function index()
    {
        $medias=$this->mediaRepo->getAllImageWithProName();
        return ResponsesFacade::success($medias);
    }
    public function create()
    {
        try {
            $data = [
                'product_id' => request("proId"),
                'type'  =>  request("fileType"),
                "url" => request()->fileName
            ];
            $media = $this->mediaRepo->createMedia($data);
            $media = $media->getOrSend(function () {
                return ResponsesFacade::faild();
            });
            $image = request()->fileResult;
            $pattern = "/data:image\/[a-zA-z0-9]{3,6};base64,/";
            $result = preg_replace($pattern, '', $image);
            Storage::put(request()->fileName, base64_decode(($result)));
            return ResponsesFacade::success(["msg" => "یک عکس با موفقیت ثبت شد", 'media' => $media], 201);
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
    }
    public function delete()
    {
        try {
            $media = $this->mediaRepo->remove(request('id'));
            if ($media) {
                if (Storage::exists(request('url'))) {
                    Storage::delete(request()->url);
                }
            }
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
        return ResponsesFacade::success(["msg" => "شما یک عکس را ازسیستم حذف کردید"], 202);
    }

    public function update()
    {
        try {
            $media = $this->mediaRepo->find(request('id'));
            if ($media instanceof media) {
                $res = $media->update(['type' => request('type')]);
                if (!$res) {
                    return ResponsesFacade::faild();
                }
            } else {
                return ResponsesFacade::warning(["msg" => "محصول مورد نظر پیدا نشد"], 202);
            }
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }

        return ResponsesFacade::success(["msg" => "ویرایش اطلاعات انجام شد"], 202);
    }
}
