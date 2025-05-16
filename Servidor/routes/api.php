    <?php

    use App\Http\Controllers\LikeController;
    use App\Http\Middleware\ApiAuthenticate;
    use App\Http\Middleware\Middleware;
    use Illuminate\Support\Facades\Route;
    use Illuminate\Http\Request;
    use App\Http\Controllers\ApiController;
    use App\Http\Controllers\FollowController;
    
    Route::post('/signup', [ApiController::class, 'signup']);
    Route::post('/login', [ApiController::class, 'login']);

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('/me', function (Request $request) {
            return $request->user();
        });

        //// POSTS /////
        Route::get('/posts', [ApiController::class, 'listPosts']);
        Route::get('/post/{id}', [ApiController::class, 'searchPost']);
        Route::post('/post', [ApiController::class, 'createPost']);
        Route::post('/post/{id}', [ApiController::class, 'updatePost']);
        Route::delete('/post/{id}', [ApiController::class, 'deletePost']);
        Route::get('/posts/user/{id}', [ApiController::class, 'listPostsUser']);
        Route::get('/posts/liked', [ApiController::class, 'getLikedPosts']);

        //// USERS /////
        Route::get('/users', [ApiController::class, 'listUsers']);
        Route::get('/username/{username}', [ApiController::class, 'searchUsername']);
        Route::get('/user/{id}', [ApiController::class, 'searchUser']);
        Route::post('/user/{id}', [ApiController::class, 'updateUser']);
        Route::post('/user/email/{id}', [ApiController::class, 'updateEmail']);
        Route::delete('/user/{id}', [ApiController::class, 'deleteUser']);
        Route::delete('/logout', [ApiController::class, 'logout']);
        Route::get('/user/{id}/posts', [ApiController::class, 'getPostsUser']);
        Route::get('/user/username/{username}', [ApiController::class, 'getIdByUsername']);
        Route::get('/users/search', [ApiController::class, 'searchUsers']);
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
        Route::get('/coment/{id}', [ApiController::class, 'searchComent']);
        Route::post('/coment', [ApiController::class, 'createComent']);
        Route::post('/coment/{id}', [ApiController::class, 'updateComent']);
        Route::delete('/coment/{id}', [ApiController::class, 'deleteComent']);

        // LIKES
        Route::get('/likes', [ApiController::class, 'listLikes']);
        Route::post('/posts/{postId}/like', [LikeController::class, 'likePost']);
        Route::delete('/posts/{postId}/like', [LikeController::class, 'unlikePost']);
        Route::get('/posts/{id}/liked', [LikeController::class, 'hasLiked']);
        Route::get('/posts/{id}/likes', [LikeController::class, 'likeCount']);
        Route::get('/likes', [LikeController::class, 'list']);

    });
    


