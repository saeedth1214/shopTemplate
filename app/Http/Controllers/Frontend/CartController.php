<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Repositories\MediaRepositories;
use App\Repositories\ProductRepositories;
use App\Services\Card;

class CartController extends Controller
{
    private $productRepo = null;
    private $mediaRepo = null;

    public function __construct()
    {
        $this->productRepo = resolve(ProductRepositories::class);
        $this->mediaRepo = resolve(MediaRepositories::class);
    }

    public function index()
    {
        $productLatest = $this->productRepo->latest(5)->toArray();
        $productRandom = $this->productRepo->random(10)->toArray();
        return view('frontend.home.index', compact('productLatest', 'productRandom'));
    }

    public function cart()
    {

        $products = $this->productRepo->infoWithImg(array_values(Card::itemsIds()));
        return view('frontend.home.cart', compact('products'));
    }

    public function remove($pid)
    {
        Card::remove($pid);
        return redirect()->back()->with('success', 'یک محصول از سبد خرید حذف شد');
    }

    public function update()
    {
        Card::update(request()->pid, request()->count);
        $price = $this->productRepo->getprice(request()->pid);
        $totalprice = $price * request()->count;
        return response()->json(['success' => 'ویرایش اطلاعات با موفقیت انجام شد','total'=>$totalprice]);

    }
}
