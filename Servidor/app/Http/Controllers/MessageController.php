<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index()
    {
        $userId = auth()->id();

        $users = Message::where('sender_id', $userId)
            ->orWhere('receiver_id', $userId)
            ->with(['sender', 'receiver'])
            ->get()
            /* ->map(function ($message) use ($userId) {
                return [
                    'id' => $message->id,
                    'sender' => $message->sender_id == $userId ? $message->receiver : $message->sender,
                    'content' => $message->content,
                    'created_at' => $message->created_at,
                ]; */
            ->groupBy(function ($message) use ($userId) {
                return $message->sender_id == $userId ? $message->receiver->id : $message->sender->id;
            });
        return response()->json($users);
    }

    public function store(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'content' => 'required|string|max:100',
        ]);

        $message = Message::create([
            'sender_id' => auth()->id(),
            'receiver_id' => $request->receiver_id,
            'content' => $request->content,
        ]);

        return response()->json($message, 201);
    }
}
