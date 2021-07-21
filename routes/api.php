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
    Route::post("user/Register", "AuthController@register");
    Route::post("user/login", "AuthController@login");
    Route::post("user/changePassword", "AuthController@changePassword")->middleware("Authorize:api");
    Route::get("user/Logout", "AuthController@logout")->middleware("Authorize:api");

//
    //review
    Route::get("comments/{pid}", "ReviewController@getProductComment");
    Route::get("userProfile/comments", "ReviewController@getUserProfileComment")->middleware("Authorize:api");
    Route::post("review/create", "ReviewController@create")->middleware("Authorize:api");
    Route::get("getReview/{reviewId}", "ReviewController@getReviews");

    //orders
    Route::get("getOrders", "OrderController@index")->middleware("Authorize:api");
    Route::post("create/orders", "OrderController@create")->middleware("Authorize:api");

    // email
    // Route::get("/verificationEmail/{token}", "UserController@verification");

    //attribute value
    Route::get("attribute_value/{pid}", "AttributeValueController@getAttrValueFront");
});
//
Route::group(['prefix'=>'admin',"namespace"=>$adminNs,"middleware"=>["Authorize:api", 'isAdmin']], function () {
    // brand
    Route::get("brands/{catId}", "BrandController@getBrand");
    Route::get("category_brand", "BrandController@category_brand")->withoutMiddleware(["Authorize:api", 'isAdmin']);
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
<<<<<<< HEAD


    Route::get("products", "ProductController@index");
    Route::post("product/create", "ProductController@create");
    Route::delete("product/delete/{id}", "ProductController@remove");
=======
    Route::get("admin/products", "ProductController@index");
    Route::post("admin/product/create", "ProductController@create");
    Route::delete("admin/product/delete/{id}", "ProductController@remove");
>>>>>>> c1e7a2da58ca8882e19267b85c6b45f3b5280156


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

<<<<<<< HEAD
    Route::get("getDashboardDetail", "DashboardController@getDashboardInfo");
    Route::get("newOrders", "DashboardController@newOrders");
    Route::get("bestSeller", "DashboardController@bestSeller");
=======
    Route::get("admin/getDashboardDetail", "DashboardController@getDashboardInfo");
    Route::get("admin/newOrders", "DashboardController@newOrders");
    Route::get("admin/monthlySales", "DashboardController@monthlySales");
>>>>>>> c1e7a2da58ca8882e19267b85c6b45f3b5280156
    // orders
    Route::get("allOrders", "OrderController@getAllOrders");
    // attribute value
    Route::get("attribute_value/{pid}", "AttributeValueController@getAttributeValue");
    Route::put("attribute_value/update", "AttributeValueController@updateAttributeValue");
});
