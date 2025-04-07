<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

///// POSTS /////

// Route::get('/posts', [PostController::class, 'list']);
// Route::match(['get', 'post'], '/post/{id}', [PostController::class, 'edit']);
// // Route::put('/posts/{id}', [PostController::class, 'edit']);
// Route::post('/post', [PostController::class, 'new']);
// Route::get('/post/{id}', [PostController::class, 'search']);
// Route::delete('/posts/{id}', [PostController::class, 'delete']);

Route::get('/posts', [ApiController::class, 'listPosts']);
Route::get('/post/{id}', [ApiController::class, 'searchPost']);
Route::post('/post', [ApiController::class, 'createPost']);
Route::post('/post/{id}', [ApiController::class, 'updatePost']);
Route::delete('/post/{id}', [ApiController::class, 'deletePost']);

///// USERS /////

/* Route::get('/users', [UserController::class, 'list']);
Route::match(['get', 'post'], '/user/{id}', [UserController::class, 'edit']);
Route::post('/user', [UserController::class, 'new']);
Route::get('/user/{id}', [UserController::class, 'search']);
Route::delete('/user/{id}', [UserController::class, 'delete']); */

Route::get('/users', [ApiController::class, 'listUsers']);
Route::get('/user/{id}', [ApiController::class, 'searchUser']);
Route::post('/user', [ApiController::class, 'createUser']);
Route::post('/user/{id}', [ApiController::class, 'updateUser']);
Route::delete('/user/{id}', [ApiController::class, 'deleteUser']);
Route::post('/login', [ApiController::class, 'login']);
