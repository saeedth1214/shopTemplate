<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Models\User;
use App\Repositories\userRepositories;
use App\Responses\ResponsesFacade;
use Illuminate\Support\Facades\DB;
use App\Repositories\dashbordRepository;

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
            DB::beginTransaction();
            $user_data = [
                'fullname' => request()->userName,
                'email' => request()->email,
                'password' => request()->password,
                'role' => request()->has("role") ? request()->role : "user",
                "avatar" => request()->avatar ?? ""
            ];
            
            $user = $this->userRepo->create($user_data);

            $user = $user->getOrSend(function () {
                return ResponsesFacade::faild();
            });

            // return ResponsesFacade::success(["msg" => "یک کاربر با موفقیت ثبت کردید", 'data' => $user], 201);
            
            if ($user instanceof User) {
                app()->make(dashbordRepository::class)->userCountIncrease();
                DB::commit();
                return ResponsesFacade::success(["msg" => "یک کاربر با موفقیت ثبت کردید", 'data' => $user], 201);
            }
            DB::rollBack();
            // return ResponsesFacade::faild();
        } catch (\Throwable $th) {
            return response()->json(['msg'=>$th->getMessage()]);
            DB::rollBack();
            return ResponsesFacade::faild();
        }
    }


    public function update()
    {
        try {
            $data = [
                'fullname' => request()->userName,
                'password' => request()->password,
                'role' => request()->role,
                "avatar" => request()->avatar ?? ""

            ];
            $user = $this->userRepo->find(request()->id);
            $user = $user->update($data);
            if ($user) {
                return response(null, 204);
            }
            return ResponsesFacade::success(null, 204);
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
    }

    public function remove(int $id)
    {
        try {
            DB::beginTransaction();
            $user = $this->userRepo->find($id);
            $res = $user->delete();
            if ($res) {
                app()->make(dashbordRepository::class)->userCountDecrease();
                DB::commit();
                return ResponsesFacade::success(["msg" => "یک کاربر با موفقیت حذف شد"], 202);
            }
            DB::rollBack();
            return ResponsesFacade::faild();
        } catch (\Throwable $th) {
            DB::rollBack();
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
