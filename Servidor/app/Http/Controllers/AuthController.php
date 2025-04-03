<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;


class AuthController extends Controller
{
    public function login(Request $request)
    {
        $response = ["success" =>"false"];

        if ($request->isMethod('post')) {
            $validate = $request->validate([
                'email' => 'required|email',
                'password' => 'required|min:8|max:20'
            ]);

            if (Auth::attempt(['email' => $request->email, 'password' => $request->password])){
                $user = Auth::user();   
                $user->role = 'user';
                $response['token'] = $user->createToken('token')->plainTextToken;
            }
        }
    }
}
