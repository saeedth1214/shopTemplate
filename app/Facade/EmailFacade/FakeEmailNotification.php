<?php


namespace App\Facade\EmailFacade;

use App\Services\emailNotificationServise;

class FakeEmailNotification
{
    public function send($userName = '', $email)
    {
        return emailNotificationServise::sendmail($userName, $email);
    }
    public function verifyEmail($token)
    {
        return emailNotificationServise::verify($token);
    }
}
