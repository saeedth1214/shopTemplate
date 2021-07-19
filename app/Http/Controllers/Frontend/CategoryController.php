<?php

namespace App\Http\Controllers\Frontend;

use App\Models\product;
use App\Repositories\CategoryRepositories;
use App\Http\Controllers\Controller;
use App\Responses\ResponsesFacade;

class CategoryController extends Controller
{
    private $productRepo = null;
    private $catRepo = null;

    public function __construct()
    {
        $this->catRepo = resolve(CategoryRepositories::class);
    }

    public function index()
    {
        try {
            $categories = $this->catRepo->total();
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
        return ResponsesFacade::success($categories);
    }

    public function addPage()
    {
        $cats = $this->catRepo->total()->get();
        $attrs = [];
        if (request()->has('cat') and intval(request()->cat)) {
            $catid = request()->cat;
            $cat = $this->catRepo->find($catid);
            $attrs = $cat->attributes()->get();
        }

        return view('admin.products.add', compact('cats', 'attrs'));
    }

    public function create()
    {
        $pro_data = [
            'category_id' => request()->cate,
            'price' => request()->input('price'),
            'quantity' => request()->input('quantity'),
            'title' => request()->input('title'),
            'description' => request()->input('description'),
        ];
        $res = $this->productRepo->create($pro_data);
        if ($res instanceof product) {
            $this->productRepo->setAttributes($res, request()->attr);
            return redirect()->action("Admin\ProductController@index")->with('success', "یک محصول اضافه شد");
        }
        return redirect()->action("Admin\ProductController@index")->with('error', "محصول اضافه نشد");
    }

    public function single($pid)
    {
        $info = $this->productRepo->getInfo($pid);
        return view('frontend.product.single', compact('info'));
    }

    public function products($cate)
    {
        if (!intval($cate)) {
            return redirect()->back();
        }

        $pro = $this->productRepo->getproducts($cate);
        dd($pro);
    }
}
