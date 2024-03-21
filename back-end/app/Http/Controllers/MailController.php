<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\InvoiceMail;
use App\Models\Invoice;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function sendInvoiceEmail(Request $request, $invoiceId)
    {
     
        $invoice = Invoice::find($invoiceId);
        if (!$invoice) {
            return response()->json(['message' => 'Invoice not found'], 404);
        }
        $email = $request->email ?? 'eranlips@gmail.com';
        Mail::to($email)->send(new InvoiceMail($invoice));
    
        return response()->json(['message' => 'Email sent successfully to ' . $email]);
    }
    
}
