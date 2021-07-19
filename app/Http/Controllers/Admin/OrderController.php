<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\brandRepositories;
use App\Repositories\OrderRepository;

class OrderController extends Controller
{
    private $orderRepo=null;

    public function __construct()
    {
        $this->orderRepo=resolve(OrderRepository::class);
    }

    public function getAllOrders()
    {
        $orders=$this->orderRepo->getTotalOrders();
        return response($orders);
    }
}
