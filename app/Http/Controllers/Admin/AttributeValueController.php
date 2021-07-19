<?php
namespace App\Http\Controllers\Admin;

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

    public function getAttributeValue()
    {
        try {
            $attrValPro = $this->attr_value_Repo->getAttrValue(request("pid"));
            return ResponsesFacade::success(['data'=> $attrValPro]);
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
    }
    public function updateAttributeValue()
    {
        $attrValueData=request("attrs");
        try {
            $res=$this->attr_value_Repo->updatAttributeValueRepo($attrValueData);
            if ($res) {
                return ResponsesFacade::success(['msg' => "تغییرات با موفقیت انجام شد"], 202);
            }
            return ResponsesFacade::faild();
        } catch (\Throwable $th) {
            return response($th->getMessage());
            return ResponsesFacade::faild();
        }
    }
}
