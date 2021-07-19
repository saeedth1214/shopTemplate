<?php
use Illuminate\Support\Facades\Route;

$frontNs="App\Http\Controllers\Frontend";
$adminNs="App\Http\Controllers\Admin";

Route::group(["namespace" => $frontNs], function () {


    // filter products
    Route::get("front/filterProducts/newest", "ProductController@filterByNewest");
    Route::get("front/filterProducts/popular", "ProductController@filterByPopular");
    Route::get("front/filterProducts/bestSeller", "ProductController@filterBybestSeller");

//    // home page
    // Route::get("/shopPage", "HomeController@index");
    Route::get("front/categories", "CategoryController@index");


    // product
    Route::get("front/productsBycategory/{cid}", "ProductController@getProductByCategory");
    Route::get("front/product/{pid}", "ProductController@getSingleProduct");
    Route::get("front/randomProduct", "ProductController@randomProduct");

//
//    // user register
    Route::post("front/user/Register", "AuthController@register");
    Route::post("front/user/login", "AuthController@login");
    Route::post("front/user/changePassword", "AuthController@changePassword")->middleware("Authorize:api");
    Route::get("front/user/Logout", "AuthController@logout")->middleware("Authorize:api");

//
    //review
    Route::get("front/comments/{pid}", "ReviewController@getProductComment");
    Route::get("front/userProfile/comments", "ReviewController@getUserProfileComment")->middleware("Authorize:api");
    Route::post("front/review/create", "ReviewController@create")->middleware("Authorize:api");
    Route::get("front/getReview/{reviewId}", "ReviewController@getReviews");

    //orders
    Route::get("front/getOrders", "OrderController@index")->middleware("Authorize:api");
    Route::post("front/create/orders", "OrderController@create")->middleware("Authorize:api");

    // email
    // Route::get("/front/verificationEmail/{token}", "UserController@verification");

    //attribute value
    Route::get("front/attribute_value/{pid}", "AttributeValueController@getAttrValueFront");
});
//
Route::group(["namespace"=>$adminNs,"middleware"=>["Authorize:api", 'isAdmin']], function () {
    // brand
    Route::get("brands/{catId}", "BrandController@getBrand");
    Route::get("category_brand", "BrandController@category_brand")->withoutMiddleware(["Authorize:api", 'isAdmin']);
    Route::post("brand/create", "BrandController@create");
    Route::post("brand/remove", "BrandController@remove");

    //reviews

    Route::get("admin/reviews", "ReviewController@index");
    Route::post("admin/review/create", "ReviewController@create");
    Route::put("admin/review/changeStatus/{id}", "ReviewController@changeStatus");
    Route::delete("admin/review/delete/{id}", "ReviewController@remove");

    // reply-message
    Route::post("admin/createReplyMessage", "ReviewController@createReplyMessage");

    // products
    Route::get("admin/products", "ProductController@index");
    Route::post("admin/product/create", "ProductController@create");
    Route::delete("admin/product/delete/{id}", "ProductController@remove");


    //users
    Route::post("admin/changeRole", "UserController@changeRole");
    Route::post("admin/users/create", "UserController@create");
    Route::delete("admin/user/delete/{id}", "UserController@remove");
    Route::get("admin/users", "UserController@index");

    //medias
    Route::post("admin/media/create", "MediaController@create");
    Route::post("admin/media/delete", "MediaController@delete");
    Route::put("admin/media/update", "MediaController@update");
    Route::get("admin/medias", "MediaController@index");

    // attributes

    Route::get("admin/attributes", "AttributeController@index");
    Route::post("admin/attribute/create", "AttributeController@create");
    Route::put("admin/attribute/update", "AttributeController@update");
    Route::delete("admin/attribute/delete/{attributeId}", "AttributeController@delete");

    // // products root

    Route::get("admin/products", "ProductController@index");
    Route::get("admin/product/{id}", "ProductController@singlePro");
    Route::post("admin/products/create", "ProductController@create");
    Route::delete("admin/product/delete/{id}", "ProductController@remove");
    Route::put("admin/product/update/{id}", "ProductController@update");

    // //user root

    Route::get("admin/users", "UserController@index");
    Route::put("admin/user/update", "UserController@update");
    Route::put("admin/user/changeRole", "UserController@changeRole");

    Route::post("admin/users/create", "UserController@create");
    Route::delete("admin/user/delete/{id}", "UserController@remove");

    // // options root

    Route::get("admin/options", "OptionController@index");
    Route::post("admin/option/create", "OptionController@create");
    Route::delete("admin/option/delete/{optionId}", "OptionController@delete");


    // // categories root

    Route::get("admin/categories", "CategoryController@index");
    Route::post("admin/category/create", "CategoryController@create");
    Route::put("admin/category/update", "CategoryController@update");
    Route::delete("admin/category/delete/{categoryId}", "CategoryController@delete");

    // // category attribute
    Route::get("admin/categoryAttribute/{id}", "categoryAttributeController@index");
    Route::get("admin/categoryAttr/{id}", "categoryAttributeController@cateAttr");
    Route::post("admin/categoryAttribute/create", "categoryAttributeController@create");

    // dashbord

    Route::get("admin/getDashboardDetail", "DashboardController@getDashboardInfo");
    Route::get("admin/newOrders", "DashboardController@newOrders");
    Route::get("admin/monthlySales", "DashboardController@monthlySales");
    // orders
    Route::get("admin/allOrders", "OrderController@getAllOrders");
    // attribute value
    Route::get("admin/attribute_value/{pid}", "AttributeValueController@getAttributeValue");
    Route::put("admin/attribute_value/update", "AttributeValueController@updateAttributeValue");
});
