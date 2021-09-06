<?php
namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Repositories\BrandRepositories;
use App\Responses\ResponsesFacade;

class BrandController extends Controller
{
    private $brandRepo=null;

    public function __construct()
    {
        $this->brandRepo=resolve(BrandRepositories::class);
    }

    public function category_brand()
    {
        try {
            $brands = $this->brandRepo->getcategoryBrands(request()->cid);
            if ($brands) {
                return ResponsesFacade::success($brands);
            }
            return ResponsesFacade::faild();
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
    }
}
