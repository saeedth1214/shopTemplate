<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Facade\SaveTokenFacade\TokenStoreFacade;
use App\Facade\SaveTokenFacade\TokenStore;

use App\Facade\EmailFacade\NotificationFacade as AppNotificationFacade;
use App\Facade\GenerateTokenFacade\TokenGenerator;
use App\Facade\GenerateTokenFacade\TokenGenerateFacade;
use App\Facade\EmailFacade\FakeEmailNotification as AppFakeEmailNotification;
use App\Facade\EmailFacade\emailNotification as AppEmailNotification;
use App\Facade\LoginFacade\AuthFacade;
use App\Facade\LoginFacade\UserAuthenticate;

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
        if (app()->runningUnitTests()) {
            $emailNoti=AppFakeEmailNotification::class;
        } else {
            $emailNoti=AppEmailNotification::class;
            $tokenGenerate=TokenGenerator::class;
            $tokenStore=TokenStore::class;
            $userAuth=UserAuthenticate::class;
        }
        AppNotificationFacade::shouldProxyTo($emailNoti);
        TokenStoreFacade::shouldProxyTo($tokenStore);
        TokenGenerateFacade::shouldProxyTo($tokenGenerate);
        AuthFacade::shouldProxyTo($userAuth);
    }
}
