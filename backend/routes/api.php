<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\TaskActivityController;
use App\Http\Controllers\Api\TaskAttachmentController;
use App\Http\Controllers\Api\TaskCommentController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\TeamController;
use App\Http\Controllers\Api\TeamMemberController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {

    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {

        Route::get('/me', [AuthController::class, 'me']);

        Route::post('/logout', [AuthController::class, 'logout']);

    });

});

Route::middleware('auth:sanctum')->group(function () {

    Route::prefix('users')->group(function () {

        Route::get('/', [UserController::class, 'index']);
        Route::post('/', [UserController::class, 'store']);
        Route::get('/available', [UserController::class, 'available']);
        Route::get('/{uuid}', [UserController::class, 'show']);
        Route::put('/{uuid}', [UserController::class, 'update']);
        Route::delete('/{uuid}', [UserController::class, 'destroy']);

    });

    Route::prefix('teams')->group(function () {

        Route::get('/my-team', [TeamController::class, 'myTeam']);
        Route::get('/', [TeamController::class, 'index']);
        Route::post('/', [TeamController::class, 'store']);
        Route::get('/{uuid}', [TeamController::class, 'show']);
        Route::put('/{uuid}', [TeamController::class, 'update']);
        Route::delete('/{uuid}', [TeamController::class, 'destroy']);


        Route::get('/{uuid}/members', [TeamMemberController::class, 'index']);
        Route::post('/{uuid}/members', [TeamMemberController::class, 'store']);
        Route::delete('/{uuid}/members/{user}',[TeamMemberController::class, 'destroy']
        );

    });

    Route::prefix('projects')->group(function () {

        Route::get('/',[ProjectController::class, 'index']);
        Route::post('/',[ProjectController::class, 'store']);
        Route::get('/{uuid}',[ProjectController::class, 'show']);
        Route::put('/{uuid}',[ProjectController::class, 'update']);
        Route::delete('/{uuid}',[ProjectController::class, 'destroy']);

        Route::prefix('{project:uuid}/tasks')->group(function () {

            Route::get('/', [TaskController::class, 'index']);
            Route::post('/', [TaskController::class, 'store']);

            Route::get('{task:uuid}', [TaskController::class, 'show']);
            Route::put('{task:uuid}', [TaskController::class, 'update']);
            Route::delete('{task:uuid}', [TaskController::class, 'destroy']);

              Route::patch('{task:uuid}/status', [TaskController::class, 'updateStatus']);

            Route::get('{task:uuid}/comments', [TaskCommentController::class, 'index']);
            Route::post('{task:uuid}/comments', [TaskCommentController::class, 'store']);
            Route::delete('{task:uuid}/comments/{comment:uuid}',[TaskCommentController::class, 'destroy']);

            Route::get('{task:uuid}/attachments',[TaskAttachmentController::class, 'index']);
            Route::post('{task:uuid}/attachments',[TaskAttachmentController::class, 'store']);
            Route::delete('{task:uuid}/attachments/{attachment:uuid}',[TaskAttachmentController::class, 'destroy']);

            Route::get('{task:uuid}/activities', [TaskActivityController::class, 'index']);

        });
    });

});
