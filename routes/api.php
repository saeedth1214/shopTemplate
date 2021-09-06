<?php
use Illuminate\Support\Facades\Route;

$frontNs="App\Http\Controllers\Frontend";
$adminNs="App\Http\Controllers\Admin";

Route::group(['prefix'=>'front',"namespace" => $frontNs], function () {


    // filter products
    Route::get("filterProducts/newest", "ProductController@filterByNewest");
    Route::get("filterProducts/popular", "ProductController@filterByPopular");
    Route::get("filterProducts/bestSeller", "ProductController@filterBybestSeller");

//    // home page
    // Route::get("/shopPage", "HomeController@index");
    Route::get("categories", "CategoryController@index");


    // product
    Route::get("productsBycategory/{cid}", "ProductController@getProductByCategory");
    Route::get("product/{pid}", "ProductController@getSingleProduct");
    Route::get("randomProduct", "ProductController@randomProduct");

//
//    // user register
    Route::post("user/register", "AuthController@register");
    Route::post("user/login", "AuthController@login");
    Route::post("user/forget-password", "ForgetPasswordController@sendForgetPasswordEmail");
    Route::post("user/reset-password", "ForgetPasswordController@resetPassword");
    Route::post("user/changePassword", "AuthController@changePassword");
    Route::post("user/changeProfileImage", "UserController@changeProfileImage")->middleware("auth:api");
    Route::get("user/logout", "AuthController@logout");


    // brand
    Route::get("category_brand", "BrandController@category_brand");

//
    //review
    Route::get("comments/{pid}", "ReviewController@getProductComment");
    Route::get("userProfile/comments", "ReviewController@getUserProfileComment")->middleware("auth:api");
    Route::post("review/create", "ReviewController@create")->middleware("auth:api");
    Route::get("getReview/{reviewId}", "ReviewController@getReviews");

    //orders
    Route::get("getOrders", "OrderController@index")->middleware("auth:api");
    Route::post("create/orders", "OrderController@create")->middleware("auth:api");

    // email
    // Route::get("/verificationEmail/{token}", "UserController@verification");

    //attribute value
    Route::get("attribute_value/{pid}", "AttributeValueController@getAttrValueFront");
});
//
Route::group(['prefix'=>'admin',"namespace"=>$adminNs,"middleware"=>['auth:api','isAdmin']], function () {
    // brand
    Route::get("brands/{catId}", "BrandController@getBrand");
    Route::get("category_brand", "BrandController@category_brand");
    Route::post("brand/create", "BrandController@create");
    Route::post("brand/remove", "BrandController@remove");

    //reviews

    Route::get("reviews", "ReviewController@index");
    Route::post("review/create", "ReviewController@create");
    Route::put("review/changeStatus/{id}", "ReviewController@changeStatus");
    Route::delete("review/delete/{id}", "ReviewController@remove");

    // reply-message
    Route::post("createReplyMessage", "ReviewController@createReplyMessage");

    // products


    Route::get("products", "ProductController@index");
    Route::post("product/create", "ProductController@create");
    Route::delete("product/delete/{id}", "ProductController@remove");


    //users
    Route::post("changeRole", "UserController@changeRole");
    Route::post("users/create", "UserController@create");
    Route::delete("user/delete/{id}", "UserController@remove");
    Route::get("users", "UserController@index");

    //medias
    Route::post("media/create", "MediaController@create");
    Route::post("media/delete", "MediaController@delete");
    Route::put("media/update", "MediaController@update");
    Route::get("medias", "MediaController@index");

    // attributes

    Route::get("attributes", "AttributeController@index");
    Route::post("attribute/create", "AttributeController@create");
    Route::put("attribute/update", "AttributeController@update");
    Route::delete("attribute/delete/{attributeId}", "AttributeController@delete");

    // // products root

    Route::get("products", "ProductController@index");
    Route::get("product/{id}", "ProductController@singlePro");
    Route::post("products/create", "ProductController@create");
    Route::delete("product/delete/{id}", "ProductController@remove");
    Route::put("product/update/{id}", "ProductController@update");

    // //user root

    Route::get("users", "UserController@index");
    Route::put("user/update", "UserController@update");
    Route::put("user/changeRole", "UserController@changeRole");

    Route::post("users/create", "UserController@create");
    Route::delete("user/delete/{id}", "UserController@remove");

    // // options root

    Route::get("options", "OptionController@index");
    Route::post("option/create", "OptionController@create");
    Route::delete("option/delete/{optionId}", "OptionController@delete");


    // // categories root

    Route::get("categories", "CategoryController@index");
    Route::post("category/create", "CategoryController@create");
    Route::put("category/update", "CategoryController@update");
    Route::delete("category/delete/{categoryId}", "CategoryController@delete");

    // // category attribute
    Route::get("categoryAttribute/{id}", "categoryAttributeController@index");
    Route::get("categoryAttr/{id}", "categoryAttributeController@cateAttr");
    Route::post("categoryAttribute/create", "categoryAttributeController@create");

    // dashbord

    Route::get("getDashboardDetail", "DashboardController@getDashboardInfo");
    Route::get("newOrders", "DashboardController@newOrders");
    Route::get("bestSeller", "DashboardController@bestSeller");
    Route::get("monthlySales", "DashboardController@monthlySales");
    // orders
    Route::get("allOrders", "OrderController@getAllOrders");
    // attribute value
    Route::get("attribute_value/{pid}", "AttributeValueController@getAttributeValue");
    Route::put("attribute_value/update", "AttributeValueController@updateAttributeValue");
});
