<?php

namespace App\Services\Notification;

class Notification
{
    public function __call($method, $args)
    {

        $providerClass=__NAMESPACE__."\\".substr($method,4)."Provider";
        // dd($providerClass, $method, $args);
        $provider=new $providerClass(...$args);
        $provider->send();
    }

}
