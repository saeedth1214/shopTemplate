<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Repositories\UserRepositories;
use App\Responses\ResponsesFacade;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Events\userRegistered;
use Imanghafoori\Helpers\Nullable;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Carbon;

class AuthController extends Controller
{
    //    use AuthenticatesUsers;
    private $userRepo = null;

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register']]);
        $this->userRepo = resolve(UserRepositories::class);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);
        $token = $this->attemptAction($credentials);
        Cache::put('tokenApi', $token, Carbon::now()->addMinutes(60));
        if (!$token) {
            return ResponsesFacade::emailOrPasswordNotValid();
        }
        return ResponsesFacade::userLoggedIn($this->respondWithToken($token));
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth('api')->user());
    }


    public function attemptAction($credentials)
    {
        return auth('api')->attempt($credentials);
    }
    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth('api')->logout();

        Cache::forget('tokenApi');
        return ResponsesFacade::userLoggedOut();
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth('api')->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL(),
            'user'=>auth('api')->user(),
        ];
    }
    public function register(Request $request)
    {
        $data = $request->all(); //return object
        try {
            if ($this->ValidateEmail(['email' => $data['email']])) {
                return ResponsesFacade::emailAlreadyCreated();
            }
            $user = $this->createUser($data);
          
            $token=$this->attemptAction(['email'=>$data['email'],'password'=>$data['password']]);

            Cache::put('tokenApi', $token, Carbon::now()->addMinutes(60));
            event(new userRegistered($user));

            return ResponsesFacade::verifyEmailSendSuccessfuly($this->respondWithToken($token));
        } catch (\Throwable $th) {
            return [$th->getLine(), $th->getFile(), $th->getMessage()];
            return ResponsesFacade::faild();
        }
    }

    private function ValidateEmail($email)
    {
        $validator = Validator::make($email, [
            'email' => 'unique:users'
        ]);
        return $validator->fails();
    }
    private function createUser($data)
    {
        $user = $this->userRepo->create($data);
        $user = $user->getOrSend(function () {
            return ResponsesFacade::faild();
        });
        return $user;
    }

    public function changePassword()
    {
        try {
            $user = $this->userRepo->find(request()->userId);

            $res = $user->update(["password" => request()->password]);

            if ($res) {
                return ResponsesFacade::success();
            }
            return ResponsesFacade::faild();
        } catch (\Throwable $th) {
            return ResponsesFacade::faild();
        }
    }
}
