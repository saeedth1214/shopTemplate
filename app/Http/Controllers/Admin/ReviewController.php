<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\ReviewRepositories;
use App\Repositories\ReplyRepositories;
use App\Models\reply;
use App\Responses\ResponsesFacade;

class ReviewController extends Controller
{
    private $revRepo = null;

    public function __construct()
    {
        $this->revRepo = resolve(ReviewRepositories::class);
    }

    public function index()
    {
        try {
            $reviews = $this->revRepo->getAllComments();
    
            return ResponsesFacade::success($reviews);
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
    }

    public function remove($id)
    {
        try {
            if (ctype_digit($id)) {
                $res = $this->revRepo->remove($id);
                if ($res) {
                    return ResponsesFacade::success(["msg" => "یک نظر با موفقیت حذف شد"], 202);
                }
            }
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
    }


    public function changeStatus($id)
    {
        try {
            $this->revRepo->changeState($id);
            return ResponsesFacade::success(["msg" => "تغییرات باموفقیت انجام شد"], 202);
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
    }


    public function createReplyMessage()
    {
        $data=[
            'message_id'=>request("reId"),
            'reply'=>request("reply"),
        ];
        try {
            $res = resolve(ReplyRepositories::class)->create($data);

            if ($res instanceof reply) {
                return ResponsesFacade::success(['msg'=>"ثبت پاسخ با موفقیت انجام شد"]);
            }
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
    }
}
