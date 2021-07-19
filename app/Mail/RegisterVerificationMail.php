<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class RegisterVerificationMail extends Mailable
{
    use Queueable, SerializesModels;

    private $token = null;
    private $expireTime = null;
    private $username = null;
    private $email = null;

    public function __construct($userName, $email, $token, $expireAt)
    {
        $this->token = $token;
        $this->expireTime = $expireAt;
        $this->username = $userName;
        $this->email = $email;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.registerVerify')->with('token', $this->token)->with('name', $this->username)->with('time', $this->expireTime)
            ->to($this->email);
    }
}
