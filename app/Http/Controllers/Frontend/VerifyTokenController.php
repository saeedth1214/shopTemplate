<?php

namespace App\Http\Controllers\Frontend;

use App\Responses\ResponsesFacade;
use App\Responses\successResponses;
use Illuminate\Filesystem\Cache;

class VerifyTokenController
{
    public function verifyToken()
    {
        $token = request('token');

        return $this->tokenIsExpired() && $this->tokenIsNotEquals($token);
        if ($this->tokenIsExpired() && $this->tokenIsNotEquals($token)) {
            return app()->make(successResponses::class)
            ->setMessage('ایمیل شمابا موفقیت تایید شد')
            ->redirect('/home')
            ->setStatus(402);
        }
        return ResponsesFacade::failed();
    }

    private function tokenIsExpired()
    {
        return Cache::has('register-token');
        return Carbon::now('Asia/Tehran') < session('tokenSendTime');
    }
    private function tokenIsNotEquals($token)
    {
        return Cache::get('register-token')== $token;
        return session()->get('token')== $token;
    }
}
