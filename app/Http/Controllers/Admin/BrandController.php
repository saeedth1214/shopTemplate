<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\brandRepositories;
use App\Models\brand;
use App\Responses\ResponsesFacade;

class BrandController extends Controller
{
    private $brandRepo=null;

    public function __construct()
    {
        $this->brandRepo=resolve(brandRepositories::class);
    }

    public function getBrand()
    {
        try {
            $brands = $this->brandRepo->getcategoryBrands(request('catId'));
            return ResponsesFacade::succss($brands);
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
    }

    public function create()
    {
        $data=[
            'title'=>request()->brandTitle,
            'slug'=>request()->brandSlug,
            'category_id'=>request()->catBrand
        ];

        try {
            $brand = $this->brandRepo->create($data);
            if ($brand instanceof brand) {
                return ResponsesFacade::success(['data' => $brand, 'msg' => "یک برند با موفقیت ثبت شد"], 201);
            }
        } catch (\Throwable $th) {
            // return response()->json(['msg' => $th->getMessage()]);
            // return response()->json($th->getMessage());
            return ResponsesFacade::faild();
        }
    }

    public function category_brand()
    {
        $brands=$this->brandRepo->getcategoryBrands(request()->cid);
        if ($brands) {
            return response($brands, 200);
        }
        return response(["msg"=>"سرور دچار مشکل شده است"]);
    }
}
