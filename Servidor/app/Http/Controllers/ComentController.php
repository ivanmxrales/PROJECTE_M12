<?php

namespace App\Http\Controllers;

use App\Models\Coment;
use Illuminate\Http\Request;

class ComentController extends Controller
{
    function list()
    {
        if (Coment::all()->count() > 0) {
            $coments = Coment::all();
            return response()->json($coments);
        } else {
            return response()->json(['message' => 'No hay comentarios']);
        }
    }

    public function comentsPost($postId)
    {
        $coments = Coment::where('post_id', $postId)->get();

        return response()->json($coments);
    }


    function listPost()
    {
        if (Coment::all()->count() > 0) {
            $coments = Coment::all();
            return response()->json($coments);
        } else {
            return response()->json(['message' => 'No hay comentarios']);
        }
    }

    function search($id)
    {
        $coment = Coment::find($id);
        return response()->json($coment);
    }

    public function new(Request $request)
    {
        $validated = $request->validate([
            'coment' => 'required|min:1|max:250',
            'dataCom' => 'required|date',
            'user_id' => 'required|exists:users,id',
            'post_id' => 'required|exists:posts,id',
            'coment_id' => 'nullable|exists:coments,id',
        ]);

        $coment = Coment::create($validated);

        return response()->json($coment, 201);
    }

    public function delete($id)
    {
        $post = Coment::findOrFail($id);
        $post->delete();

        return response()->json([
            'message' => 'Post eliminado correctamente'
        ]);
    }

    public function edit(Request $request, $id)
    {
        $coment = Coment::find($id);

        if (!$coment) {
            return response()->json(['message' => 'Comentario no encontrado'], 404);
        }

        $validated = $request->validate([
            'coment' => 'required|min:1|max:250'
        ]);

        // Actualizar campos
        $coment->coment = $validated['coment'];

        $coment->save();

        return response()->json($coment);
    }
}