<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Repositories\UserRepositories;
use App\Responses\ResponsesFacade;
use App\Facade\LoginFacade\AuthFacade;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    //    use AuthenticatesUsers;
    private $userRepo = null;
  
    public function __construct()
    {
        $this->userRepo = resolve(UserRepositories::class);
        // authenticateServise::setHeader();
    }

    public function login()
    {
        // dd(request()->only());
        $email= request()->get('email');
        $password= request()->get('password');
     
        request()->has('rememberMe')? $rememberMe= request('rememberMe'): $rememberMe =false;
        return AuthFacade::login($email, $password, $rememberMe);
    }

    public function register(Request $request)
    {
        $data = request()->all();
        // return $data->only();
        
        try {
            if ($this->ValidateEmail(['email'=> $data['email']])) {
                return ResponsesFacade::emailAlreadyCreated();
            }
            $user = $this->createUser($data);
            Auth::login($user);
            $user->sendEmailVerificationNotification();

            return ResponsesFacade::verifyEmailSendSuccessfuly();
        } catch (\Throwable $th) {
            return [ $th->getLine(),$th->getFile(),$th->getMessage()];
            return ResponsesFacade::faild();
        }
    }

    private function ValidateEmail($email)
    {
        $validator=Validator::make($email, [
            'email'=> 'unique:users'
        ]);
        return $validator->fails();
    }
    // public function verifyToken()
    // {
    //     if (request()->has('token') && NotificationFacade::verifyEmail(request()->token)) {
    //         return $this->createUser();
    //     }
    //     return ResponsesFacade::tokenNotFound();
    // }


    private function createUser($data)
    {
        $user=$this->userRepo->create($data);
        $user=$user->getOrSend(function () {
            return ResponsesFacade::faild();
        });

        return $user;
        return ResponsesFacade::registerUserIsOk();
    }

    public function logout()
    {
        // return AuthFacade::logout();
    }


    public function changePassword()
    {
        try {
            $user = $this->userRepo->find(request()->userId);

            $res = $user->update(["password" => request()->password]);

            if ($res) {
                return ResponsesFacade::success();
            }
            return ResponsesFacade::faild();
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
    }
}
