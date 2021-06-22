<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{

    public function register_user_is_ok()
    {
        $this->post("api/front/user/Register");
    }
}
