<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\AuthUserModel;
use App\Models\TeacherModel;
use Config\Database;

class Auth extends ResourceController
{
    protected $format = 'json';

    public function register()
    {
        $rules = [
            'email'           => 'required|valid_email|is_unique[auth_user.email]',
            'first_name'      => 'required|min_length[2]',
            'last_name'       => 'required|min_length[2]',
            'password'        => 'required|min_length[6]',
            'university_name' => 'required',
            'gender'          => 'required|in_list[Male,Female,Other]',
            'year_joined'     => 'required|numeric|exact_length[4]'
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $db = Database::connect();
        $db->transStart();

        try {
            $userModel = new AuthUserModel();
            $teacherModel = new TeacherModel();

            // Insert into auth_user
            $userId = $userModel->insert([
                'email'      => $this->request->getVar('email'),
                'first_name' => $this->request->getVar('first_name'),
                'last_name'  => $this->request->getVar('last_name'),
                'password'   => $this->request->getVar('password'),
            ]);

            // Insert into teachers
            $teacherModel->insert([
                'user_id'         => $userId,
                'university_name' => $this->request->getVar('university_name'),
                'gender'          => $this->request->getVar('gender'),
                'year_joined'     => $this->request->getVar('year_joined'),
            ]);

            $db->transComplete();

            if ($db->transStatus() === false) {
                return $this->failServerError('Failed to register user. Transaction aborted.');
            }

            return $this->respondCreated(['message' => 'User and Teacher registered successfully.']);
            
        } catch (\Exception $e) {
            $db->transRollback();
            return $this->failServerError($e->getMessage());
        }
    }

    public function login()
    {
        $rules = [
            'email'    => 'required|valid_email',
            'password' => 'required'
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $userModel = new AuthUserModel();
        $user = $userModel->where('email', $this->request->getVar('email'))->first();

        if (!$user || !password_verify($this->request->getVar('password'), $user['password'])) {
            return $this->failUnauthorized('Invalid email or password.');
        }

        helper('jwt');
        $token = getSignedJWTForUser($user['email']);

        return $this->respond(['message' => 'Login successful', 'token' => $token]);
    }
}
