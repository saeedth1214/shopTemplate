<?php

namespace App\Http\Controllers\Frontend;

use Illuminate\Http\Client\Request;
use App\Responses\ResponsesFacade;
use App\Http\Controllers\Controller;

class VerifyController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        // $this->middleware('singed')->only('verify');
    }

    public function send(Request $request)
    {
        try {
            if ($request->hasVerifiedEmail()) {
                return ResponsesFacade::emailAlreadyVerified();
            }
            $request->user->sendEmailVerificationNotification();
            return ResponsesFacade::verifyEmailSendSuccessfuly();
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
    }
    public function verify(Request $request)
    {
        try {
            if ($request->user()->email !== $request->query('email') || !$request->hasValidSignature()) {
                return ResponsesFacade::notValidSignature();
            }

            $request->user()->markEmailAsVerified();
            return ResponsesFacade::hasValidSignature();
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
    }
}
