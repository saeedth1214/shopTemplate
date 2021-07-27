<?php

namespace App\Http\Controllers\Frontend;

use Illuminate\Http\Request;
use App\Responses\ResponsesFacade;
use Illuminate\Support\Facades\Password;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class ForgetPasswordController extends Controller
{
    public function __construct()
    {
        $this->middleware('guest:api');
    }

    public function sendForgetPasswordEmail(Request $request)
    {

        // return response()->json(['data'=> request()->get('email')]);
        try {
            $res = Password::broker()->sendResetLink($request->only('email'));
            if ($res == Password::RESET_LINK_SENT) {
                return ResponsesFacade::forgetPasswordEmailSent();
            } elseif ($res == Password::INVALID_USER) {
                return ResponsesFacade::emailNotFound();
            }
        } catch (\Throwable $th) {
            return $th->getMessage();
            return ResponsesFacade::faild();
        }
    }

    public function resetPassword(Request $request)
    {
        try {
            $res = Password::broker()->reset(
                $request->only('email', 'password', 'token'),
                function ($user, $password) {
                    $this->reset($user, $password);
                }
            );
            if ($res == Password::INVALID_USER) {
                return ResponsesFacade::emailNotFound();
            } elseif ($res == Password::INVALID_TOKEN) {
                return ResponsesFacade::tokenNotFound();
            }
            return ResponsesFacade::passwordWasChanged();
        } catch (\Throwable $th) {
            return $th->getMessage();
            return ResponsesFacade::faild();
        }
    }

    protected function reset($user, $password)
    {
        $user->password = Hash::make($password);
        $user->save();
    }
}
