<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiController extends Controller
{
    protected $userController;

    public function __construct(UserController $userController)
    {
        $this->userController = $userController;
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
}
