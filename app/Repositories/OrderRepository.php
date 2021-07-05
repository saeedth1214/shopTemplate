<?php
namespace App\Repositories;

use App\Models\Order;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class OrderRepository extends BaseRepository
{
    protected $model = Order::class;
    public function newOrder()
    {
        return $this->model::query()->whereDate('created_at', Carbon::now());
    }

    public function getTotalOrders($uid)
    {
        return $this->model::query()->join('products', 'products.id', "orders.product_id")
        ->join("users", "users.id", "orders.user_id")
        ->where("orders.user_id",$uid)
        ->select("orders.id as oid", "users.fullname", "products.title as title", "orders.total_items as count", "orders.total_amount as amount", "orders.status as status", "orders.created_at as date")
        ->get();
    }
    public function OrderGroupBy()
    {
        return DB::table('orders')
            ->select(DB::raw('YEAR(created_at) as date'), DB::raw('SUM(total_items) as total_sales'))
            ->groupBy("date")
            ->get()
            ->toArray();
//        dd($orders);
//        dd ($this->model::select(DB::raw("sum('total_items')"))->get()->ToArray());
//        dd($this->model::select(DB::raw("count('id') as number , YEAR('created_at') as date"))->groupBy(DB::raw("YEAR('created_at')"))->toSql());
    }

    public function bestSeller()
    {
        try {
            $res = DB::table('orders')
                ->join('products', 'orders.product_id', '=', 'products.id')
                ->select('product_id as Pid', DB::raw('sum(total_items) as number'), 'products.title as title', 'products.price as price', 'products.description as description')
                ->groupBy(['pid', 'price', 'title'])
                ->orderBy('number', 'desc')
                ->take(5)
                ->get();
        } catch (\Throwable $th) {
            return null;
        }
        return $res;
    }

    public function newOrdersData()
    {
        try {
            $res = $this->model::join('users', "users.id", "orders.user_id")
                ->join("products", "products.id", "orders.product_id")
                ->select('orders.id as id', 'users.fullname', "products.title", "orders.total_items", "orders.total_amount", "orders.status", "orders.created_at as date")
                ->orderby("date", "desc")->limit(5)->get();
        } catch (\Throwable $th) {
            return null;
        }
        return $res;
    }


    public function createOrders($orders)
    {
        foreach ($orders as $key => $value) {
            $res=$this->model::query()->create($value);
        }
        return $res;
    }
}
