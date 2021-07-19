<?php
/**
 * Created by PhpStorm.
 * User: Saeedth1214
 * Date: 6/8/2021
 * Time: 14:27 PM
 */
namespace App\Facade\SaveTokenFacade;

class TokenStore
{
    public function saveToken($token, $tokenName)
    {
        cache()->set($tokenName, $token, 60);
    }
    public function getToken($tokenName)
    {
        return cache()->pull($tokenName);
    }
    public function hasToken($tokenName)
    {
        return cache()->has($tokenName);
    }
}
