<?php

namespace App\Repositories;

use Morilog\Jalali;

class ShamsiRepositories extends Jalali\Jalalian
{
    public static function miladi_to_shamsi($date)
    {
        return Jalali\Jalalian::forge($date)->format('%A, %B %d, %Y');

    }

    public static function getYearDate($date)
    {
        return Jalali\Jalalian::forge($date)->getYear();

    }
}
