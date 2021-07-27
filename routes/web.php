<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Frontend\VerifyController;

Route::View("/", "Front.home.index");
Route::View("/product/{pid}", "Front.home.index");
Route::View("/user/login", "Front.home.index")->name('login');
Route::View("/user/forget-password", "Front.home.index")->name('forgetPassword');
Route::View("/user/forget-password-form", "Front.home.index")->name('forgetPassword.form');
Route::View("/user/register", "Front.home.index")->name('register');
Route::View("/user/profile", "Front.home.index")->name('profile')->middleware('auth:api');
Route::View("/user/card", "Front.home.index")->name('card');

Route::group(['prefix'=>'admin','middleware'=>['auth:api','isAdmin']], function () {
    Route::view("/admin/home", "Admin.home.index");
    Route::view("/admin/users", "Admin.home.index");
    Route::View("/admin/category", "Admin.home.index");
    Route::View("/admin/product", "Admin.home.index");
    Route::View("/admin/media", "Admin.home.index");
    Route::View("/admin/reviews", "Admin.home.index");
});

Route::get('/email/verify', [ VerifyController::class, 'verify'])->name('authenticate.verify.email');
Route::get('/email-verification/send', [ VerifyController::class, 'send'])->name('authenticate.verify-email.send');

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
