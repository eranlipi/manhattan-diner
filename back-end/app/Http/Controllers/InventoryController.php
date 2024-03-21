<?php

namespace App\Http\Controllers;


use App\Models\Inventory;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public $id , $inventoryItem; 

    public function show($id)
{
    $inventoryItem = Inventory::find($id);

    if (!$inventoryItem) {
        return response()->json(['message' => 'Inventory item not found'], 404);
    }

    return response()->json($inventoryItem);
}

public function update(Request $request, $id)
{
    $inventoryItem = Inventory::find($id);

    if (!$inventoryItem) {
        return response()->json(['message' => 'Inventory item not found'], 404);
    }

    $request->validate([
        'name' => 'required',
        'quantity' => 'required|integer',
        'price' => 'required|numeric',
    ]);

    $inventoryItem->name = $request->name;
    $inventoryItem->quantity = $request->quantity;
    $inventoryItem->price = $request->price;
    $inventoryItem->save();

    return response()->json($inventoryItem);
}

    // Method to add a new inventory item
    public function store(Request $request){
        $request->validate([
            'name' => 'required',
            'quantity' => 'required|integer',
            'price' => 'required|numeric',
        ]);

        $inventory = new Inventory();
        $inventory->name = $request->name;
        $inventory->quantity = $request->quantity;
        $inventory->price = $request->price;
        $inventory->save();

        return response()->json($inventory, 201);
    }
    
    public function destroy($id){
        $inventory = Inventory::find($id);

        if (!$inventory) {
            return response()->json(['message' => 'Inventory item not found'], 404);
        }

        $inventory->delete();

        return response()->json(['message' => 'Inventory item deleted successfully']);
    }

    // Method to get all inventory items
    public function index()
    {
        $inventoryItems = Inventory::all();
        return response()->json($inventoryItems);
    }
}