<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Repositories\UserRepositories;
use Illuminate\Support\Facades\Auth;
use App\Facade\EmailFacade\NotificationFacade;
use App\Responses\ResponsesFacade;
use Carbon\Carbon;
use App\Facade\LoginFacade\AuthFacade;
use App\Services\authenticateServise;

class AuthController extends Controller
{
    //    use AuthenticatesUsers;
    private $userRepo = null;
  
    private const TEST_MAIL= "fbcf65a1c7-ba201c@inbox.mailtrap.io";

    public function __construct()
    {
        $this->userRepo = resolve(UserRepositories::class);
        // authenticateServise::setHeader();
    }

    public function login()
    {
        // dd(request()->only(['email','password']));
        $email= request()->get('email');
        $password= request()->get('password');
     
        request()->has('rememberMe')? $rememberMe= request('rememberMe'): $rememberMe =false;
        return AuthFacade::login($email, $password, $rememberMe);
    }

    public function register()
    {
        $data = [
            'fullname' => "saeed",
            'email' => self::TEST_MAIL,
            'password' => "123456",
            'role' => "user",
        ];
     
        cache()->set('data', $data);

        return NotificationFacade::send(request()->userName, self::TEST_MAIL);
    }

    public function verifyToken()
    {
        if (request()->has('token') && NotificationFacade::verifyEmail(request()->token)) {
            return $this->createUser();
        }
        return ResponsesFacade::tokenNotFound();
    }


    private function createUser()
    {
        $data = cache()->pull('data');

        $user=$this->userRepo->create($data+['email_verified_at'=>Carbon::now()]);
        $user=$user->getOrSend(function () {
            return ResponsesFacade::faild();
        });

        return ResponsesFacade::registerUserIsOk();
    }

    public function logout()
    {
        return AuthFacade::logout();
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
