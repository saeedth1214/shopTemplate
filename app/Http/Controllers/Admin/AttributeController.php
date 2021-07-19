<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AttributeRequest;
use App\Models\attribute;
use App\Repositories\AttributeRepositories;

class AttributeController extends Controller
{
    private $attrRepo = null;

    public function __construct()
    {
        $this->attrRepo = resolve(AttributeRepositories::class);
    }

    public function index()
    {
        $attributes = $this->attrRepo->total();
        return response($attributes, 200);
    }

    public function addPage()
    {
        return view("admin.attribute.add");
    }

    public function create()
    {
        $data = [
            'slug' => request('slug'),
            'title' => request('title'),
            'type' => request('type'),
        ];
        
        $attr = $this->attrRepo->create($data);

        if ($attr instanceof attribute) {
            return response(['msg'=>"یک مورد با موفقیت ساخته شد",'data'=>$attr], 201);
            // return redirect()->route("admin.option.index",["options"=>$users])->with('success',"یک آپشن جدید به سیستم اظافه شد");
            return redirect()->action("Admin\AttributeController@index")->with('success', "یک ویژگی جدید به سیستم اضافه شد");
        }
        return redirect()->action("Admin\AttributeController@index")->with('error', " ویژگی جدید به سیستم اضافه نشد");
    }

    public function update()
    {

        $data = [
            'slug' => request('slug'),
            'title' => request('title'),
            'type' => request('type'),
        ];

        $attr = $this->attrRepo->find(request("id"));
        $attr = $attr->update($data);
        if ($attr) {
            return response(["msg"=>"یک مورد با موفقیت ویرایش شد"],204);
        }
        return response(["msg" => "مشکلی سمت سرور به وجود آمد"], 500);

    }

    public function delete(int $id)
    {
        $attr = $this->attrRepo->find($id);
        $res = $attr->delete();
        if ($res) {
            return response(['msg' => "تغییرات با موفقیت ثبت شد", 'data' => $attr], 202);

            return redirect()->action("Admin\AttributeController@index")->with('success', "یک ویژگی حذف شد");
        }
        return redirect()->action("Admin\AttributeController@index")->with('error', "ویژگی حذف نشد");
    }

    public function repo()
    {
//        dd('ok');
        return request()->input("input_data");
    }
}
