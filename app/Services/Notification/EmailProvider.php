<?php
namespace App\Services\Notification;

use App\Services\Notification\Provider;
use Illuminate\Support\Facades\Mail;
use App\Models\User;
use Illuminate\Mail\Mailable;

class EmailProvider implements Provider
{

    private $user;
    private $mailable;
    public function __construct(User $user,Mailable $mailable)
    {

        $this->user=$user;
        $this->mailable=$mailable;
    }
    public function send()
    {
        Mail::to($this->user->email)->send($this->mailable);
    }
}
