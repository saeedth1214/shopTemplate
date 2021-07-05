<?php

namespace App\Repositories;

use App\Models\review;
use Illuminate\Support\Carbon;
use App\Models\User;
use App\Models\reply;
use App\Models\product;

class ReviewRepositories extends BaseRepository
{
    protected $model = review::class;

    public function getUserComments($uid)
    {
        return $this->model::query()->join('users', 'reviews.user_id', '=', 'users.id')
            ->where('reviews.user_id', $uid)
            ->select("reviews.id as id", 'reviews.rate as rate', 'reviews.comment as comment', 'reviews.status as status', 'users.fullname as fullname', 'users.avatar as avatar', 'reviews.created_at as date')
            ->get()->toArray();
    }

    public function getHomeComments($pid)
    {
        $comment= $this->model::join('users', 'reviews.user_id', '=', 'users.id')
            ->where(['reviews.product_id' => $pid, 'reviews.status' => 1])
            ->select(
                'reviews.id as rid',
                "reviews.user_id as uid",
                'reviews.rate as rate',
                'reviews.comment as comment',
                'reviews.status as status',
                'users.fullname as fullname',
                'users.role as role',
                'users.avatar as avatar',
                'reviews.created_at as date',
            )->get();
        foreach ($comment as $key => $value) {
            $replys = reply::query()->where('message_id', $value['rid'])->select("reply-message.message_id", "reply-message.reply", "reply-message.created_at as date")->get()->toArray();
            $comment[$key]['reply'] = $replys;
        }
        return $comment;
    }

    public function getAllComments()
    {
        return $this->model::join('users', 'reviews.user_id', '=', 'users.id')
            ->join('products', 'reviews.product_id', '=', 'products.id')
            ->select("reviews.id as id", 'reviews.rate as rate', 'reviews.comment as comment', 'reviews.status as status', 'users.fullname as fullname', 'users.role as rolename', 'reviews.created_at as date', 'products.title as title')->get();
    }

    public function newComment()
    {
        return $this->model::whereDate('created_at', Carbon::now());
    }

    public function changeState($id)
    {
        $comment = $this->model::findOrFail($id);
        // $bool=$comment->status;
        $comment->status =true;
        $comment->save();
    }

    public function getUserReview($uid)
    {
        $comment=$this->model::join('products', "products.id", "reviews.product_id")
        ->where("reviews.user_id", "=", $uid)
        ->select("products.title as title", "reviews.id as rid", "reviews.comment", "reviews.status", "reviews.created_at as date")
        ->get()->toArray();
 
        foreach ($comment as $key => $value) {
            $replys=reply::query()->where('message_id', $value['rid'])->select("reply-message.message_id", "reply-message.reply", "reply-message.created_at as date")->get()->toArray();
            $comment[$key]['reply']=$replys;
        }

        return $comment;
    }
}
