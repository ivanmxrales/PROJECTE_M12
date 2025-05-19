<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ApiEmailVerifyController extends Controller
{
    public function verify(Request $request, $id, $hash)
    {
        $user = User::find($id);
    
        \Log::info('User being verified', ['user' => $user]);
    
        if (!$user) {
            return response()->json(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }
    
        if (!hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
            return response()->json(['message' => 'Invalid hash'], Response::HTTP_UNAUTHORIZED);
        }
    
        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email already verified'], Response::HTTP_OK);
        }
    
        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }
    
        //return response()->json(['message' => 'Email verified successfully'], Response::HTTP_OK);
        return redirect(env('FRONTEND_URL') . '/auth');
    }
    
}
