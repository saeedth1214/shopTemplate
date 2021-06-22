<?php
namespace App\Responses;

class errorResponses extends MessageResponses
{
    protected $statusCode = 500;

    public function failed()
    {
        return ResponsesFacade::failed($this);
    }

}
