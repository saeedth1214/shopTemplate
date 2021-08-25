<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\category;
use App\Repositories\CategoryRepositories;
use App\Repositories\ProductRepositories;
use App\Responses\ResponsesFacade;

class CategoryController extends Controller
{
    private $cateRepo = null;

    public function __construct()
    {
        $this->cateRepo = resolve(CategoryRepositories::class);
    }
    public function create()
    {
        $data = [
            'slug' => request('slug'),
            'title' => request('title'),
        ];
        try {
            $category = $this->cateRepo->create($data);
            if ($category instanceof category) {
                return ResponsesFacade::success(['msg' => "یک دسته بندی با موفقیت ثبت شد", "data" => $category], 201);
            }
            return ResponsesFacade::faild();
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
    }

    public function brands_product()
    {
        $proRepo=resolve(ProductRepositories::class);
        $category=$this->cateRepo->find(request()->cid);
        $brands=$category->brands();
        $products=$proRepo->getInfoWithid(request()->cid);

        return response([$brands,$products], 200);
    }

    public function update()
    {
        $data = [
            'slug' => request('slug'),
            'title' => request('title'),
        ];
        try {
            $cate = $this->cateRepo->find(request()->id);
            if (!$cate) {
                return ResponsesFacade::success(["msg" => " چنین دسته بندی پیدا نشد"], 400);
            }
            $category = $cate->update($data);
            if (!$category) {
                return ResponsesFacade::faild();
            }
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
        return ResponsesFacade::success(['msg' => "ویرایش دسته بندی انجام شد",], 202);
    }

    public function delete(int $id)
    {
        try {
            $cat = $this->cateRepo->find($id);
            if ($cat) {
                $res = $cat->delete();
                if ($res) {
                    return ResponsesFacade::success(["msg"=>"یک دسته بندی حذف شد"], 202);
                }
                return ResponsesFacade::faild();
            }
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
    }
}
