<?php

use App\Http\Controllers\LikeController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\ApiAuthenticate;
use App\Http\Middleware\Middleware;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\FollowController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Http\Controllers\ApiEmailVerifyController;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Broadcast;


/* Broadcast::routes(['middleware' => ['auth:sanctum']]); */

Route::middleware('auth:sanctum')->post('/user/update-email', [UserController::class, 'updateEmail']);

Route::post('/forgot-password', function (Request $request) {
    $request->validate(['email' => 'required|email']);

    $status = Password::sendResetLink(
        $request->only('email')
    );

    return $status === Password::RESET_LINK_SENT
        ? response()->json(['message' => __($status)])
        : response()->json(['message' => __($status)], 422);
});

Route::post('/reset-password', function (Request $request) {
    $request->validate([
        'token' => 'required',
        'email' => 'required|email',
        'password' => 'required|min:8|confirmed',
    ]);

    $status = Password::reset(
        $request->only('email', 'password', 'password_confirmation', 'token'),
        function ($user, $password) {
            $user->forceFill([
                'password' => bcrypt($password),
            ])->save();

            event(new \Illuminate\Auth\Events\PasswordReset($user));
        }
    );

    return $status === Password::PASSWORD_RESET
        ? response()->json(['message' => __($status)])
        : response()->json(['message' => __($status)], 422);
});


Route::post('/signup', [ApiController::class, 'signup']);
Route::post('/login', [ApiController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/me', function (Request $request) {
        return $request->user();
    });

    Route::delete('/messages/{id}', [MessageController::class, 'destroy']);


    // Email verification notice (optional)
    Route::get('/email/verify', function () {
        return response()->json(['message' => 'Si us plau, verifica el teu correu electrònic.']);
    })->middleware('auth:sanctum')->name('verification.notice');

    // Verification link handler
    // In api.php
    /* Route::get('/email/verify/{id}/{hash}', [App\Http\Controllers\ApiEmailVerifyController::class, 'verify'])
        ->middleware('signed')
        ->$request->fulfill()
        ->name('verification.verify'); */
    Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
        $request->fulfill();
        return redirect(env('FRONTEND_URL') . '/email-verified');
    })->middleware(['signed'])->name('verification.verify');


    // Resend verification email
    Route::post('/email/verification-notification', function (Request $request) {
        $request->user()->sendEmailVerificationNotification();
        return response()->json(['message' => 'S\'ha enviat un nou correu de verificació.']);
    })->middleware(['auth:sanctum', 'throttle:6,1'])->name('verification.send');


    //// POSTS /////
    Route::get('/posts', [ApiController::class, 'listPosts']);
    Route::get('/post/{id}', [ApiController::class, 'searchPost']);
    Route::get('/posts/search/{title}', [ApiController::class, 'searchPosts']);
    Route::post('/post', [ApiController::class, 'createPost']);
    Route::post('/post/{id}', [ApiController::class, 'updatePost']);
    Route::delete('/post/{id}', [ApiController::class, 'deletePost']);
    Route::get('/posts/user/{id}', [ApiController::class, 'listPostsUser']);
    Route::get('/posts/liked', [ApiController::class, 'getLikedPosts']);
    Route::post('/posts/followers', [ApiController::class, 'listPostsFollowers']);
    Route::get('/user/posts/{id}', [ApiController::class, 'countPosts']);

    //// USERS /////
    Route::get('/users', [ApiController::class, 'listUsers']);
    Route::get('/username/{username}', [ApiController::class, 'searchUsername']);
    Route::get('/user/{id}', [ApiController::class, 'searchUser']);
    Route::post('/user/{id}', [ApiController::class, 'updateUser']);
    Route::post('/user/email/{id}', [ApiController::class, 'updateEmail']);
    Route::post('/user/password/{id}', [ApiController::class, 'updatePassword']);
    Route::delete('/user/{id}', [ApiController::class, 'deleteUser']);
    Route::delete('/logout', [ApiController::class, 'logout']);
    Route::get('/user/{id}/posts', [ApiController::class, 'getPostsUser']);
    Route::get('/user/username/{username}', [ApiController::class, 'getIdByUsername']);
    Route::get('/users/search', [ApiController::class, 'searchUsers']);
    Route::get('/users/followed', [ApiController::class, 'searchFollowedUser']);
    Route::get('/users/random', [ApiController::class, 'randomUsers']);
    Route::get('/users/followed/{id}', [ApiController::class, 'followedUsers']);



    //// FOLLOW /////
    Route::post('/follow/{userId}', [FollowController::class, 'follow']);
    Route::post('/unfollow/{userId}', [FollowController::class, 'unfollow']);
    Route::get('/isFollowing/{userId}', [FollowController::class, 'isFollowing']);
    Route::get('/followers', [FollowController::class, 'followers']);
    Route::get('/following', [FollowController::class, 'following']);
    Route::get('/user/{id}/followers', [FollowController::class, 'getUserFollowers']);
    Route::get('/user/{id}/following', [FollowController::class, 'getUserFollowing']);


    //// COMMENTS /////
    Route::get('/coments', [ApiController::class, 'listComents']);
    Route::get('/coments/{id}', [ApiController::class, 'listComentsPost']);
    Route::get('/coment/{id}', [ApiController::class, 'searchComent']);
    Route::post('/coment', [ApiController::class, 'createComent']);
    Route::post('/coment/{id}', [ApiController::class, 'updateComent']);
    Route::delete('/coment/{id}', [ApiController::class, 'deleteComent']);

    // LIKES
    Route::get('/likes', [ApiController::class, 'listLikes']);
    Route::post('/posts/{postId}/like', [ApiController::class, 'Liking']);
    Route::delete('/posts/{postId}/like', [ApiController::class, 'unLiking']);
    Route::get('/posts/{id}/liked', [ApiController::class, 'hasLiked']);
    Route::get('/posts/{id}/likes', [ApiController::class, 'likeCount']);
    Route::get('/{userId}/likes', [ApiController::class, 'getLikedPosts']);


    // MISSATGES
    Route::get('/messages', [MessageController::class, 'index']);
    Route::post('/messages', [MessageController::class, 'store']);
    Route::get('/conversations', [MessageController::class, 'conversations']);

});



