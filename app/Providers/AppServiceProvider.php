<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Facade\EmailFacade\NotificationFacade;
use App\Services\Notification\EmailProvider;
use App\Services\Notification\SmsProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // if (config('notification.notification') == "email") {
        //     NotificationFacade::shouldProxyTo(EmailProvider::class);
        // } elseif (config('notification.notification') == "sms") {
        //     NotificationFacade::shouldProxyTo(SmsProvider::class);
        // }
    }
}
