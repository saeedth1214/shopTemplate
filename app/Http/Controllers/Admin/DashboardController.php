<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\dashbordRepository;
use App\Repositories\OrderRepository;
use App\Responses\ResponsesFacade;

class DashboardController extends Controller
{
    private $dashboardRepo;
    private $orderRepo;

    public function getDashboardInfo()
    {
        try {
            $this->dashboardRepo = Resolve(dashbordRepository::class);
            $dashInfo = $this->dashboardRepo->dashboardInfo();
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }   
        return ResponsesFacade::success($dashInfo);
    }

    public function newOrders()
    {
        $this->orderRepo = Resolve(OrderRepository::class);
        $newOrders = $this->orderRepo->newOrdersData();
        return ResponsesFacade::success($newOrders);
    }

    public function bestSeller()
    {
        $this->orderRepo = Resolve(OrderRepository::class);
        $bestSeller = $this->orderRepo->bestSeller();
        return ResponsesFacade::success($bestSeller);
    }
}
