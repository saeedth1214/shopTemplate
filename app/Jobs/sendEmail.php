<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\User;
use Illuminate\Mail\Mailable;
use App\Services\Notification\Notification;

class sendEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $user;
    private $userRegisteredMailable;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(User $user, Mailable $userRegisteredMailable)
    {
        $this->user=$user;
        $this->userRegisteredMailable=$userRegisteredMailable;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(Notification $notification)
    {
        $notification->sendEmail($this->user, $this->userRegisteredMailable);
        // NotificationFacade::send($this->user,$this->userRegisteredMailable);
    }
}
