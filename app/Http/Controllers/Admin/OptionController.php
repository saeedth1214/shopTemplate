<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\OptionRepositories;
use Illuminate\Http\Request;
use App\Models\option;

class OptionController extends Controller
{
    private $optionRepo = null;

    public function __construct()
    {
        $this->optionRepo = resolve(OptionRepositories::class);
    }

    public function index()
    {
        $options = $this->optionRepo->total();

        return response($options, 200);


        // return view("admin.options.option", compact('options'));
    }

    // public function addPage()
    // {
    //     return view("admin.options.add");
    // }

    public function create()
    {
        // return response($request);
        $cat=[
            "ui"=>"ظاهری",
            "general"=>"عمومی",
            "parameter"=>"پارامتری"
        ];
        $data = [
            "option_slug"=>request("option_slug"),
            "option_title"=>request("option_title"),
            "option_value"=>request("option_value"),
            "option_cat"=>request("option_cat"),
           
        ];
        $option = $this->optionRepo->create($data);
        // $options=$this->optionRepo->total();
        if ($option instanceof option) {
            return response(["msg"=>"تنظیمات جدید اضافه شد","data"=> $option], 201);
            // return redirect()->route("admin.option.index",["options"=>$options])->with('success',"یک آپشن جدید به سیستم اظافه شد");
            return redirect()->action("Admin\OptionController@index")->with('success', "یک آپشن جدید به سیستم اضافه شد");
        }
        return response(["msg" => "مشکلی سمت سرور رخ داد"], 500);
    }

    public function edit(int $id)
    {
        $option = $this->optionRepo->find($id);
        return view('admin.options.add', ['option' => $option,'edit'=>1]);
    }

    public function update(Request $request, int $id)
    {
//        dd($request);
        $data = [
            'option_slug' => $request->input('option_slug'),
            'option_title' => $request->input('option_title'),
            'option_value' => $request->input('option_value'),
            'option_cat' => $request->input('option_cat'),
        ];
        $option = $this->optionRepo->find($id);
        $option = $option->update($data);
        if ($option) {
            return redirect()->action("Admin\OptionController@index")->with('success', "یک آپشن ویرایش شد");
        }
        return redirect()->action("Admin\OptionController@index")->with('error', "آپشن ویرایش نشد");
    }
    public function delete(int $optionId)
    {
        $option = $this->optionRepo->find($optionId);
        $res = $option->delete();
        // return response(['msg' => "یک مورد حذف شد"], 204);

        if ($res) {
            return response(['msg' => "یک مورد حذف شد"], 202);

            return redirect()->action("Admin\OptionController@index")->with('success', "یک آپشن حذف شد");
        }
        return redirect()->action("Admin\OptionController@index")->with('error', "آپشن حذف نشد");
    }
}
