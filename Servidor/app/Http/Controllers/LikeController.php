<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


use App\Models\User;
use App\Models\Post;

class LikeController extends Controller
{
    public function list()
    {
        $likes = Like::all();
        return response()->json($likes);
    }
    
    public function likePost($postId)
    {
        $user = Auth::user(); // Suponiendo autenticación
        $post = Post::findOrFail($postId);

        //falso error
        if ($user->likedPosts()->where('post_id', $post->id)->exists()) {
            return response()->json(['message' => 'Ya diste like a este post.'], 409);
        }

        $user->likedPosts()->attach($post->id);


        return response()->json(['message' => 'Post liked']);
    }

    public function unlikePost($postId)
    {
        //$user = auth()->user();
        $user = Auth::user();
        $user->likedPosts()->detach($postId);

        return response()->json(['message' => 'Post unliked']);
    }

    public function hasLiked($postId)
    {

        //falso error
        $user = auth()->user();
        $hasLiked = $user->likedPosts()->where('post_id', $postId)->exists();

        return response()->json(['liked' => $hasLiked]);
    }

    public function likeCount($postId)
    {
        $post = Post::findOrFail($postId);
        $count = $post->likedByUsers()->count();

        return response()->json(['likes' => $count]);
    }


    public function userLiked($userId)
    {
        $user = User::findOrFail($userId);
        $posts = $user->likedPosts()->get();

        return response()->json(['likes' => $posts]);
    }

    // public function likes() {
    //     return response()->json(Auth::post()->followers);
    // }

    // public function listLikesForPost($postId)
    // {
    //     $user = Auth::user();

    //     $like = $user->likedPosts()
    //         ->where('post_id', $postId)
    //         ->withPivot('created_at')
    //         ->get()
    //         ->map(function ($post) {
    //             return [
    //                 'post_id' => $post->id,
    //                 'liked_at' => $post->pivot->created_at,
    //             ];
    //         });

    //     return response()->json(['likes' => $like]);
    // }
}
