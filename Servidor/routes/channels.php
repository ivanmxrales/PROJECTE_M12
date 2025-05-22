<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\User;

Broadcast::channel('chat.{receiverId}', function ($user, $receiverId) {
    return $user->id === (int) $receiverId;
}); 

Broadcast::channel('test-channel', function ($user) {
    return true;
});

