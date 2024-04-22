<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\RevenueController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\InventoryController;
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


Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);



Route::middleware('auth:sanctum')->group(function () {


    
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{user}', [UserController::class, 'show']);
    Route::put('/users/{user}', [UserController::class, 'update']);
    Route::delete('/users/{user}', [UserController::class, 'destroy']);

    // invoices
    Route::get('/invoices', [InvoiceController::class, 'index']);
    Route::post('/invoices', [InvoiceController::class, 'store']);
    Route::get('/invoices/{year}/{month}', [InvoiceController::class, 'getInvoicesByMonthAndYear']);
    Route::get('/invoices/{year}', [InvoiceController::class, 'getInvoicesByYear']);
     Route::get('/invoices/{id}', [InvoiceController::class, 'getInvoicesById']);
    Route::delete('/invoices/{id}', [InvoiceController::class, 'destroy']);

    // barcode
    Route::post('/inventory/{inventoryId}/barcode', [BarcodeController::class, 'generateBarcode']);
    Route::delete('/inventory/{inventoryId}/barcode', [BarcodeController::class, 'deleteBarcode']);
    Route::get('/inventory/{inventoryId}/barcode', [BarcodeController::class, 'getBarcode']);
    Route::post('/inventory/update', [InventoryController::class, 'updateInventory']);
    Route::apiResource('expenses', ExpenseController::class);

    // producs
    Route::post('/product/{id}', [InventoryController::class, 'update']);
    Route::post('/product', [InventoryController::class, 'store']);
    Route::get('/products', [InventoryController::class, 'index']);
    Route::get('/product/{id}', [InventoryController::class, 'show']);
    Route::delete('/product/{id}', [InventoryController::class, 'destroy']);
   
    // inventory
    Route::get('/inventory', [InventoryController::class, 'index']);
    Route::post('/inventory', [InventoryController::class, 'store']);
 
    Route::delete('/inventory/{id}', [InventoryController::class, 'destroy']);



    // send email
    Route::post('/send-invoice-email/{invoiceId}', [MailController::class, 'sendInvoiceEmail']);

    Route::get('/dashboard', [DashboardController::class, 'index']);
});
