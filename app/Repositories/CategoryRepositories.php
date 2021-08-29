<?php

namespace App\Repositories;

use App\Models\category;

class CategoryRepositories extends BaseRepository
{
    protected $model = category::class;


    public function search($data)
    {
        return $this->model::where('fullname', 'like', "%$data%")->first();
    }

    public function ids()
    {
        return $this->model::all()->pluck('id', 'title');
    }

    public function setAttributes($cat_id, $attrs)
    {
        $cat = $this->model::query()->find($cat_id);
        if ($cat) {
            return $cat->attributes()->sync($attrs);
        }
        return false;
    }

    public function getAttributes($cat_id)
    {
        $cat = $this->model::query()->find($cat_id);
        if ($cat) {
            return $cat->attributes()->pluck("attribute_id")->toArray();
        }
        return false;
    }

    public function allAttributes($cat_id)
    {
        $cat = $this->model::query()->find($cat_id);
        if ($cat) {
            return $cat->attributes()->get();
        }
        return false;
    }
    
    public function getCat($cid)
    {
        if ($cid==0) {
            return $this->model::where("parent", "<>", 1)->get();
        }
        return $this->model::get();
    }

    public function mainCate()
    {
        // return $this->model::join("categories as c1", "c1.id", "=", "categories.parent")
        // ->where("parent", 1)->get();

        return $this->model::where("parent", 1)
        ->orWhere(function ($query) {
            $query->whereIn("parent", $query->pluck("id"));
        })->get();

        $mainCategory= $this->model::where('parent', 1)->pluck("id");
        $mainCategoryFull= $this->model::where('parent', 1)->get(["id","title"]);
        $subCategory =$this->model::whereIn('parent', $mainCategory)->get(["title","id","parent"]);

        return [$mainCategoryFull,$subCategory];
    }


    public function getInfoWithParent($parentid)
    {
        return $this->model::Join('products', 'category_id', '=', 'categories.id')
            ->where('categories.parent', $parentid)
            ->select("products.title", 'products.category_id', 'products.id', 'products.price')->get();
    }


    public function getIdwithSlug($parent, $slug = null)
    {
        if (is_null($slug)) {
            return $this->model::where('slug', $parent)->value('id');
        }
        $pid = $this->getIdwithSlug($parent);
        return $this->model::where(['slug' => $slug, 'parent' => $pid])->value('id');
    }

    public function getAttr($pid)
    {

        // return $this->model;
        return $this->model::join('category_attribute', 'categories.id', '=', 'category_attribute.category_id')
            ->join('attributes', 'category_attribute.attribute_id', '=', 'attributes.id')
            ->join('attribute_value', 'attributes.id', '=', 'attribute_value.attribute_id')
            ->select("attributes.title", "attribute_value.value")
            ->where('attribute_value.product_id', $pid)->get()->toArray();
    }
}
