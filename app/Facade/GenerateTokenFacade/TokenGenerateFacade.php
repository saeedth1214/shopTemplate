<?php
/**
 * Created by PhpStorm.
 * User: Saeedth1214
 * Date: 6/8/2021
 * Time: 14:27 PM
 */
namespace App\Facade\GenerateTokenFacade;

use Illuminate\Support\Facades\Facade;

class TokenGenerateFacade extends Facade
{
    protected static function getFacadeAccessor()
    {
        return "digi.generateToken";
    }

    public static function shouldProxyTo($class)
    {
        return app()->singleton(self::getFacadeAccessor(), $class);
    }
}
