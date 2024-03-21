<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        // Attempt to authenticate the user
        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();

            // Generate a new Sanctum token for the user
            $token = $user->createToken('API Token')->plainTextToken;

            // Return the token and user information
            return response()->json([
                'user' => $user,
                'token' => $token,
            ]);
        }

        // Authentication failed
        return response()->json(['message' => 'Invalid credentials'], 401);
    }
}