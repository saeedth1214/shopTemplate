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
        try {
            $category = request('category');
            $attrs = request("attrs");
            $res = $this->cateRepo->setAttributes($category, $attrs);
            if ($res) {
                return ResponsesFacade::success(["msg" => "یک مورد با موفقیت ساخته شد", "data" => $res], 201);
            }
            return ResponsesFacade::faild();
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
    }

    public function cateAttr()
    {
        try {
            $id = request("id");
            $data = $this->cateRepo->allAttributes($id);
            return ResponsesFacade::success($data);
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
    }
  

    public function update(AttributeRequest $request, int $id)
    {
        try {
            $request->validated($request->except(['_token']));
            $data = [
                'slug' => request('slug'),
                'title' => request('title'),
                'type' => request('type'),
            ];

            $attr = $this->attrRepo->find($id);
            $attr = $attr->update($data);
            if ($attr) {
                return ResponsesFacade::success(['msg' => 'یک ویژگی ویرایش شد']);
            }
            return ResponsesFacade::faild();
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
    }

    public function delete(int $id)
    {
        try {
            $user = $this->attrRepo->find($id);
            $res = $user->delete();
            if ($res) {
                return ResponsesFacade::success(['msg' => 'یک ویژگی حذف شد']);
            }
            return ResponsesFacade::faild();
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
    }
}
