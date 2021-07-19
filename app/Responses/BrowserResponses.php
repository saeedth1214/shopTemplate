<?php

namespace App\Responses;

class BrowserResponses
{
    public function registerUserIsOk()
    {
        return redirect()->to("/")->with("succes", "ثبت نام کاربر با موفقیت انجام شد");
    }
    public function verifyEmailSendSuccessfuly()
    {
        return redirect()->to("/verify/email", 200)->with("succes", "یک ایمیل تایید برای شما ارسال شد");
    }
    public function tokenNotValid()
    {
        return redirect()->to("/register", 403)->with("error", "توکن ارسالی معتبر نیست");
    }
    public function tokenNotFound()
    {
        return redirect()->to("/register", 403)->with("error", "توکن پیدا نشد");
    }
    public function tokenWasExpired()
    {
        return redirect()->to("/register", 403)->with("error", "توکن ارسالی منقضی شده است");
    }
    public function emailAlreadyCreated()
    {
        return redirect()->to("/register", 409)->with("error", "کاربری بااین ایمیل قیلا ثبت نام کرده است ");
    }
    
    public function faild()
    {
        return redirect()->to("/", 500)->with("error", "مشکلی سمت سرور به وجودآمده است");
    }
    public function success()
    {
        return redirect()->to("/home", 200)->with("success", "عملیات با موفقیت انجام شد");
    }
}
