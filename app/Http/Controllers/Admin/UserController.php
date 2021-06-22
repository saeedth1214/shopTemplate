<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Models\User;
use App\Repositories\userRepositories;

class UserController extends Controller
{
    private $userRepo = null;

    public function __construct()
    {
        $this->userRepo = resolve(UserRepositories::class);
    }

    public function index()
    {
        $users =$this->userRepo->total();
        return response($users, 200);
    }
    public function create()
    {
        // return response(request()->all());
        $email= $this->userRepo->searchMail(request()->email);
        if ($email) {
            return response(['msg' => "این ایمیل قبلا استفاده شده است"], 202);
        }
        $user_data = [
            'fullname' => request()->userName,
            'email' =>request()->email,
            'password' => request()->password,
            'role' => request()->has("role")?request()->role:"user",
            "avatar"=> request()->avatar ?? ""
        ];

        $user=$this->userRepo->create($user_data);
        // return response($user,201);
        if ($user instanceof User) {
            return response(["msg" => "یک کاربر با موفقیت ثبت کردید",'data'=>$user], 201);
        }
        return response(["msg" => "مشکلی از سمت سرور به وجود امده است"], 500);
    }


    public function update()
    {
        $data = [
            'fullname' =>request()->userName,
            'password' =>request()->password,
            'role' =>request()->role,
            "avatar" =>request()->avatar ?? ""

        ];
        $user = $this->userRepo->find(request()->id);
        $user = $user->update($data);
        if ($user) {

        return response(null,204);
        }
        return response(["msg"=>"مشکلی سمت سرور به وجود آمده است"], 500);

    }

    public function remove(int $id)
    {
        $user = $this->userRepo->find($id);
        $res = $user->delete();
        if ($res) {
            return response(["msg"=>"یک مورد با موفقیت حذف شد"], 201);
        }
        return response(["msg" => "مشکلی سمت سرور به وجود آمد"], 500);
    }

    public function changeRole()
    {
        // return response(request('role'));
        $res=$this->userRepo->changeRole(request()->role, request()->id);
        
        if ($res) {
            return response(null, 204);
        }
        return response(["msg" => "مشکلی سمت سرور به وجود امده است"], 500);
    }
}
