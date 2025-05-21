<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use DateTime;
use Illuminate\Support\Str;

class PostController extends Controller
{

    public function list()
    {
        $posts = Post::all();
        return response()->json($posts);
    }

    // Obtener un post específico
    public function search($id)
    {
        $post = Post::findOrFail($id);
        return response()->json($post);
    }

    public function new(Request $request)
    {
        $validate = $request->validate([
            'title' => 'required|min:2|max:20',
            'location' => 'required|min:2|max:20',
            'description' => 'nullable|max:250',
            'data_hora' => 'nullable|date',
            'caducidad' => 'nullable|date|after_or_equal:data_hora',
            'user_id' => 'required|exists:users,id',
            'media' => 'required|array',
            'media.*' => 'file|mimes:jpg,jpeg,png,mp4,mov,avi|max:10240', // Permite imágenes y videos hasta 10MB
        ]);

        $data_hora = $request->input('data_hora', now());

        $post_title = Str::slug($request->title); // Convierte el título en un formato adecuado para los nombres de archivo (sin espacios, etc.)

        $media_files = [];
        $file_location = env('POST_PICTURES');

        if ($request->hasFile('media')) {
            foreach ($request->file('media') as $index => $file) {
                // Generar un nombre único para el archivo
                $file_extension = $file->getClientOriginalExtension(); // Obtener la extensión original del archivo
                $new_file_name = $post_title . '-' . ($index + 1) . '.' . $file_extension; // Nombre basado en el título y el índice del archivo

                // Almacenar el archivo con el nuevo nombre
                $file_path = $file->storeAs($file_location, $new_file_name,"public"); // Usa storeAs para especificar el nombre del archivo

                
                 $file->move(public_path($file_location), $new_file_name,"public"); // Mueve el archivo a la carpeta especificada
                // // Guardar la URL pública del archivo
                 $media_files[] = $file_path;
            }
        }

        $post = Post::create([
            'title' => $request->title,
            'location' => $request->location,
            'description' => $request->description,
            'data_hora' => $data_hora,
            'caducidad' => $request->caducidad,
            'user_id' => $request->user_id,
            'media' => !empty($media_files) ? json_encode(array_values($media_files)) : null, // Guarda null si no hay archivos
        ]);

        return response()->json([
            'message' => 'Post creado exitosamente',
            'post' => $post
        ], 201);
    }

    //// EDITAR

    public function edit(Request $request, $id)
{
    $post = Post::findOrFail($id);

    $request->validate([
        'title' => 'nullable|min:2|max:20',
        'location' => 'nullable|min:2|max:20',
        'description' => 'nullable|max:250',
        'media' => 'nullable|array', // URLs de medios que el usuario quiere conservar
        'media.*' => 'string',
        'new_media' => 'nullable|array', // Nuevos archivos que el usuario sube
        'new_media.*' => 'file|mimes:jpg,jpeg,png,mp4,mov,avi|max:10240',
    ]);

    $file_location = env('POST_PICTURES', 'uploads/media'); // fallback si la variable no está definida
    $public_path = public_path($file_location);

    // Asegurarse de que la carpeta exista
    if (!file_exists($public_path)) {
        mkdir($public_path, 0755, true);
    }

    $original_media = $post->media ? json_decode($post->media, true) : [];
    $updated_media = $request->input('media', []);

    // Detectar qué archivos se han eliminado
    $deleted_media = array_diff($original_media, $updated_media);

    foreach ($deleted_media as $url) {
        $absolutePath = public_path($url); // Elimina desde public/
        if (file_exists($absolutePath)) {
            unlink($absolutePath);
        }
    }

    // Agregar nuevos archivos
    if ($request->hasFile('new_media')) {
        foreach ($request->file('new_media') as $index => $file) {
            $extension = $file->getClientOriginalExtension();
            $filename = Str::slug($request->input('title', $post->title)) . '-' . (count($updated_media) + $index + 1) . '.' . $extension;

            $file->move($public_path, $filename); // Mueve el archivo al sistema de archivos real
            $updated_media[] = $file_location . '/' . $filename; // Ruta accesible desde el navegador
        }
    }

    // Actualizar el post
    $post->update([
        'title' => $request->has('title') ? $request->title : $post->title,
        'location' => $request->has('location') ? $request->location : $post->location,
        'description' => $request->has('description') ? $request->description : $post->description,
        'media' => !empty($updated_media) ? json_encode(array_values($updated_media)) : null,
    ]);

    return response()->json([
        'message' => 'Post actualizado exitosamente',
        'post' => $post
    ], 200);
}

