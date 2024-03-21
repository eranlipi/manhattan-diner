<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inventory;
use Picqer\Barcode\BarcodeGeneratorPNG;
use Illuminate\Support\Facades\Storage;

class BarcodeController extends Controller
{
    public function generateBarcode(Request $request, $inventoryId)
    {
        $inventory = Inventory::find($inventoryId);
        if (!$inventory) {
            return response()->json(['error' => 'Inventory item not found'], 404);
        }

        $generator = new BarcodeGeneratorPNG();
        $barcode = $generator->getBarcode($inventory->id, $generator::TYPE_CODE_128);

        $filename = 'barcodes/barcode_' . $inventory->id . '.png';
        Storage::disk('public')->put($filename, $barcode);

        $inventory->barcode_image = $filename;
        $inventory->save();

        return response()->json(['message' => 'Barcode generated', 'barcode' => asset(Storage::url($filename))]);
    }

    public function deleteBarcode($inventoryId)
    {
        $inventory = Inventory::find($inventoryId);
        if (!$inventory || !$inventory->barcode_image) {
            return response()->json(['error' => 'Barcode not found'], 404);
        }

        Storage::disk('public')->delete($inventory->barcode_image);
        $inventory->barcode_image = null;
        $inventory->save();

        return response()->json(['message' => 'Barcode deleted']);
    }


    public function getBarcode($inventoryId)
    {
        $inventory = Inventory::find($inventoryId);
        if (!$inventory || !$inventory->barcode_image) {
            return response()->json(['error' => 'Barcode not found'], 404);
        }

        $path = storage_path('app/public/' . $inventory->barcode_image);
        if (!File::exists($path)) {
            return response()->json(['error' => 'Barcode file does not exist'], 404);
        }

        return response()->download($path);
    }
        // Inside your InventoryController or a relevant controller
    public function updateInventory(Request $request)
    {
        $request->validate([
            'barcode' => 'required|string',
            // include other fields as necessary
        ]);

        $inventoryItem = Inventory::where('barcode', $request->barcode)->first();

        if (!$inventoryItem) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        // Update inventory logic here
        $inventoryItem->quantity -= 1; // Example logic
        $inventoryItem->save();

        return response()->json(['message' => 'Inventory updated']);
    }
}
