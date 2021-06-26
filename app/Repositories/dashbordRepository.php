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
    
        $res=dashbord::query()->update([
            'orders_count' =>  DB::raw("orders_count +$count"),
            'total_sales' => DB::raw("total_sales +$totalPrice"),
        ]);
    }

    public function productCountUpdate()
    {
       dashbord::query()->increment('products_count');
    }
}
