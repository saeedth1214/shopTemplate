<?php

namespace App\Models;

use App\Repositories\ShamsiRepositories;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;
use Laravel\Passport\HasApiTokens;
use App\Jobs\sendEmail;
use App\Mail\UserRegistered;

class User extends Authenticatable
{
    use Notifiable,HasApiTokens;

    protected $perPage = 5;

    const TYPE_ADMIN = 'admin';
    const TYPE_USER = 'user';

    const TYPES = [self::TYPE_USER, self::TYPE_ADMIN];

    const CREATED_AT = 'created_at';
    const UPDATED_AT = null;
    protected $guarded = ['id'];

    protected $hidden = [
        'password'
    ];
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public function reviews()
    {
        return $this->hasMany(review::class);
    }

    public function addresses()
    {
        return $this->hasMany(address::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function setPasswordAttribute($pass)
    {
        $this->attributes['password'] = Hash::make($pass);
    }
    // public function setRoleAttribute($role)
    // {
    //     $map=[
    //         "کاربر عادی"=>"user",
    //         "ادمین"=>"admin",
    //     ];
    //     $this->attributes['password'] = $map[$role];
    // }
    // public function getRoleNameAttribute()
    // {
    //     $user_role = $this->attributes['role'];
    //     $role_name = [
    //         "user" => "کاربر عادی",
    //         "admin" => "ادمین",
    //     ];

    //     return $role_name[$user_role];
    // }

    public function getCreatedAtAttribute($value)
    {
        // return date("MMM", strtotime($value));
        return ShamsiRepositories::miladi_to_shamsi($value);
    }

    public function isAdmin()
    {
        $user = auth()->user();
        return $user->role == "admin";
    }

    public function sendEmailVerificationNotification()
    {
       
        sendEmail::dispatch($this, new UserRegistered($this));
    }
}
