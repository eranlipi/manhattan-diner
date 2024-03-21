<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{

    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    // Create a new user
    public function register(Request $request)
    {
        
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'phone' => 'nullable|string'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'phone' => $request->phone,
        ]);
        $token = $user->createToken('app-token')->plainTextToken;

       

        return response()->json(['user'=>$user,'token'=>$token], 201);
    }

    // Get a single user
    public function show(User $user)
    {
        return response()->json($user->load('roles'));
    }

    // Update a user
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'string',
            'email' => 'email|unique:users,email,' . $user->id,
            'password' => 'string|min:6',
            'role_id' => 'exists:roles,id',
            'phone' => 'nullable|string'
        ]);

        $user->update($request->only(['name', 'email', 'password' , 'phone']));

        if ($request->has('role_id')) {
            $user->roles()->sync($request->role_id);
        }

        return response()->json($user);
    }

    // Delete a user
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(null, 204);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        return response()->json(['token' => $user->createToken('API Token')->plainTextToken]);
    }

}