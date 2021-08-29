<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class forgetPassword extends Mailable
{
    use Queueable, SerializesModels;


    private $user;
    private $token;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user, $token)
    {
        $this->token=$token;
        $this->user=$user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('email.forgetPassword')->with([
            "link"=>$this->generateLink(),
        ]);
    }

    private function generateLink()
    {
        return route("forgetPassword.form", ['token'=>$this->token,'email'=>$this->user->email]);
    }
}
