<?php

namespace App\Repositories;

use App\Models\Attribute;

class AttributeRepositories extends BaseRepository
{
    protected $model = attribute::class;


    public function search($data)
    {
        return $this->model::where('fullname', 'like', "%$data%")->first();
    }
    public function ids()
    {
        return $this->model::all()->pluck('id', 'title');
    }

    public function getInfo($ids)
    {
        return $this->model::whereIn('id', $ids)->get();
    }

    public function getAttributes($pid)
    {
        return $this->model::join("attribute_value", "attributes.id","=", "attribute_value.attribute_id")
            ->select("attributes.title", "attribute_value.value")
            ->where('attribute_value.product_id', $pid)->get()->toArray();
    }
}
