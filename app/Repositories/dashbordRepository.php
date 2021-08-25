<?php

namespace App\Repositories;

use App\Models\dashbord;
use Illuminate\Support\Facades\DB;
use Imanghafoori\Helpers\Nullable;

class dashbordRepository extends BaseRepository
{
    protected $model = dashbord::class;

    public function dashboardInfo()
    {
        return $this->model::query()->first();
    }

    public function userCountIncrease()
    {
        DB::table('dashbord')->increment('user_count');
    }
    public function userCountDecrease()
    {
        DB::table('dashbord')->decrement('user_count');
    }
    public static function orderUpdate($count, $totalPrice)
    {
        $dashboard=dashbord::query()->first();
        $dashboard->update([
            'orders_count' =>  DB::raw("orders_count +$count"),
            'total_sales' => DB::raw("total_sales +$totalPrice"),
        ]);
    }

    public function productCountIncrease()
    {
        dashbord::query()->increment('products_count');
    }
    public function productCountdecrease()
    {
        dashbord::query()->decrement('products_count');
    }
}
