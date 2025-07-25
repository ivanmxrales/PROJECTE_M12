<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    function list()
    {
        if (User::all()->count() > 0) {
            $users = User::all();
            $img_location = env('USERS_PROFILE_PICTURE');
            foreach ($users as $user) {
                $user->profile_picture = url($img_location . '/' . $user->profile_picture);
            }
            return response()->json($users);
        } else {
            return response()->json(['error' => 'No hay usuarios registrados']);
        }
    }

    /* function search($id)
    {
        $user = User::with('posts')->find($id);
        $img_location = env('USERS_PROFILE_PICTURE');
        $user->profile_picture = url($img_location . '/' . $user->profile_picture); //retornem la ruta de la imatge
        return response()->json($user);
    } */

    public function search($id)
    {
        $user = User::with('posts')->find($id);

        if (!$user) {
            return response()->json(['error' => "No s'ha trobat l'usuari"], 404);
        }

        $img_location = env('USERS_PROFILE_PICTURE');

        if ($user->profile_picture && !str_starts_with($user->profile_picture, 'http')) {
            $user->profile_picture = url($img_location . '/' . $user->profile_picture);
        }

        return response()->json($user);
    }

    public function searchUsername($username)
    {
        $user = User::with('posts')->where('username', $username)->first();
        if (!$user) {
            return response()->json(['error' => "No s'ha trobat l'usuari"], 404);
        }

        $img_location = env('USERS_PROFILE_PICTURE');
        if ($user->profile_picture && !str_starts_with($user->profile_picture, 'http')) {
            $user->profile_picture = url($img_location . '/' . $user->profile_picture);
        }

        return response()->json($user);
    }

    public function getIdByUsername($username)
    {
        $user = User::with('posts')->where('username', $username)->first();
        if (!$user) {
            return response()->json(['error' => "No s'ha trobat l'usuari"], 404);
        }
        return response()->json($user->id);
    }


    function edit(Request $request, $id)
    {
        $user = User::find($id);

        if ($request->isMethod('post')) {
            $validate = $request->validate([
                'role' => 'required|in:moderator,premium,user',
                'name' => 'required|min:2|max:20',
                'surname' => 'required|min:2|max:20',
                'birth_date' => 'required|date',
                'username' => [
                    'required',
                    'min:2',
                    'max:20',
                    Rule::unique('users')->ignore($user->id)
                ],
                'email' => 'required|email',
                'password' => 'nullable|min:8|max:20'
            ]);

            if ($validate) {
                $user->name = $request->name;
                $user->surname = $request->surname;
                $user->birth_date = $request->birth_date;
                $user->biography = $request->biography;
                $user->username = $request->username;
                $user->email = $request->email;

                if ($request->filled('password')) {
                    $user->password = Hash::make($request->password);
                }

                $user->role = $request->role;
                if ($request->hasFile('profile_picture')) {
                    $request->validate([
                        'profile_picture' => 'image|mimes:jpg,jpeg,png|max:2048'
                    ]);
                    $file = $request->file('profile_picture');
                    $file_name = $user->name . '_' . $user->username . '.' . $file->getClientOriginalExtension();
                    $file_location = env('USERS_PROFILE_PICTURE');
                    $file->move(public_path($file_location), $file_name);
                    $user->profile_picture = $file_name;
                }
                $user->save();
                return response()->json($user);
            }
        }
    }

    function editEmail(Request $request, $id)
    {
        $user = User::find($id);

        if ($request->isMethod('post')) {
            $validate = $request->validate([
                'email' => 'required|email',
                'password' => 'nullable|min:8|max:20'
            ]);

            if ($validate) {
                $user->email = $request->email;
                $password = $request->password;

                if (!Hash::check($password, $user->password)) {
                    return response()->json(['error' => 'La contrasenya no coincideix amb la contrasenya actual'], 401);
                }
                $user->save();
                return response()->json($user);
            }
        }
    }

    function editPassword(Request $request, $id)
    {
        $user = User::find($id);

        if ($request->isMethod('post')) {
            $validate = $request->validate([
                'OldPassword' => 'min:8|max:20',
                'password' => 'min:8|max:20'
            ]);

            if ($validate) {
                $password = $request->password;
                $OldPassword = $request->OldPassword;

                if (!Hash::check($OldPassword, $user->password)) {
                    return response()->json(['error' => 'La contrasenya no coincideix amb la contrasenya actual'], 401);
                }
                $user->password = Hash::make($password);
                $user->save();
                return response()->json($user);
            }
        }
    }

    function delete($id)
    {
        $user = User::find($id);
        if ($user) {
            $user->email_verified_at = null;
            $user->save();
            $user->delete();
        }
        return $user;
    }

    function getPostsByUser($id)
    {
        $user = User::find($id);
        if ($user) {
            $posts = $user->posts;
            return response()->json($posts);
        } else {
            return response()->json(['error' => 'No s\'ha trobat l\'usuari'], 404);
        }
    }


    public function searchUsers(Request $request)
    {
        $query = $request->input('query');

        $img_location = env('USERS_PROFILE_PICTURE');

        $users = User::select('id', 'name', 'username', 'profile_picture')
            ->where('name', 'LIKE', "%$query%")
            ->orWhere('username', 'LIKE', "%$query%")
            ->get();


        foreach ($users as $user) {
            if ($user->profile_picture && !str_starts_with($user->profile_picture, 'http')) {
                $user->profile_picture = url($img_location . '/' . $user->profile_picture);
            }
        }

        return response()->json($users);
    }


    public function searchFollowedUsers(Request $request)
    {
        //dd($request->all());
        $query = $request->input('query');
        $img_location = env('USERS_PROFILE_PICTURE');

        $followedUserIds = Auth::user()->following()->pluck('user_id');


        $users = User::select('id', 'name', 'username', 'profile_picture')
            ->whereIn('id', $followedUserIds)
            ->where('name', 'LIKE', "%{$query}%")
            ->orWhere('username', 'LIKE', "%{$query}%")
            ->get();


        foreach ($users as $user) {
            if ($user->profile_picture && !str_starts_with($user->profile_picture, 'http')) {
                $user->profile_picture = url($img_location . '/' . $user->profile_picture);
            }
        }

        return response()->json($users);
    }



    public function randomUsers()
    {
        $currentUser = Auth::user();

        $excludedIds = $currentUser->following()->pluck('users.id')->toArray();
        $excludedIds[] = $currentUser->id;

        $users = User::whereNotIn('id', $excludedIds)
            ->inRandomOrder()
            ->take(5)
            ->select('id', 'name', 'username', 'profile_picture')
            ->get();

        $img_location = env('USERS_PROFILE_PICTURE');
        foreach ($users as $user) {
            if ($user->profile_picture && !str_starts_with($user->profile_picture, 'http')) {
                $user->profile_picture = url($img_location . '/' . $user->profile_picture);
            }
        }

        return response()->json($users);
    }

    public function followedUsers($id)
    {
        $user = User::find($id);

        $followedUsers = $user->following()->select('id', 'username', 'profile_picture')->get();

        $img_location = env('USERS_PROFILE_PICTURE');
        foreach ($followedUsers as $user) {
            if ($user->profile_picture && !str_starts_with($user->profile_picture, 'http')) {
                $user->profile_picture = url($img_location . '/' . $user->profile_picture);
            }
        }

        return response()->json($followedUsers);
    }
    public function updateEmail(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email', 'unique:users,email'],
        ]);

        $user = Auth::user();
        $user->email = $request->email;
        $user->email_verified_at = null;  // Marca como no verificado
        $user->save();

        $user->sendEmailVerificationNotification();

        return response()->json([
            'message' => 'Correu actualitzat. Comprova el teu correu per verificar-lo.'
        ]);
    }
}


