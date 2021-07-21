<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Repositories\OrderRepository;
use App\Repositories\dashbordRepository;
use Illuminate\Support\Facades\DB;
use App\Responses\ResponsesFacade;
use App\Repositories\ProductRepositories;

class OrderController extends Controller
{
    private $orderRepo = null;



    public function __construct()
    {
        $this->orderRepo = resolve(OrderRepository::class);
    }
    public function index()
    {
        try {
            $orders = $this->orderRepo->getTotalOrders(auth()->id());
            return ResponsesFacade::success($orders);
        } catch (\Throwable $th) {
            // return response($th->getMessage());
            return ResponsesFacade::faild();
        }
    }
    public function create()
    {
        $orders=[];
        $totalPrice=0;
        $proQuantity=[];

        try {
            foreach (request()->all() as $key =>$item) {
                // return response($item);
                $orders[] = [
                    "user_id" => auth()->id(),
                    "product_id" => $item['proId'],
                    "total_items" => $item['quantity'],
                    "total_amount" => $item["totalPrice"],
                    "status" => $item["status"]
                ];
                $totalPrice+=$item['totalPrice'];
                $proQuantity[$item['proId']]= $item['quantity'];
            }

            // return $proQuantity;
            DB::beginTransaction();
            $res=$this->orderRepo->createOrders($orders);
            if ($res instanceof Order) {
                dashbordRepository::orderUpdate(sizeof($orders), $totalPrice);
                ProductRepositories::decreaseProductQuantity($proQuantity);
                DB::commit();
                return ResponsesFacade::success(['msg' => "یک سفارش جدید ثبت شد", 'data' => 1], 201);
            }
            DB::rollBack();
            return ResponsesFacade::faild();
        } catch (\Throwable $e) {
            DB::rollBack();
            return $e->getMessage();
            return ResponsesFacade::faild();
        }
    }
}
