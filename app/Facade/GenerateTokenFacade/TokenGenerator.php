<?php

namespace App\Facade\GenerateTokenFacade;

class TokenGenerator
{
    public function createToken()
    {
        return bin2hex(random_bytes(45));
    }
}
