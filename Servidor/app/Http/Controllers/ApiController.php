<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiController extends Controller
{
    protected $userController;
    protected $authController;

    public function __construct(UserController $userController, AuthController $authController)
    {
        $this->authController = $authController;
        $this->userController = $userController;
    }

    // Controller Users

    public function login(Request $request)
    {
        return $this->authController->login($request);
    }

    public function signup(Request $request)
    {
        return $this->authController->signup($request);
    }
    public function listUsers()
    {
        return $this->userController->list();
    }

    public function searchUser($id)
    {
        return $this->userController->search($id);
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
        return $this->userController->list();
    }

    public function searchPost($id)
    {
        return $this->userController->search($id);
    }

    public function createPost(Request $request)
    {
        return $this->userController->register($request);
    }

    public function updatePost(Request $request, $id)
    {
        return $this->userController->edit($request, $id);
    }

    public function deletePost($id)
    {
        return $this->userController->delete($id);
    }
}
