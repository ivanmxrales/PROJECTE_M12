<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use DateTime;

class PostController extends Controller
{

    public function list()
    {
        $posts = Post::all();
        return response()->json($posts);
    }

    // Obtener un post específico
    public function show($id)
    {
        $post = Post::findOrFail($id);
        return response()->json($post);
    }

    // Crear un nuevo post
    public function new(Request $request)
    {
        $validate = $request->validate([
            'title' => 'required|min:2|max:20',
            'location' => 'min:2|max:20',
            'description' => 'max:250',
            'data_hora' => 'date',
            'caducidad' => 'date|after_or_equal:data_hora',
            'autor_id' => 'required|exists:users,id',
            'media' => 'array',
            'media.*' => 'url',
        ]);

        $post = Post::create([
            'title' => $request->title,
            'location' => $request->location,
            'description' => $request->description,
            'data_hora' => $request->data_hora,
            'caducidad' => $request->caducidad,
            'user_id' => $request->autor_id,
            'media' => $request->media,
        ]);

        return response()->json([
            'message' => 'Post creado exitosamente',
            'post' => $post
        ], 201);
    }

    // Editar un post
    public function edit(Request $request, $id)
    {
        $post = Post::findOrFail($id);

        $validate = $request->validate([
            'title' => 'required|min:2|max:20',
            'location' => 'min:2|max:20',
            'description' => 'max:250',
        ]);

        $post->update($validate);

        return response()->json([
            'message' => 'Post actualizado correctamente',
            'post' => $post
        ]);
    }

    // Eliminar un post
    public function delete($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();

        return response()->json([
            'message' => 'Post eliminado correctamente'
        ]);
    }
}


// function list()
//     {
//         $posts = Post::all();
//         return view('post.list', ['llibres' => $posts]);
//     }

//     public function new(Request $request)
//     {
//         if ($request->isMethod('post')) {
//             $validate = $request->validate([
//                 'title' => 'required|min:2|max:20',
//                 'location' => 'min:2|max:20',
//                 'description' => 'max:250',
//                 'data_hora' => 'date',
//             ]);
//             if ($validate) {
//                 // Create the new book
//                 $post = new Post;
//                 $post->title = $request->title;
//                 $post->location = $request->location;
//                 $post->description = $request->description;
//                 $post->data_hora = $request->data_hora;
//                 $post->caducidad = $request->caducidad;
//                 $post->autor_id = $request->autor_id;
//                 $post->save();

//                 $response = redirect()->route('post_list');
//             }

//             return $response;
//         }
//         return view('post.new');
//     }

//     public function edit(Request $request, $id)
//     {
//         $post = Post::findOrFail($id);

//         if ($request->isMethod('post')) {
//             $validate = $request->validate([
//                 'title' => 'required|min:2|max:20',
//                 'location' => 'min:2|max:20',
//                 'description' => 'max:250',
//             ]);

//             if ($validate) {
//                 $post->title = $request->title;
//                 $post->location = $request->location;
//                 $post->description = $request->description;
//                 $post->save();

//                 return redirect()->route('post_list');
//             }
//         }

//         return view('post.edit', compact('post'));
//     }


//     function delete($id)
//     {
//         $post = Post::find($id);
//         $post->delete();
//         return redirect()->route('llibre_list');
//     }
