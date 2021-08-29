<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\UserRepositories;
use App\Responses\ResponsesFacade;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    private $userRepo;

    public function __construct(UserRepositories $userRepo)
    {
        $this->userRepo=$userRepo;
    }

    public function changeProfileImage(Request $request)
    {
        // return auth('api')->user();
        try {
            $res = $this->userRepo->updateProfile($request->fileName, auth('api')->user()['id']);
            $res = $res->getOrSend(function () {
                return ResponsesFacade::faild();
            });
            if ($res) {
                $image = $request->profileResult;
                $pattern = "/data:image\/[a-zA-z0-9]{3,6};base64,/";
                $result = preg_replace($pattern, '', $image);
                Storage::put('avatar/'.$request->fileName, base64_decode(($result)));
                return ResponsesFacade::success(["msg" => "تصویر با موفقیت ویرابش شد"], 200);
            }
            return ResponsesFacade::faild();
        } catch (\Throwable $th) {
            return response()->json(['msg'=>$th->getMessage()]);
            return ResponsesFacade::faild();
        }
    }
}
