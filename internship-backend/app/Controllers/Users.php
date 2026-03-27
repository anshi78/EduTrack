<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\AuthUserModel;

class Users extends ResourceController
{
    protected $format = 'json';

    public function index()
    {
        $userModel = new AuthUserModel();
        $users = $userModel->select('id, email, first_name, last_name, created_at')
            ->orderBy('id', 'DESC')
            ->findAll();

        return $this->respond($users);
    }
}
