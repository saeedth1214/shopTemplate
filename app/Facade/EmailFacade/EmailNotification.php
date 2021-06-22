<?php
namespace App\Facade\EmailFacade;

use App\Services\authenticateServise;

class emailNotification
{
    public function send($userName='', $email)
    {
        return authenticateServise::sendmail($userName, $email);
    }
    public function verifyEmail($token)
    {
        return authenticateServise::verify($token);
    }
}
