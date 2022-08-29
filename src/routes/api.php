<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
Route::post('login', [\App\Http\Controllers\AuthController::class, 'login']);
Route::get('articles', [\App\Http\Controllers\ArticleController::class, 'index']);
Route::get('article/{id}', [\App\Http\Controllers\ArticleController::class, 'show']);
Route::group(['prefix' => 'user', 'middleware' => 'auth:sanctum'], function () {
    Route::post('article', [\App\Http\Controllers\ArticleController::class, 'store']);
    Route::put('article/{id}', [\App\Http\Controllers\ArticleController::class, 'update']);
    Route::delete('article/{id}', [\App\Http\Controllers\ArticleController::class, 'destroy']);
});
