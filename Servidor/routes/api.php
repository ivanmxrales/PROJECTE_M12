<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

///// POSTS /////

Route::get('/posts', [PostController::class, 'list']);
Route::put('/posts/{id}', [PostController::class, 'edit']);
Route::post('/post', [PostController::class, 'new']);
Route::get('/post/{id}', [PostController::class, 'search']);
Route::delete('/posts/{id}', [PostController::class, 'delete']);

///// USERS /////

Route::get('/users', [UserController::class, 'list']);
Route::match(['get', 'post'], '/user/{id}', [UserController::class, 'edit']);
Route::post('/user', [UserController::class, 'new']);
Route::get('/user/{id}', [UserController::class, 'search']);
Route::delete('/user/{id}', [UserController::class, 'delete']);
