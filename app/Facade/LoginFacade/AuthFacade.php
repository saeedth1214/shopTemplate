<?php

namespace App\Facade\LoginFacade;

use Illuminate\Support\Facades\Facade;

class AuthFacade extends Facade
{
    protected static function getFacadeAccessor()
    {
        return "digi.auth";
    }

    public static function shouldProxyTo($class)
    {
        return app()->singleton(self::getFacadeAccessor(), $class);
    }
}
