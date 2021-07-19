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
use App\Repositories\OrderRepository;

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

    // show product in shop page(first page)
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


    // get product from filter by category
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

    // when i show informations product
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


    // get slider type image to product
    private function getSliderImage($product)
    {
        $newData =[];
        $existsUrls = [];
        $urls = $product->slideImages();
        if (sizeof($urls)) {
            foreach ($urls as $value) {
                if (!empty($value->url) && (file_exists(public_path(self::DEFULT_IMAGE_FOLDER . $value->url)) && is_readable(public_path(self::DEFULT_IMAGE_FOLDER . $value->url)))) {
                    $existsUrls[] =  $value->url;
                }
            }
            $newData = ["id" => $product->id, "title" => $product->title, 'urls' => $existsUrls, "price" => $product->price, "brand_id" => $product->brand_id,"description"=>$product->description,"quantity"=>$product->quantity];
        } else {
            $newData = ["id" => $product->id, "title" => $product->title, "price" => $product->price, "brand_id" => $product->brand_id, "description" => $product->description, "quantity" => $product->quantity];
        }
        return $newData;
    }

    // get normal type image to product in landing page
    private function getProductImage($products)
    {
        $productData = [];
        $newData = [];
        foreach ($products as $product) {
            $newData = ["id" => $product->id, "title" => $product->title,"price" => $product->price, "brand_id" => $product->brand_id , "quantity" => $product->quantity ];
            !isset($product['orderCount']) ?:$newData['orderCount']= $product->orderCount;
            !isset($product['totalSells']) ?:$newData['totalSells']= $product->totalSells;
            $url = $product->productImage();
            if (!is_null($url) && (file_exists(public_path(self::DEFULT_IMAGE_FOLDER. $url->url))&&is_readable(public_path(self::DEFULT_IMAGE_FOLDER. $url->url)))) {
                $newData['url'] = $url->url;
            }
            $productData[]=$newData;
        }
        return $productData;
    }


    public function filterByNewest()
    {
        try {
            $products = $this->productRepo->getNewestProduct();
            $newData = $this->getProductImage($products);
            return ResponsesFacade::success($newData);
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
    }
    public function filterByPopular()
    {
        try {
            $popularPro=$this->productRepo->getPopularProduct();
            $newData = $this->getProductImage($popularPro);
            return ResponsesFacade::success($newData);
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
    }
    public function filterBybestSeller()
    {
        try {
            $products = $this->productRepo->getBestSellerProduct();
            $newData = $this->getProductImage($products);
            return ResponsesFacade::success($newData);
        } catch (\Throwable $th) {
            return $th;
            return ResponsesFacade::faild();
        }
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
