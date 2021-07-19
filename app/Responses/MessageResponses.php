<?php
namespace App\Responses;

abstract class MessageResponses
{
    protected $message;
    protected $redirectTo = '/';
    protected $data = [];
    protected $statusCode = '';

    public function setMessage($message='')
    {
        $this->message=$message;
        return $this;
    }

    public function redirect($redirect = '')
    {
        $this->redirectTo = $redirect;
        return $this;
    }
    public function setData($data =[])
    {
        $this->data= $data;
        return $this;
    }
    public function setStatus($status = '')
    {
        $this->isValidstaus($status) ?: $this->statusCode = $status;
        return $this;
    }

    private function isValidstaus($status)
    {
        return $status < 100 || $status >= 600;
    }

    public function getMessage()
    {
        return $this->message;
    }

    public function getRedirectTo()
    {
        return $this->redirectTo;
    }

    public function getStatusCode()
    {
        return $this->statusCode;
    }
    public function getdata()
    {
        return $this->data;
    }
}
