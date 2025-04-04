<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiController extends Controller
{
    protected $userController;
    protected $postController;

    public function __construct(UserController $userController, PostController $postController)
    {
        $this->userController = $userController;
        $this->postController = $postController;
    }


    // Controller Users

    public function listUsers()
    {
        return $this->userController->list();
    }

    public function searchUser($id)
    {
        return $this->userController->search($id);
    }

    public function createUser(Request $request)
    {
        return $this->userController->new($request);
    }

    public function updateUser(Request $request, $id)
    {
        return $this->userController->edit($request, $id);
    }

    public function deleteUser($id)
    {
        return $this->userController->delete($id);
    }

    

    //Controller Posts
    public function listPosts()
    {
        return $this->postController->list();
    }

    public function searchPost($id)
    {
        return $this->postController->search($id);
    }

    public function createPost(Request $request)
    {
        return $this->postController->new($request);
    }

    public function updatePost(Request $request, $id)
    {
        return $this->postController->edit($request, $id);
    }

    public function deletePost($id)
    {
        return $this->postController->delete($id);
    }
}
