<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;
use Illuminate\Support\Facades\URL;

class UserRegistered extends Mailable
{
    use Queueable, SerializesModels;

    private $user;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        $this->user=$user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.userRegistered')->with(['link'=>$this->generateLink(),'name'=>$this->user->fullname]);
    }


    private function generateLink()
    {
        return URL::temporarySignedRoute('authenticate.verify.email', now()->addMinutes(120),['email'=>$this->user->email]);
    }
}
