<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Revenue;
use App\Models\Expense;
use App\Models\User;
use App\Models\Invoice;
// Assuming Barcode is a model you have
use App\Models\Barcode;

class DashboardController extends Controller
{
    public function index()
    {
        $revenueTotal = Revenue::sum('amount');
        $expenseTotal = Expense::sum('amount');
        $userCount = User::count();
        $invoiceCount = Invoice::count();
        $barcodeCount = Barcode::count(); // Assuming you have a countable aspect of barcodes

        return response()->json([
            'revenueTotal' => $revenueTotal,
            'expenseTotal' => $expenseTotal,
            'profit' => $revenueTotal - $expenseTotal,
            'userCount' => $userCount,
            'invoiceCount' => $invoiceCount,
            'barcodeCount' => $barcodeCount,
        ]);
    }
}