    // Eliminar un post
public function delete($id)
{
    $post = Post::findOrFail($id);

    // Eliminar archivos vinculados si existen
    if ($post->media) {
    $mediaFiles = json_decode($post->media, true);

    foreach ($mediaFiles as $url) {
        $absolutePath = public_path($url); // $url es algo como /uploads/media/archivo.jpg

        if (file_exists($absolutePath)) {
            unlink($absolutePath); // Elimina el archivo del disco
        }
    }
}

    // Eliminar el post de la base de datos
    $post->delete();

    return response()->json([
        'message' => 'Post e imatges eliminades correctament'
    ]);
}

    public function postsUser($user_id)
    {
        $posts = Post::where('user_id', $user_id)->get();
        return response()->json($posts);
    }

    public function countPosts($user_id) {
        $posts = Post::where('user_id', $user_id)->get();
        return count($posts);
    }
    
    public function postsSearch($title)
    {
        $posts = Post::where('title', 'LIKE', '%' . $title . '%')->get();
        return response()->json($posts);
    }


    public function postsFollowers(Request $request)
    {

        $userId = $request->input('idUser');
        if (!$userId) {
            return response()->json(['error' => 'User ID is required'], 400);
        }
        $user = User::findOrFail($userId);
        $seguidos = $user->following()->pluck('user_id')->toArray();

        
        $posts = Post::whereIn('user_id', $seguidos)->get();
        return response()->json($posts);
    }

    public function postsCaducados()
    {
        $posts = Post::where('caducidad', '<', now())->get();
        return response()->json($posts);
    }

    public function getUserPosts($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'Usuari no trobat'], 404);
        }
        $followed = $user->following;
        $img_location = env('USERS_PROFILE_PICTURE');
        foreach ($followed as $user) {
            $user->profile_picture = url($img_location . '/' . $user->profile_picture);
        }
        
        return response()->json($followed);
    }
}


// public function edit(Request $request, $id)
// {
//     // Buscar el post por su ID
//     $post = Post::findOrFail($id);

//     // Validar los campos editables
//     $validate = $request->validate([
//         'title' => 'nullable|min:2|max:20',  // Título puede no ser enviado
//         'location' => 'nullable|min:2|max:20',  // Ubicación puede no ser enviada
//         'description' => 'nullable|max:250',  // Descripción es opcional
//         'media' => 'nullable|array', // Media puede ser nula, pero si existe, debe ser un array
//         'media.*' => 'file|mimes:jpg,jpeg,png,mp4,mov,avi|max:10240', // Validación de archivos
//     ]);

//     // Si se adjuntan nuevos archivos, procesarlos
//     $media_files = $post->media ? json_decode($post->media, true) : [];

//     if ($request->hasFile('media')) {
//         foreach ($request->file('media') as $index => $file) {
//             // Generar un nombre único para el archivo
//             $file_extension = $file->getClientOriginalExtension(); // Obtener la extensión original
//             $new_file_name = Str::slug($post->title) . '-' . (count($media_files) + $index + 1) . '.' . $file_extension; // Nombre único para el archivo

//             // Almacenar el archivo con el nuevo nombre
//             $file_path = $file->storeAs('uploads/media', $new_file_name, 'public');

//             // Guardar la URL pública del archivo
//             $media_files[] = Storage::url($file_path);
//         }
//     }

//     // Actualizar los campos editables
//     $post->update([
//         'title' => $request->has('title') ? $request->title : $post->title,  // Solo actualizar si se envió un nuevo título
//         'location' => $request->has('location') ? $request->location : $post->location,  // Solo actualizar si se envió una nueva ubicación
//         'description' => $request->has('description') ? $request->description : $post->description,  // Solo actualizar si se envió una nueva descripción
//         'media' => !empty($media_files) ? json_encode($media_files) : null,  // Actualizar media si se cargaron nuevos archivos
//     ]);

//     return response()->json([
//         'message' => 'Post actualizado exitosamente',
//         'post' => $post
//     ], 200);
// }
