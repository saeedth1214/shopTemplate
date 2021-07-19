<?php

namespace App\Repositories;

use App\Models\user;
use Illuminate\Support\Carbon;
use Imanghafoori\Helpers\Nullable;

class UserRepositories extends BaseRepository
{
    protected $model = user::class;


    public function create($data)
    {
        // dd($data);
        try {
            $user=User::query()->create($data);
        } catch (\Exception $e) {
            // dd($e->getMessage());
            return Nullable(null);
        }

        if (!$user->exists) {
            return Nullable(null);
        }

        return Nullable($user);
    }

    public function search($data)
    {
        return $this->model::where('fullname', 'like', "%$data%")->first();
    }

    public function newUser()
    {
        return $this->model::whereDate('created_at', Carbon::now());
    }

    public function getInfo($uId)
    {
        return $this->model::join('addresses', 'user_id', '=', 'users.id')
            ->where('users.id', $uId)
            ->select('users.fullname as fullname', 'users.email as email', 'users.avatar as avatar', 'addresses.contact_number as contact')
            ->orderBy('addresses.created_at', 'desc')->first();
    }

    public function getAvatar($uid)
    {
        return $this->model::where('id', $uid)->value('avatar');
    }

    public function searchMail($email)
    {
        return $this->model::where('email', $email)->value('id');
    }

    public function changeRole($role, $id)
    {
        return $this->model::where('id', $id)->update(['role' => $role]);
    }

    public function setPasswordAttribute($pass)
    {
        return bcrypt($pass);
    }
}
