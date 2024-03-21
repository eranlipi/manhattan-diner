<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Invoice;


class InvoiceController extends Controller
{
  
    // Method to create a new invoice
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'amount' => 'required|numeric',
            'description' => 'required|string',
            'month' => 'required|integer',
            'year' => 'required|integer',
            'image' => 'nullable|image|max:2048',
            
        ]);

        $invoice = new Invoice();
        $invoice->user_id = $request->user_id;
        $invoice->number = $request->number; // Make sure this input is coming from the request
        $invoice->amount = $request->amount;
        $invoice->description = $request->description;
        $invoice->month = $request->month;
        $invoice->year = $request->year;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('public/invoices/' . $invoice->year . '/' . $invoice->month);
            $invoice->image = $path;
        }

        $invoice->save();

        return response()->json($invoice, 201);
    }
    public function update(Request $request, $id)
{
    $request->validate([
        'number' => 'required|string',
        // other validations
        'image' => 'nullable|image|max:2048', // Validate the image
    ]);

    $invoice = Invoice::find($id);
    if (!$invoice) {
        return response()->json(['message' => 'Invoice not found'], 404);
    }

    // Set other fields
    $invoice->number = $request->number;
    $invoice->user_id = $request->user_id;
    $invoice->amount = $request->amount;
    $invoice->description = $request->description;
    $invoice->month = $request->month;
    $invoice->year = $request->year;
    if ($request->hasFile('image')) {
        // Delete old image if exists
        if ($invoice->image) {
            Storage::delete($invoice->image);
        }

        $path = $request->file('image')->store('public/invoices');
        $invoice->image = $path;
    }

    $invoice->save();

    return response()->json($invoice);
}



    public function destroy($id)
    {
        $invoice = Invoice::find($id);
    
        if (!$invoice) {
            return response()->json(['message' => 'Invoice not found'], 404);
        }
    
        $invoice->delete();
    
        return response()->json(['message' => 'Invoice deleted successfully']);
    }

    public function getInvoicesByMonthAndYear($year, $month)
    {
        $invoices = Invoice::where('year', $year)
        ->where('month', $month)
        ->get();

return response()->json($invoices);
    }
    public function getInvoicesByYear($year)
    {
        $invoices = Invoice::where('year', $year)->get();

        return response()->json($invoices);
    }


  
    // Method to get all invoices
    public function index()
    {
        $invoices = Invoice::all();
        return response()->json($invoices);
    }
}