<?php

namespace App\Http\Controllers;
use App\Models\Revenue;

use Illuminate\Http\Request;

class RevenueController extends Controller
{
    // List all revenues
    public function index()
    {
        $revenues = Revenue::all();
        return response()->json($revenues);
    }

    // Store a new revenue
    public function store(Request $request)
    {
        $request->validate([
            'category' => 'required|string',
            'amount' => 'required|numeric',
            'description' => 'nullable|string',
            'revenue_date' => 'required|date',
        ]);

        $revenue = Revenue::create($request->all());
        return response()->json($revenue, 201);
    }

    // Show a specific revenue
    public function show(Revenue $revenue)
    {
        return response()->json($revenue);
    }

    // Update a specific revenue
    public function update(Request $request, Revenue $revenue)
    {
        $request->validate([
            'category' => 'required|string',
            'amount' => 'required|numeric',
            'description' => 'nullable|string',
            'revenue_date' => 'required|date',
        ]);

        $revenue->update($request->all());
        return response()->json($revenue);
    }

    // Delete a specific revenue
    public function destroy(Revenue $revenue)
    {
        $revenue->delete();
        return response()->json(null, 204);
    }
}
