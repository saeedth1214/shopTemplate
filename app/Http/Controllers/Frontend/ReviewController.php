<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\review;
use App\Repositories\ReviewRepositories;
use App\Responses\ResponsesFacade;

class ReviewController extends Controller
{
    private $revRepo = null;

    public function __construct()
    {
        $this->revRepo = resolve(ReviewRepositories::class);
    }

    public function getUserProfileComment()
    {
        try {
            $data = $this->revRepo->getUserReview(auth()->id());
            return ResponsesFacade::success($data);
        } catch (\Throwable $th) {
            return $th->getMessage();
            return ResponsesFacade::faild();
        }
    }
    public function getProductComment()
    {
        try {
            $comments = $this->revRepo->getHomeComments(request()->pid);
            return ResponsesFacade::success($comments);
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
    }
    public function getReviews()
    {
        $reviews = $this->revRepo->getUserReview(request()->reviewId);
        return response($reviews);
    }
    public function create()
    {
        $data = [
            'user_id' => request()->user_id,
            'product_id' => request()->pid,
            'comment' => request()->comment,
            'rate' => request()->rate ,
        ];

        
        try {
            $rev = $this->revRepo->create($data);
            if ($rev instanceof review) {
                return ResponsesFacade::success(["msg" => "نظر شما با موفقیت ثبت شد"], 201);
            }
            return ResponsesFacade::faild(["msg" => "نظر شما با موفقیت ثبت شد"], 201);
        } catch (\Throwable $th) {
            return ResponsesFacade::faild(["msg" => "نظر شما با موفقیت ثبت شد"], 201);
        }
    }
}
