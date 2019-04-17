<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user()->makeHidden(['job', 'attendances']);
});
Route::middleware('auth:api')->group(function () {
    Route::get('/users/create', 'UserController@create');
    Route::get('/user/{user}/attendances', 'UserController@attendances');
    Route::apiResource('/attendances', 'AttendanceController')->only('index');
    Route::apiResources([
        '/users' => 'UserController',

    ]);
});