<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Models\attribute_value;

class AttributeValueRepo extends BaseRepository
{
    protected $model = attribute_value::class;

    public function getAttrValue($pid)
    {
        return $this->model::join("attributes", "attribute_value.attribute_id", "attributes.id")
        ->where("attribute_value.product_id", "=", $pid)
        ->select("attribute_value.id as attrValID", "attributes.id as attrID", "attributes.title as atTitle", "attribute_value.value as element", "attributes.type as type")->get();
    }

    public function getAttrValueFrontData($pid)
    {
        return $this->model::join("attributes", "attribute_value.attribute_id", "attributes.id")
            ->where("attribute_value.product_id", "=", $pid)
            ->select("attributes.id", "attributes.title", "attribute_value.value")->get();
    }
    
    public function updatAttributeValueRepo($data)
    {
        foreach ($data as $key => $value) {
            $res=attribute_value::query()->where('id', $value['attrValID'])->update(['value'=>$value['element']]);
        }

        return $res;
    }
}
