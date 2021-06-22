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
        $reviews= $this->revRepo->getAllComments();
        return response($reviews);
    }
    public function remove($id)
    {
        if (ctype_digit($id)) {
            $res = $this->revRepo->remove($id);
            if ($res) {
                return response(["msg"=>"یک نظر با موفقیت حذف شد"], 201);
            }
        }
    }



    public function showAll()
    {
        $comments = $this->revRepo->getAllComments()->paginate();
        return view("admin.commetns.comment-list", ['results' => $comments]);
    }
    public function changeStatus($id)
    {
        $this->revRepo->changeState($id);
        return response(['msg'=>'تغییرات باموفقیت انجام شد'], 201);
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
