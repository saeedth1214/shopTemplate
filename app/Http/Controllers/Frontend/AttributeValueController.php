<?php
namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Repositories\AttributeValueRepo;
use App\Responses\ResponsesFacade;

class AttributeValueController extends Controller
{
    private $attr_value_Repo=null;

    public function __construct()
    {
        $this->attr_value_Repo=resolve(AttributeValueRepo::class);
    }

    public function getAttrValueFront()
    {
        try {
            $attrValPro = $this->attr_value_Repo->getAttrValueFrontData(request("pid"));
            return ResponsesFacade::success($attrValPro);
        } catch (\Throwable $th) {
            return response($th->getMessage());
            return ResponsesFacade::faild();
        }
    }
}
