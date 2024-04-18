<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\RevenueController;
// use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::get('/csrf-cookie', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});

// Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
// Route::post('/login', [AuthController::class, 'login']);

// require __DIR__.'/auth.php';

Route::middleware('auth:sanctum')->group(function () {
    

    // User routes
    // Route::get('/users', [UserController::class, 'index']);
    // Route::post('/users', [UserController::class, 'store']);
    // Route::get('/users/{user}', [UserController::class, 'show']);
    // Route::put('/users/{user}', [UserController::class, 'update']);
    // Route::delete('/users/{user}', [UserController::class, 'destroy']);


    // Revenue routes
    // Route::apiResource('revenues', RevenueController::class);

    // dashboard

    Route::get('/dashboard', [DashboardController::class, 'index']);

});




