<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\AttributeRepositories;
use App\Repositories\CategoryRepositories;
use App\Responses\ResponsesFacade;

class categoryAttributeController extends Controller
{
    private $attrRepo = null;
    private $cateRepo = null;

    public function __construct()
    {
        $this->attrRepo = resolve(AttributeRepositories::class);
        $this->cateRepo = resolve(CategoryRepositories::class);
    }


    public function index()
    {
        try {
            $id = request("id");
            $res = $this->cateRepo->getAttributes($id);
            return ResponsesFacade::success($res);
        } catch (\Throwable $th) {
            return response()->json(['msg'=>$th->getMessage()]);
            return ResponsesFacade::faild();
        }
    }

    public function create()
    {
        $category=request('category');
        $attrs=request("attrs");
        $res = $this->cateRepo->setAttributes($category, $attrs);
        if ($res) {
            return response(["msg" => "یک مورد با موفقیت ساخته شد","data"=>$res], 201);
        }
        return response(["msg" => "خطایی سمت سرور رخ داده است","data"=>$res ], 204);
    }

    public function cateAttr()
    {
        try {
            $id = request("id");
            $data = $this->cateRepo->allAttributes($id);
            return ResponsesFacade::success($data);
            return response(['items'=>$data]);
        } catch (\Throwable $th) {
            
            return ResponsesFacade::faild();
        }
    }
  

    public function update(AttributeRequest $request, int $id)
    {
//        dd($request->all());
        $request->validated($request->except(['_token']));
        $data = [
            'slug' => request('slug'),
            'title' => request('title'),
            'type' => request('type'),
        ];

        $attr = $this->attrRepo->find($id);
        $attr = $attr->update($data);
        if ($attr) {
            return redirect()->action("Admin\AttributeController@index")->with('success', "یک ویژگی ویرایش شد");
        }
        return redirect()->action("Admin\AttributeController@index")->with('error', "ویژگی ویرایش نشد");
    }

    public function delete(int $id)
    {
        $user = $this->attrRepo->find($id);
        $res = $user->delete();
        if ($res) {
            return redirect()->action("Admin\AttributeController@index")->with('success', "یک ویژگی حذف شد");
        }
        return redirect()->action("Admin\AttributeController@index")->with('error', "ویژگی حذف نشد");
    }
}
