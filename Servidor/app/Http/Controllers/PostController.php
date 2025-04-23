<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use DateTime;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

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

        if ($request->hasFile('media')) {
            foreach ($request->file('media') as $index => $file) {
                // Generar un nombre único para el archivo
                $file_extension = $file->getClientOriginalExtension(); // Obtener la extensión original del archivo
                $new_file_name = $post_title . '-' . ($index + 1) . '.' . $file_extension; // Nombre basado en el título y el índice del archivo

                // Almacenar el archivo con el nuevo nombre
                $file_path = $file->storeAs('uploads/media', $new_file_name, 'public'); // Usa storeAs para especificar el nombre del archivo

                // Guardar la URL pública del archivo
                $media_files[] = Storage::url($file_path);
            }
        }

        $post = Post::create([
            'title' => $request->title,
            'location' => $request->location,
            'description' => $request->description,
            'data_hora' => $data_hora,
            'caducidad' => $request->caducidad,
            'user_id' => $request->user_id,
            'media' => !empty($media_files) ? json_encode(array_values($media_files)): null, // Guarda null si no hay archivos
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

    $original_media = $post->media ? json_decode($post->media, true) : [];
    $updated_media = $request->input('media', []);

    // Detectar qué archivos se han eliminado
    $deleted_media = array_diff($original_media, $updated_media);

    foreach ($deleted_media as $url) {
        // Quitar el prefijo /storage/ para obtener la ruta relativa dentro del disco 'public'
        $relativePath = str_replace('/storage/', '', $url);

        if (Storage::disk('public')->exists($relativePath)) {
            Storage::disk('public')->delete($relativePath);
        }
    }

    // Agregar nuevos archivos si se subieron
    if ($request->hasFile('new_media')) {
        foreach ($request->file('new_media') as $index => $file) {
            $extension = $file->getClientOriginalExtension();
            $filename = Str::slug($post->title) . '-' . (count($updated_media) + $index + 1) . '.' . $extension;
            $path = $file->storeAs('uploads/media', $filename, 'public');
            $updated_media[] = Storage::url($path);
        }
    }

    // Actualizar los campos del post
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
        $post->delete();

        return response()->json([
            'message' => 'Post eliminado correctamente'
        ]);
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
