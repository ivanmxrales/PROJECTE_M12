<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    function list() {
        if (User::all()->count() > 0) {
            $users = User::all();
            $img_location = env('USERS_PROFILE_PICTURE');
            foreach($users as $user) {
                $user->profile_picture = url($img_location . '/' . $user->profile_picture);
            }
            return response()->json($users);
        } else {
            return response()->json(['message' => 'No hay usuarios registrados']);
        }
    }

    function search($id) {
        $user = User::find($id);
        return response()->json($user);
    }

    function new(Request $request) {
        $user = new User;

        if($request->isMethod('post')) {
            $validate = $request->validate([
                'role' => 'required|in:moderator,premium,user',
                'name' => 'required|min:2|max:20',
                'surname' => 'required|min:2|max:20',
                'birth_date' => 'required|date',
                'username' => 'required|min:2|max:20, unique:users,username',
                'email' => 'required|email',
                'password' => 'required|min:8|max:20',
                'profile_picture' => 'image|mimes:jpeg,png,jpg|max:2048',
            ]); 

            if($validate) { 
                $user->role = $request->role;
                $user->name = $request->name;
                $user->surname = $request->surname;
                $user->birth_date = $request->birth_date;
                $user->username = $request->username;
                $user->email = $request->email;
                $user->password = Hash::make($request->password);
                if($request->hasFile('profile_picture')) {
                    $file = $request->file('profile_picture');
                    $file_name = $user->name . '_' . $user->surname .  '.' . $file->getClientOriginalExtension();
                    $file_location = env('USERS_PROFILE_PICTURE');
                    $file->move(public_path($file_location), $file_name);
                    $user->profile_picture = $file_name;
               } 
                $user->save();
                return response()->json($user);
            }
        }
    }

    function edit(Request $request, $id) {
        $user = User::find($id);

        $validate = $request->validate([
            'name' => 'required|min:2|max:20',
            'surname' => 'required|min:2|max:20',
            'birth_date' => 'required|date',
            'username' => 'required|min:2|max:20',
            'email' => 'required|email',
            'password' => 'required|min:8|max:20',
            'profile_picture' => 'image|mimes:jpeg,png,jpg|max:2048',
        ]);
        
        if ($validate) {
            if(isset($request->name)) $user->name = $request->name;
            if(isset($request->surname)) $user->surname = $request->surname;
            if(isset($request->birth_date)) $user->birth_date = $request->birth_date;
            if(isset($request->username)) $user->username = $request->username;
            if(isset($request->email)) $user->email = $request->email;
            if(isset($request->password)) $user->password = $request->password;
            if(isset($request->profile_picture)) {
            $file = $request->file('profile_picture');
            $file_name = $user->name . '_' . $file->getClientOriginalName();
            $file_location = env('USERS_PROFILE_PICTURE');
            $file->move(public_path($file_location), $file_name);
            $user->profile_picture = $file_name;
        }
        $user->save();
        return $user;
        }
    }

    function delete($id) {
        $user = User::find($id);
        $user->delete();
        return $user;
    }
}
