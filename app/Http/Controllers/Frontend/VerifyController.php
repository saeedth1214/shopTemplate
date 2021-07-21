<?php

namespace App\Http\Controllers\Frontend;

use Illuminate\Http\Client\Request;
use App\Responses\ResponsesFacade;
use App\Http\Controllers\Controller;

class VerifyController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('singed')->only('verify');
    }

    public function verify()
    {
        return ResponsesFacade::hasValidSignature();
    }
}
