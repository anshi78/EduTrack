<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\TeacherModel;

class Teachers extends ResourceController
{
    protected $format = 'json';

    public function index()
    {
        $teacherModel = new TeacherModel();
        
        // Join with auth_user to get related basic user data based on user_id foreign key requirement
        $teachers = $teacherModel->select('teachers.*, auth_user.email, auth_user.first_name, auth_user.last_name')
            ->join('auth_user', 'auth_user.id = teachers.user_id')
            ->orderBy('teachers.id', 'DESC')
            ->findAll();

        return $this->respond($teachers);
    }
}
