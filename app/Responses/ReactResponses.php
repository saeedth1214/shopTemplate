<?php
/**
 * Created by PhpStorm.
 * User: Saeedth1214
 * Date: 6/7/2021
 * Time: 18:26 PM
 */

namespace App\Responses;

use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class ReactResponses
{
    public function userLoggedOut()
    {
        return response()->json(['msg' => "شما از سایت خارج شدید"], Response::HTTP_OK);
    }
    public function passwordWasChanged()
    {
        return response()->json(['msg' => "رمز عبور شما تعویض شد"], Response::HTTP_OK);
    }
    public function forgetPasswordEmailSent()
    {
        return response()->json(['msg' => "ایمیل بازیابی رمزعبور  برای شما ارسال شد"], Response::HTTP_OK);
    }
    public function userLoggedIn($userData =null)
    {
        return response()->json(['msg' => "شمابا موفقیت در سایت وارد شدید" , 'userData'=>$userData], Response:: HTTP_OK);
    }
    public function emailOrPasswordNotValid()
    {
        return response()->json(['msg' => "ایمیل یا پسورد اشتباه واردشده است"], Response:: HTTP_UNAUTHORIZED);
    }

    public function registerUserIsOk()
    {
        return response()->json(['msg' => "ثبت نام کاربر با موفقیت انجام شد"], Response::HTTP_OK);
    }
    
    public function verifyEmailSendSuccessfuly($userData=null)
    {
        return response()->json(['msg'=>"یک ایمیل تایید برای شماارسال شد" ,'userData'=>$userData], Response::HTTP_OK);
    }
    public function tokenNotValid()
    {
        return response()->json(['msg' => "توکن ارسالی معتبر نیست"], Response::HTTP_FORBIDDEN);
    }
    public function tokenNotFound()
    {
        return response()->json(['msg' => "توکنی پیدا نشد"], Response::HTTP_NOT_FOUND);
    }
    public function emailNotFound()
    {
        return response()->json(['msg' => "چنین ایمیل وجودندارد"], Response::HTTP_NOT_FOUND);
    }
    public function userNotFound()
    {
        return response()->json(['msg' => "چنین کاربری وجودندارد"], Response::HTTP_NOT_FOUND);
    }
    public function tokenWasExpired()
    {
        return response()->json(['msg' => "توکن ارسالی منقضی شده است"], Response::HTTP_FORBIDDEN);
    }
    public function emailAlreadyCreated()
    {
        return response()->json(['msg' => "کاربری بااین ایمیل قیلا ثبت نام کرده است "], Response::HTTP_ALREADY_REPORTED);
    }
    public function emailAlreadyVerified()
    {
        return response()->json(['msg' => "ایمیل شما قبلا تایید شده است "], Response::HTTP_OK);
    }
    public function faild()
    {
        return response()->json(['msg' => "مشکلی سمت سرور به وجودآمده است "], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
    public function success($data=null, $status= Response::HTTP_OK)
    {
        return response()->json($data, $status);
    }
    public function ProductnotFount($data = null, $status = Response::HTTP_NOT_FOUND)
    {
        return response()->json($data, $status);
    }
    public function hasValidSignature()
    {
        return response()->json(['msg'=>'لینک ارسالی شما با موفقیت تایید شد وو شما میتوانید از تمامی امکانات سایت استفاده کنید'], Response::HTTP_OK);
    }
    public function notValidSignature()
    {
        return response()->json(['msg'=>'لینک ارسالی شما تایید نشد . لطفا دوباره تلاش کنید']);
    }
}
