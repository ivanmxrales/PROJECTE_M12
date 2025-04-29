<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


use App\Models\User;
use App\Models\Post;

class LikeController extends Controller
{
    public function likePost($postId)
    {
        $user = Auth::user();
        $post = Post::findOrFail($postId);

        if (!$user->likedPosts->contains($post->id)) {
            /** @var \App\Models\User $user **/ $user->likedPosts()->attach($post->id);
        }

        return response()->json(['message' => 'Post liked']);
    }

    public function unlikePost($postId)
    {
        $user = Auth::user();
        /** @var \App\Models\User $user **/ $user->likedPosts()->detach($postId);

        return response()->json(['message' => 'Post unliked']);
    }
}

