<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Services\setTokenLifeTime;
use Laravel\Passport\Passport;
use Carbon\Carbon;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    public function boot()
    {
        $this->registerPolicies();

        Passport::personalAccessTokensExpireIn(Carbon::now()->addDay());

        // setTokenLifeTime::install();
        // Passport::personalAccessTokensExpireIn(Carbon::now()->addSeconds(20));
        // if (!$this->app->routesAreCached()) {
        //     Passport::routes();
        // }
    }
}
