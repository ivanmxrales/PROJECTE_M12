<?php

namespace App\Http\Controllers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;



class AuthController extends Controller
{
    public function login(Request $request)
    {

        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:8|max:20'
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Credencials invàlides'], Response::HTTP_UNAUTHORIZED);
        }

        $user = Auth::user();

        if ($user->email_verified_at == null) {
            return response()->json(['message' => 'El teu compte no està verificat'], Response::HTTP_UNAUTHORIZED);
        }

        if ($user->is_blocked) {
            return response()->json(['message' => 'El teu compte ha estat bloquejat'], Response::HTTP_UNAUTHORIZED);
        }
        if ($user->is_deleted) {
            return response()->json(['message' => 'El teu compte ha estat eliminat'], Response::HTTP_UNAUTHORIZED);
        }
        if ($user->is_banned) {
            return response()->json(['message' => 'El teu compte ha estat prohibit'], Response::HTTP_UNAUTHORIZED);
        }

        $token = $user->createToken('YourAppName')->plainTextToken;
        $img_location = env('USERS_PROFILE_PICTURE');
        $user->profile_picture = url($img_location . '/' . $user->profile_picture);
        //$user->role = 'user';

        return response()->json([
            'user' => $user,

            'token' => $token
        ]);
    }

    function logout(Request $request)
    {
        //$user = Auth::user();
        //$user->tokens()->delete();
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'Logout successful']);
    }

    function signup(Request $request)
    {
        $user = new User;

        if ($request->isMethod('post')) {
            $validate = $request->validate([
                'role' => 'in:moderator,premium,user',
                'name' => 'required|min:2|max:20',
                'surname' => 'nullable|min:2|max:20',
                'birth_date' => 'nullable|date',
                'username' => 'required|min:2|max:20|unique:users,username',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|min:8|max:20'
            ]);


            //var_dump($validate);
            //dd($validate);
            if ($validate) {
                $user->name = $request->name;
                $user->surname = $request->surname;
                $user->birth_date = $request->birth_date;
                $user->biography = $request->biography;
                $user->username = $request->username;
                $user->email = $request->email;
                $user->password = Hash::make($request->password);
                $user->role = $request->role;
                if ($request->hasFile('profile_picture')) {
                    $file = $request->file('profile_picture');
                    $file_name = $user->name . '_' . $user->surname . '.' . $file->getClientOriginalExtension();
                    $file_location = env('USERS_PROFILE_PICTURE');
                    $file->move(public_path($file_location), $file_name);
                    $user->profile_picture = $file_name;
                }
                $user->save();

                /* event(new Registered($user));*/
                $user->sendEmailVerificationNotification();

                $token = $user->createToken('YourAppName')->plainTextToken;

                return response()->json([
                    'user' => $user,
                    'token' => $token
                ]);
            }
        }
    }
}
