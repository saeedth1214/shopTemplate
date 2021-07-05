<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Frontend\AuthController;

Route::View("/", "Front.home.index");
Route::View("/product/{pid}", "Front.home.index");
Route::View("/user/login", "Front.home.index")->name('login');
Route::View("/user/register", "Front.home.index")->name('register');
Route::View("/user/profile", "Front.home.index")->name('profile');
Route::View("/user/card", "Front.home.index")->name('card');

Route::view("/admin/home", "Admin.home.index")->middleware(["Authorize:api",'isAdmin']);
Route::view("/admin/users", "Admin.home.index")->middleware(["Authorize:api",'isAdmin']);
Route::View("/admin/category", "Admin.home.index")->middleware(['Authorize:api', 'isAdmin']);
Route::View("/admin/product", "Admin.home.index")->middleware(['Authorize:api', 'isAdmin']);
Route::View("/admin/media", "Admin.home.index")->middleware(['Authorize:api', 'isAdmin']);
Route::View("/admin/reviews", "Admin.home.index")->middleware(['Authorize:api', 'isAdmin']);
// Route::get("/admin/home", [AuthController::class, 'admin'])->middleware(['Authorize:api','isAdmin']);

Route::get('/email/verify', [AuthController::class, 'verifyToken'])
    ->name('verification.verify');

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
