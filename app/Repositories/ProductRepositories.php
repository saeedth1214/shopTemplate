<?php


namespace App\Repositories;

use App\Models\attribute_value;
use App\Models\product;

class ProductRepositories extends BaseRepository
{
    protected $model = product::class;

    public function total()
    {
        return $this->model::join("categories", "products.category_id", "=", "categories.id")
        ->join('brands', "products.brand_id", "brands.id")
        ->select("products.id", "products.title as pro_title", "brands.title as btitle", "brands.id as bid", "products.price", "products.description", "products.quantity", "categories.title as ctitle", "categories.id as cid")->get();
    }

    public function setAttributes($pro=null, $attr)
    {
        $attrVal = resolve(attribute_value::class);
        foreach ($attr as $value) {
            $attrVal->create([
                'category_id' => $pro->category_id,
                'product_id' => $pro->id,
                'attribute_id' => $value["attrID"],
                'value' => $value["element"],
                // 'value' => strlen($value["element"]) !==0 ? $value["element"] :"",
            ]);
        }
    }

    public function setAttributeValues($attribute_Values)
    {
        $attrVal = resolve(attribute_value::class);
        foreach ($attribute_Values as $key => $value) {
            // return $key;
            $attrVal->updateOrCreate([
                'category_id' => $value["category_id"],
                'product_id' => $value[ "product_id"],
                'attribute_id' => $value[ "attribute_id"],
            ], [ 'value' => $value["value"],]);
        }
        // return $pro->attribute_values()->sync($attribute_Values);
    }

    public function removeAttribute($proId)
    {
        $attrObj=resolve(attribute_value::class);
        return $attrObj->where("product_id", $proId)->delete();
    }

    public function latest($number)
    {
        return $this->model::
        select('products.title as pro_title', 'products.price as pro_price', 'products.id')
            ->orderBy('products.created_at', 'desc')->take($number)->get();
    }

    public function random()
    {
        $min=$this->model::orderBy("id", "asc")->value("id");
        $max=$this->model::orderBy("id", "desc")->value("id");
        // return [$min,$max];

        $number=random_int($min, $max);
        $products=$this->model::inRandomOrder()->take($number)->get(["id","title","price","brand_id"]);
        return $products;
    }

    public function infoWithImg($cid)
    {
//        return $this->model::whereIn('id', $ids)->with(['medias:product_id,url'])->get()->toArray();
        return $this->model::join('medias', 'products.id', '=', 'medias.product_id')
            ->whereIn('products.id', $cid)
            ->where('medias.type', 'product_image')
            ->select('medias.product_id', 'products.price as price', 'products.title as title', 'medias.url as url')->get();
    }

    public function getproducts($cateId)
    {
        return $this->model::where('category_id', $cateId)->get();
    }

    public function getprice($pid)
    {
        return $this->model::where("id", $pid)->value("price");
    }

    public function total_price($id, $count)
    {
        return ($this->getprice($id) * $count);
    }
}
