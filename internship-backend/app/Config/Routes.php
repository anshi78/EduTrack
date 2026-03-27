<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

$routes->group('api', function($routes) {
    $routes->post('register', 'Auth::register');
    $routes->post('login', 'Auth::login');
    $routes->get('users', 'Users::index', ['filter' => 'auth']);
    $routes->get('teachers', 'Teachers::index', ['filter' => 'auth']);
});

$routes->options('api/(:any)', static function () {
    return response()->setStatusCode(204);
});
