<?php
namespace App\Facade\LoginFacade;


use App\Services\authenticateServise;

class UserAuthenticate
{
    public function login( $email, $password,$rememberMe=false)
    {
        return authenticateServise::login($email, $password, $rememberMe);
    }
    public function logout()
    {
        return authenticateServise::logout();
    }
}
