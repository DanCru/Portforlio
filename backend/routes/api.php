<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\TranslationController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Admin Routes
    Route::prefix('admin')->middleware('can:admin')->group(function () {
        Route::apiResource('translations', TranslationController::class);

        // Portfolio Admin Routes
        Route::post('portfolio/settings', [App\Http\Controllers\Api\Admin\PortfolioController::class, 'updateSettings']);
        
        // Polymorphic-style resources for portfolio items
        Route::get('portfolio/{type}', [App\Http\Controllers\Api\Admin\PortfolioController::class, 'index']);
        Route::post('portfolio/{type}', [App\Http\Controllers\Api\Admin\PortfolioController::class, 'store']);
        Route::put('portfolio/{type}/{id}', [App\Http\Controllers\Api\Admin\PortfolioController::class, 'update']);
        Route::delete('portfolio/{type}/{id}', [App\Http\Controllers\Api\Admin\PortfolioController::class, 'destroy']);
        Route::post('portfolio/{type}/reorder', [App\Http\Controllers\Api\Admin\PortfolioController::class, 'reorder']);
    });
});

// Public Portfolio Routes
Route::get('/portfolio', [App\Http\Controllers\Api\PortfolioController::class, 'index']);
