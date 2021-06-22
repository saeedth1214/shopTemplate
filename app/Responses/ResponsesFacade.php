<?php
/**
 * Created by PhpStorm.
 * User: Saeedth1214
 * Date: 6/7/2021
 * Time: 18:24 PM
 */

namespace App\Responses;

use Illuminate\Support\Facades\Facade;

class ResponsesFacade extends Facade
{
    protected static function getFacadeAccessor()
    {
        return [
            'react'=> ReactResponses::class,
            'web'=> browserResponses::class
        ][request()->has('client')?request('client'):'react'];
    }
}
