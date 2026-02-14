<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\TranslationController;
use App\Http\Controllers\Api\PortfolioController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Admin Routes
    Route::prefix('admin')->middleware('can:admin')->group(function () {
        Route::apiResource('translations', TranslationController::class);

        // Portfolio Admin Routes
        Route::post('portfolio/settings', [PortfolioController::class, 'updateSettings']);
        
        // Polymorphic-style resources for portfolio items
        Route::get('portfolio/{type}', [PortfolioController::class, 'index']);
        Route::post('portfolio/{type}', [PortfolioController::class, 'store']);
        Route::put('portfolio/{type}/{id}', [PortfolioController::class, 'update']);
        Route::delete('portfolio/{type}/{id}', [PortfolioController::class, 'destroy']);
        Route::post('portfolio/{type}/reorder', [PortfolioController::class, 'reorder']);
    });
});

// Public Portfolio Routes
Route::get('/portfolio', [PortfolioController::class, 'index']);
