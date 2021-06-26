<?php

namespace App\Http\Controllers\Frontend;

use App\Repositories\CategoryRepositories;
use  App\Repositories\ProductRepositories;
use App\Http\Controllers\Controller;
use App\Repositories\ReviewRepositories;
use App\Repositories\MediaRepositories;
use App\Repositories\replyRepositories;
use App\Repositories\AttributeRepositories;
use App\Models\product;
use App\Models\category;
use App\Responses\ResponsesFacade;

class ProductController extends Controller
{
    private $productRepo = null;
    private $attributeRepo = null;
    private $categoryRepo = null;
    private $mediaRepo = null;
    private $reviewRepo = null;
    private $replyRepo = null;

    private const DEFULT_IMAGE_FOLDER="storage/images/";
    public function __construct()
    {
        $this->productRepo = resolve(ProductRepositories::class);
        $this->attributeRepo = resolve(AttributeRepositories::class);
        $this->categoryRepo = resolve(CategoryRepositories::class);
        $this->mediaRepo = resolve(MediaRepositories::class);
        $this->reviewRepo = resolve(ReviewRepositories::class);
        $this->replyRepo = resolve(replyRepositories::class);
    }

    public function randomProduct()
    {
        try {
            $products = $this->productRepo->random();
            $newData = $this->getProductImage($products);
            return ResponsesFacade::success($newData);
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
    }


    public function getProductByCategory()
    {
        try {
            $category = $this->categoryRepo->find(request()->cid);

            if ($category instanceof category) {
                $products = $category->products();
                $newData = $this->getProductImage($products);
                return ResponsesFacade::success($newData);
            }
            return ResponsesFacade::warning(['msg' => "چنین دسته بندی وجود ندارد"]);
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
    }

    public function getSingleProduct()
    {
        try {
            $product = $this->productRepo->find(request()->pid);
            if ($product instanceof product) {
                $data = $this->getSliderImage($product);
                return ResponsesFacade::success($data);
            }
            return ResponsesFacade::warning(['msg'=>"چنین محصولی وجود ندارد"]);
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
    }

    private function getSliderImage($product)
    {
        $newData =[];
        $existsUrls = [];
        $urls = $product->slideImages();
        if (sizeof($urls)) {
            foreach ($urls as $value) {
                if (!empty($value->url) && (file_exists(public_path(self::DEFULT_IMAGE_FOLDER . $value->url)) && is_readable(public_path( self::DEFULT_IMAGE_FOLDER . $value->url)))) {
                    $existsUrls[] =  $value->url;
                }
            }
            $newData = ["id" => $product->id, "title" => $product->title, 'urls' => $existsUrls, "price" => $product->price, "brand_id" => $product->brand_id,"description"=>$product->description,"quantity"=>$product->quantity];
        } else {
            $newData = ["id" => $product->id, "title" => $product->title, "price" => $product->price, "brand_id" => $product->brand_id, "description" => $product->description, "quantity" => $product->quantity];
        }
        return $newData;
    }

    private function getProductImage($products)
    {
        $productData = [];
        $newData = [];
        foreach ($products as $product) {
            $newData = ["id" => $product->id, "title" => $product->title,"price" => $product->price, "brand_id" => $product->brand_id];
            $url = $product->productImage();
            if (!is_null($url) && (file_exists(public_path( self::DEFULT_IMAGE_FOLDER. $url->url))&&is_readable(public_path( self::DEFULT_IMAGE_FOLDER. $url->url)))) {
                $newData['url'] = $url->url;
            }
            $productData[]=$newData;
        }
        // dd($productData);
        return $productData;
    }
    public function searchPro(string $cpname)
    {
//        dd($cpId);
        if (is_string($cpname) && request()->has('slug')) {
            $cpId = $this->catRepo->getIdwithSlug($cpname, request()->slug);
            $products = $this->productRepo->getInfoWithid($cpId)->toArray();
            return view("frontend.product.cate-pro", compact('products'));
        }
        if (is_string($cpname)) {
            $cpId = $this->catRepo->getIdwithSlug($cpname);
            $products = $this->catRepo->getInfoWithParent($cpId)->toArray();
            return view("frontend.product.cate-pro", compact('products'));
        }
    }
}
