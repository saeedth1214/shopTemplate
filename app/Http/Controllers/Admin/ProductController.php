<?php

namespace App\Http\Controllers\Admin;

use App\Http\traits\singleProduct;
use App\Models\product;
use  App\Repositories\ProductRepositories;
use  App\Repositories\AttributeValueRepo;
use App\Http\Controllers\Controller;
use App\Repositories\CategoryRepositories;
use App\Repositories\MediaRepositories;
use App\Repositories\ReviewRepositories;
use App\Repositories\replyRepositories;
use App\Repositories\dashbordRepository;
use App\Responses\ResponsesFacade;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    // use singleProduct;
    private $productRepo = null;
    private $attributeValueRepo=null;
    private $categoryRepo=null;
    private $mediaRepo=null;
    private $reviewRepo=null;
    private $replyRepo=null;

    public function __construct()
    {
        $this->productRepo = resolve(ProductRepositories::class);
        $this->attributeValueRepo=resolve(AttributeValueRepo::class);
        $this->categoryRepo=resolve(CategoryRepositories::class);
        $this->mediaRepo=resolve(MediaRepositories::class);
        $this->reviewRepo=resolve(ReviewRepositories::class);
        $this->replyRepo=resolve(replyRepositories::class);
    }

    public function index()
    {
        try {
            $products = $this->productRepo->total();
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
        return ResponsesFacade::success($products, 200);
    }

    public function remove()
    {
        try {
            $this->productRepo->remove(request()->id);
            return ResponsesFacade::success(["یک محصول از سیستم حذف شد"], 202);
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
    }

    public function create()
    {
        $pro_data = [
            'category_id' => request()->category,
            "brand_id" => request()->brand,
            'price' => request()->price,
            'quantity' => request()->quantity,
            'title' => request()->title,
            'description' => request()->description,
        ];
        try {
            DB::beginTransaction();
            $ProRes = $this->productRepo->create($pro_data);
            $this->productRepo->setAttributes($ProRes, request()->attributeArray);
            if ($ProRes instanceof product) {
                app()->make(dashbordRepository::class)->productCountUpdate();
                DB::commit();
                return ResponsesFacade::success(["msg" => "یک محصول با موفقیت ثبت کردید"], 201);
            }
            DB::rollBack();
            return ResponsesFacade::faild();
        } catch (\Throwable $th) {
            DB::rollBack();
            return ResponsesFacade::faild();
        }
    }

    public function update()
    {
        try {
            $product = $this->productRepo->find(request()->id);
            if ($product) {
                $pro_data = [
                    'category_id' => request()->cid,
                    "brand_id" => request()->bid,
                    'price' => request()->price,
                    'quantity' => request()->quantity,
                    'title' => request()->pro_title,
                    'description' => request()->description,
                ];
                $res_pro = $product->update($pro_data);
                if ($res_pro) {
                    return ResponsesFacade::success(['msg'=>"تغییرات با موفقیت انجام شد"], 202);
                }
                return ResponsesFacade::warning(["msg" => "چنین محصولی پیدا نشد"]);
            }
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
    }
}
