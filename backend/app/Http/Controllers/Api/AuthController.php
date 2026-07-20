<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Login
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $user = User::query()
            ->with([
                'team',
                'managedTeam',
            ])
            ->where('email', $request->email)
            ->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {

            return response()->json([
                'success' => false,
                'message' => 'Invalid email or password.',
            ], 401);

        }

        if (! $user->is_active) {

            return response()->json([
                'success' => false,
                'message' => 'Your account has been deactivated.',
            ], 403);

        }

        // Optional: hanya satu device login
        $user->tokens()->delete();

        $token = $user
            ->createToken('auth_token')
            ->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login successful.',
            'data' => [
                'user' => new UserResource($user),
                'token' => $token,
            ],
        ]);
    }

    /**
     * Authenticated User
     */
    public function me(Request $request): JsonResponse
    {
        $user = $request->user()->load([
            'team',
            'managedTeam',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Authenticated user.',
            'data' => new UserResource($user),
        ]);
    }

    /**
     * Logout
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()
            ->currentAccessToken()
            ->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logout successful.',
        ]);
    }
}
