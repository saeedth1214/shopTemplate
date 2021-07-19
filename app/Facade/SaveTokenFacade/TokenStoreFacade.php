<?php
/**
 * Created by PhpStorm.
 * User: Saeedth1214
 * Date: 6/8/2021
 * Time: 14:27 PM
 */
namespace App\Facade\SaveTokenFacade;

use Illuminate\Support\Facades\Facade;

class TokenStoreFacade extends Facade
{
    protected static function getFacadeAccessor()
    {
        return "digi.saveToken";
    }

    public static function shouldProxyTo($class)
    {
        return app()->singleton(self::getFacadeAccessor(), $class);
    }
}
