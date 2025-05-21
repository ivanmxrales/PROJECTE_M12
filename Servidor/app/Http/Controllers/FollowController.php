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

    public function getUserFollowers($id)
    {
        $user = User::find($id);
        $img_location = env('USERS_PROFILE_PICTURE');
        if ($user->profile_picture && !str_starts_with($user->profile_picture, 'http')) {
            $user->profile_picture = url($img_location . '/' . $user->profile_picture);
        }

        if (!$user) {
            return response()->json(['error' => 'Usuari no trobat'], 404);
        }
        return response()->json($user->followers);
    }
    public function getUserFollowing($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'Usuari no trobat'], 404);
        }
        $followed = $user->following;
        $img_location = env('USERS_PROFILE_PICTURE');
        foreach ($followed as $user) {
            $user->profile_picture = url($img_location . '/' . $user->profile_picture);
        }
        
        return response()->json($followed);
    }
}
