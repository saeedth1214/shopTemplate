<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Frontend\VerifyController;
use Illuminate\Support\Facades\Artisan;

Route::View("/", "Front.home.index");
Route::View("/product/{pid}", "Front.home.index");
Route::View("/user/login", "Front.home.index")->name('login');
Route::View("/user/forget-password", "Front.home.index")->name('forgetPassword');
Route::View("/user/forget-password-form", "Front.home.index")->name('forgetPassword.form');
Route::View("/user/register", "Front.home.index")->name('register');
Route::View("/user/profile", "Front.home.index")->name('profile')->middleware('auth:api');
Route::View("/user/card", "Front.home.index")->name('card');

Route::group(['prefix'=>'admin','middleware'=>['auth:api','isAdmin']], function () {
    Route::view("/home", "Admin.home.index");
    Route::view("/users", "Admin.home.index");
    Route::View("/category", "Admin.home.index");
    Route::View("/product", "Admin.home.index");
    Route::View("/media", "Admin.home.index");
    Route::View("/reviews", "Admin.home.index");
});

Route::get('/email/verify', [ VerifyController::class, 'verify'])->name('authenticate.verify.email');
Route::get('/email-verification/send', [ VerifyController::class, 'send'])->name('authenticate.verify-email.send');


Route::get('/link',function(){
Artisan::command("storage:link");
});
//
//Route::group(["prefix"=>"admin","namespace"=>"Admin"], function () {
//    Route::get("/{path?}", [
//        "uses"=> "HomeController@index",
//        "where"=>['path'=>".*"]
//    ])->middleware("admin");
//});
//

// front end route

//Route::group(["namespace" => "Frontend"], function () {
//    Route::View("/", "Front.home.index");
//});
