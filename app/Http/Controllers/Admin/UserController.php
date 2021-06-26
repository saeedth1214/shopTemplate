<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Models\User;
use App\Repositories\userRepositories;
use App\Responses\ResponsesFacade;

class UserController extends Controller
{
    private $userRepo = null;

    public function __construct()
    {
        $this->userRepo = resolve(UserRepositories::class);
    }

    public function index()
    {
        try {
            $users = $this->userRepo->total();
            return ResponsesFacade::success($users);

            // return response($users, 200);
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
    }
    public function create()
    {
        try {
            $email = $this->userRepo->searchMail(request()->email);
            if ($email) {
                return ResponsesFacade::emailAlreadyCreated();
            }
            $user_data = [
                'fullname' => request()->userName,
                'email' => request()->email,
                'password' => request()->password,
                'role' => request()->has("role") ? request()->role : "user",
                "avatar" => request()->avatar ?? ""
            ];
            $user = $this->userRepo->create($user_data);

            if ($user instanceof User) {
                return ResponsesFacade::success(["msg" => "یک کاربر با موفقیت ثبت کردید", 'data' => $user], 201);
            }
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();           
        }

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
            return response(null, 204);
        }
        return response(["msg"=>"مشکلی سمت سرور به وجود آمده است"], 500);
    }

    public function remove(int $id)
    {

        try {
            $user = $this->userRepo->find($id);
            $res = $user->delete();
            if ($res) {
                return ResponsesFacade::success(["msg" => "یک کاربر با موفقیت حذف شد"], 202);
            }
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();                        
        }

        
    }

    public function changeRole()
    {
        try {
            $res = $this->userRepo->changeRole(request()->role, request()->id);

            if ($res) {
                return ResponsesFacade::success(null, 204);
            }

        } catch (\Throwable $th) {
            return ResponsesFacade::faild();                        
        }

      
    }
}
