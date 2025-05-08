<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class FollowController extends Controller
{
    public function follow($userId)
    {
        $user = Auth::user();
        if ($user->id == $userId) {
            return response()->json(['message' => 'No et pots seguir a tu mateix'], 400);
        }

        $user->following()->syncWithoutDetaching([$userId]);
        return response()->json(['message' => 'Seguint a l\'usuari']);
    }

    public function unfollow($userId)
    {
        $user = Auth::user();
        $user->following()->detach($userId);
        return response()->json(['message' => 'Deixant de seguir a l\'usuari']);
    }

    public function isFollowing($userId)
    {
        $user = Auth::user();
        $isFollowing = $user->following()->where('user_id', $userId)->exists();

        return response()->json(['seguint' => $isFollowing]);
    }

    /* public function followers() {
        return response()->json(['followers' => Auth::user()->followers]);
    } */

    public function followers() {
        return response()->json(Auth::user()->followers);
    }

    public function following() {
        return response()->json(Auth::user()->following);
    }
}
