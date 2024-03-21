<?php

namespace App\Http\Controllers;
use App\Models\Expense;

use Illuminate\Http\Request;

class ExpenseController extends Controller
{
     // Display a listing of the expenses
     public function index()
     {
         $expenses = Expense::all();
         return response()->json($expenses);
     }
 
     // Store a new expense
     public function store(Request $request)
     {
         $request->validate([
             'category' => 'required|string',
             'amount' => 'required|numeric',
             'description' => 'nullable|string',
             'expense_date' => 'required|date',
         ]);
 
         $expense = Expense::create($request->all());
 
         return response()->json($expense, 201);
     }
 
     // Update the specified expense
     public function update(Request $request, Expense $expense)
     {
         $request->validate([
             'category' => 'required|string',
             'amount' => 'required|numeric',
             'description' => 'nullable|string',
             'expense_date' => 'required|date',
         ]);
 
         $expense->update($request->all());
 
         return response()->json($expense);
     }
 
     // Remove the specified expense
     public function destroy(Expense $expense)
     {
         $expense->delete();
 
         return response()->json(null, 204);
     }
}
