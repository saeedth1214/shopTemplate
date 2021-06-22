<?php

namespace App\Services;

use App\Repositories\UserRepositories;
use App\Facade\GenerateTokenFacade\TokenGenerateFacade;
use App\Facade\SaveTokenFacade\TokenStoreFacade;
use App\Mail\RegisterVerificationMail;
use Illuminate\Support\Facades\Mail;
use App\Responses\ResponsesFacade;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;

class authenticateServise
{
    private const TOKEN_NAME="register_token";
    private const EXPIRES_TIME=86400;

    private static function userExists($email)
    {
        $userRepo=resolve(UserRepositories::class);
        return $userRepo->searchMail($email);
    }

    public static function sendmail($username="", $email)
    {
        if (self::userExists($email)) {
            return ResponsesFacade::emailAlreadyCreated();
        }
        $token=self::generateToken();
        self::saveToken($token);
        Mail::send(new RegisterVerificationMail($username, $email, $token, self::EXPIRES_TIME));
        return ResponsesFacade::verifyEmailSendSuccessfuly();
    }

    private static function generateToken()
    {
        return TokenGenerateFacade::createToken();
    }
    private static function saveToken($token)
    {
        TokenStoreFacade::saveToken($token, self::TOKEN_NAME);
    }

    public static function verify($token)
    {
        if (!TokenStoreFacade::hasToken(self::TOKEN_NAME)) {
            return ResponsesFacade::tokenWasExpired();
        }
        if (!TokenStoreFacade::getToken(self::TOKEN_NAME) === $token) {
            return ResponsesFacade::tokenNotValid();
        }
        return true;
    }

    public static function login($email, $password, $rememberMe)
    {
        try {
            $res =  Auth::attempt(['email' => $email, 'password' => $password]);
            if (!$res) {
                return ResponsesFacade::emailOrPasswordNotValid();
            }
            $user = Auth::user();
            $tokenModel = $user->createToken('token-for-user-' . $user->id);

            cache()->set('accessToken', $tokenModel->accessToken, self::EXPIRES_TIME);

            $userData = [
                'user' => $user,
                'accessToken' => $tokenModel->accessToken
            ];
            return ResponsesFacade::userLoggedIn($userData);
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
    }

    public static function logout()
    {
        try {
            // dd(auth()->guard('api')->user());
            auth()->user()->token()->revoke();
            Cache::forget('accessToken');
            // auth()->logout();
        } catch (\Throwable $th) {
            dd($th->getMessage());
            return ResponsesFacade::faild();
        }
        return ResponsesFacade::userLoggedOut();
    }
}
