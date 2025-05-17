<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiController extends Controller
{
    protected $userController;
    protected $postController;
    protected $authController;
    protected $comentController;

    protected $likeController;
    

    public function __construct(UserController $userController,PostController $postController ,AuthController $authController, ComentController $comentController, LikeController $likeController)
    {
        $this->authController = $authController;
        $this->userController = $userController;
        $this->postController = $postController;
        $this->comentController = $comentController;
        $this->likeController = $likeController;
    }


    // Controller Users

    public function login(Request $request)
    {
        return $this->authController->login($request);
    }

    public function logout(Request $request) {
        return $this->authController->logout($request);
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

    public function searchUsername($username)
    {
        return $this->userController->searchUsername($username);
    }

    public function searchUsers(Request $request)
    {
        return $this->userController->searchUsers($request);
    }

    public function randomUsers()
    {
        return $this->userController->randomUsers();
    }

    public function followedUsers($id) {
        return $this->userController->followedUsers($id);
    }

    public function updateEmail(Request $request, $id)
    {
        return $this->userController->editEmail($request, $id);
    }

    public function updatePassword(Request $request, $id)
    {
        return $this->userController->editPassword($request, $id);
    }

    //// POSTS

    function getPostsUser($id)
    {
        return $this->userController->getPostsByUser($id);
    }

    function getIdByUsername($username)
    {
        return $this->userController->getIdByUsername($username);
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

    public function listPostsUser($id)
    {
        return $this->postController->postsUser($id);
    }

    public function searchPost($id)
    {
        return $this->postController->search($id);
    }

    public function createPost(Request $request)
    {
        return $this->postController->new($request);
        
    }

    // public function createPost(Request $request)
    // {
    // return $this->userController->register($request);
    // }
    public function updatePost(Request $request, $id)
    {
        return $this->postController->edit($request, $id);
    }

    public function deletePost($id)
    {
        return $this->postController->delete($id);
    }

    //Controller Coments
    public function listComents()
    {
        return $this->comentController->list();
    }

    public function listComentsPost()
    {
        return $this->comentController->list();
    }

    public function searchComent($id)
    {
        return $this->comentController->search($id);
    }

    public function createComent(Request $request)
    {
        return $this->comentController->new($request);
    }

    public function updateComent(Request $request, $id)
    {
        return $this->comentController->edit($request, $id);
    }

    public function deleteComent($id)
    {
        return $this->comentController->delete($id);
    }

    // likes

    public function listLikes()
    {
        return $this->likeController->list();
    }

    public function Liking($postId)
    {
        return $this->likeController->likePost($postId);
    }

    public function unLiking($postId)
    {
        return $this->likeController->unlikePost($postId);
    }

    public function hasLiked($postId)
    {
        return $this->likeController->hasLiked($postId);
    }

    public function likeCount($postId)
    {
        return $this->likeController->likeCount($postId);
    }
}
