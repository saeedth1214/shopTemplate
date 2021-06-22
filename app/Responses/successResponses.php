<?php
namespace App\Responses;

class successResponses extends MessageResponses
{
    protected $statusCode=200;

    public function success()
    {
       return ResponsesFacade::success($this);
    }
}
