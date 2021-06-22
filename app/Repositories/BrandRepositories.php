<?php

namespace App\Repositories;

use App\Models\brand;

class BrandRepositories extends BaseRepository
{
    protected $model = brand::class;



    public function getcategoryBrands($cid)
    {
        return $this->model::where("category_id", $cid)->get(['id',"slug","title"]);
    }
}
