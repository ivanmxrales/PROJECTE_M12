<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Models\User;
use Illuminate\Http\Request; 
use Illuminate\Auth\Events\Verified;

Route::get('/', function () {
    return view('welcome');
});

//Route::get('/users', [UserController::class, 'list']);

/* Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard'); */

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/* Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    return redirect(env('FRONTEND_URL') . '/email-verified');
})->middleware(['signed'])->name('verification.verify'); */

/* Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill(); // això marca el correu com verificat

    return redirect(config('frontend.url') . '/email-verified');
})->middleware('signed')->name('verification.verify'); */

Route::get('/email/verify/{id}/{hash}', function ($id, Request $request) {
    $user = User::findOrFail($id);

    if ($user->hasVerifiedEmail()) {
        return redirect(config('frontend.url') . '/email-verified?already_verified=1');
    }

    $user->markEmailAsVerified();

    event(new Verified($user));

    return redirect(config('frontend.url') . '/email-verified');
})->middleware('signed')->name('verification.verify');

Route::get('/test-frontend-url', function() {
    return env('FRONTEND_URL', 'NOT SET');
});


Route::post('/broadcasting/auth', function (Request $request) {
    Log::info('Broadcast auth attempt', [
        'user' => $request->user(),
        'headers' => $request->headers->all(),
        'input' => $request->all(),
    ]);

    if (!$request->user()) {
        return response()->json(['error' => 'Unauthorized'], 403);
    }

    return Broadcast::auth($request);
})->middleware('auth:api');

require __DIR__.'/auth.php';
