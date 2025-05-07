<?php

namespace App\Http\Controllers;

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
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:8|max:20'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if (Auth::attempt(['email' => $request->email, 
        'password' => $request->password])) {
            /** @var \App\Models\User $user **/  $user = Auth::user();
            $user->role = 'user';
            $token = $user->createToken('token')->plainTextToken;
            $cookie = cookie('token', $token, 60 * 24 * 7);
            $img_location = env('USERS_PROFILE_PICTURE');
            return response([
                "user" => [
                    "id" => $user->id,
                    "name" => $user->name,
                    "surname" => $user->surname,
                    "email" => $user->email,
                    "username" => $user->username,
                    "profile_picture" => url($img_location . '/' . $user->profile_picture),
                    "role" => $user->role,
                    "biography" => $user->biography,
                    "birth_date" => $user->birth_date
                ],
                "token" => $token
            ], Response::HTTP_OK)->withCookie($cookie); //retornem l'objecte per guadar sessió en el client
        } else {
            return response(["message" => "Credencials invàlides."], Response::HTTP_UNAUTHORIZED);
        }
    }

    function logout(Request $request)
    {
        $user = Auth::user();
        /** @var \App\Models\User $user **/ $user->tokens()->delete();
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
                'email' => 'required|email',
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
                    $file_name = $user->name . '_' . $user->surname .  '.' . $file->getClientOriginalExtension();
                    $file_location = env('USERS_PROFILE_PICTURE');
                    $file->move(public_path($file_location), $file_name);
                    $user->profile_picture = $file_name;
                }
                $user->save();
                return response()->json($user);
            }
        }
    }
}
