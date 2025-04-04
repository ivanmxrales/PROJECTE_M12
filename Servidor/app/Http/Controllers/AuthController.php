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
            $user = Auth::user();
            $user->role = 'user';
            $token = $user->createToken('token')->plainTextToken;
            $cookie = cookie('token', $token, 60 * 24 * 7);
            return response(["token" => $token], Response::HTTP_OK)
                ->withCookie($cookie);
        } else {
            return response(["message" => "Credencials invàlides."], Response::HTTP_UNAUTHORIZED);
        }
    }
}
