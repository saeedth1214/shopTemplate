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
            return ResponsesFacade::success($dashInfo);
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
    }

    public function newOrders()
    {
        try {
            $this->orderRepo = Resolve(OrderRepository::class);
            $newOrders = $this->orderRepo->newOrdersData();
            return ResponsesFacade::success($newOrders);
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
    }

    public function monthlySales()
    {
        try {
            $this->orderRepo = Resolve(OrderRepository::class);
            $monthlySales = $this->orderRepo->monthlySales();
            return ResponsesFacade::success($monthlySales);
        } catch (\Throwable $th) {
            return response()->json($th->getFile());
            return ResponsesFacade::faild();
        }
    }
}
