<?php

namespace App\Repositories;

use App\Models\reply;

class ReplyRepositories extends BaseRepository
{
    protected $model = reply::class;


    public function getReplys($commentsId)
    {
        return $this->model::whereIn('message_id', $commentsId)->get(["message_id", "reply"]);
    }
}
