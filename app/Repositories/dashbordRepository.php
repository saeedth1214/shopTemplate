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

    public function userCountUpdate()
    {
        DB::table('dashbord')->increment('user_count');
    }

    public static function orderUpdate($count, $totalPrice)
    {
        $res=dashbord::query()->updateOrCreate([
            'orders_count' =>  DB::raw("orders_count +$count"),
            'total_sales' => DB::raw("total_sales +$totalPrice"),
        ]);
    }

    public function productCountUpdate()
    {
        DB::table('dashbord')->increment('products_count');
    }
}
