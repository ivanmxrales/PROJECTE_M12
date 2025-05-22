<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use App\Events\MessageSent;

class MessageController extends Controller
{
    public function index(Request $request)
    {
        $userId = auth()->id();
        $otherUserId = $request->query('user_id');

        if (!$otherUserId) {
            return response()->json(['error' => 'user_id is required'], 400);
        }

        $messages = Message::where(function ($query) use ($userId, $otherUserId) {
            $query->where('sender_id', $userId)
                ->where('receiver_id', $otherUserId);
        })
            ->orWhere(function ($query) use ($userId, $otherUserId) {
                $query->where('sender_id', $otherUserId)
                    ->where('receiver_id', $userId);
            })
            ->with(['sender', 'receiver'])
            ->orderBy('created_at', 'asc')
            ->get();


        return response()->json($messages);
    }


    /* public function store(Request $request)
    {
        $validated = $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'content' => 'required|string|max:100',
        ]);

        if (!$request->user()->following()->where('user_id', $validated['receiver_id'])->exists()) {
            return response()->json(['error' => 'Només pots enviar missatges a usuaris que segueixes.'], 403);
        }


        $message = Message::create([
            'sender_id' => $request->user()->id,
            'receiver_id' => $validated['receiver_id'],
            'content' => $validated['content'],
        ]);

        broadcast(new MessageSent($message));

        return response()->json($message, 201);
    } */

    public function store(Request $request)
    {
        $validated = $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'content' => 'required|string|max:100',
        ]);

        $user = $request->user();

        $follows = $user->following()->where('user_id', $validated['receiver_id'])->exists();

        $hasReceivedMessage = Message::where('sender_id', $validated['receiver_id'])
            ->where('receiver_id', $user->id)
            ->exists();

        if (!$follows && !$hasReceivedMessage) {
            return response()->json(['error' => 'Només pots enviar missatges a usuaris que segueixes o que t\'han escrit primer.'], 403);
        }

        $message = Message::create([
            'sender_id' => $user->id,
            'receiver_id' => $validated['receiver_id'],
            'content' => $validated['content'],
        ]);

        broadcast(new MessageSent($message));

        return response()->json($message, 201);
    }


    public function conversations()
    {
        $userId = auth()->id();
        $img_location = env('USERS_PROFILE_PICTURE');

        $messages = Message::where('sender_id', $userId)
            ->orWhere('receiver_id', $userId)
            ->with(['sender', 'receiver'])
            ->get();

        $users = [];

        foreach ($messages as $message) {
            $otherUser = $message->sender_id == $userId ? $message->receiver : $message->sender;
            $users[$otherUser->id] = $otherUser;

        }

        foreach ($users as $user) {
            if ($user->profile_picture && !str_starts_with($user->profile_picture, 'http')) {
                $user->profile_picture = url($img_location . '/' . $user->profile_picture);
            }
        }

        return response()->json(array_values($users));
    }

    public function destroy($id)
    {
        $user = auth()->user();

        $message = Message::find($id);

        if (!$message) {
            return response()->json(['error' => 'Missatge no trobat.'], 404);
        }

        if ($message->sender_id !== $user->id) {
            return response()->json(['error' => 'No tens permís per eliminar aquest missatge.'], 403);
        }

        $message->delete();

        return response()->json(['message' => 'Missatge eliminat correctament.']);
    }


}
