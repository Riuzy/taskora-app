<?php

namespace App\Http\Controllers\Api;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display a listing of users.
     */
    public function index(Request $request)
    {
        $query = User::query()
            ->with([
                'team',
                'managedTeam',
            ]);

        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('employee_id', 'like', "%{$search}%")
                    ->orWhere('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($request->filled('role')) {
            $query->where('role', $request->role);
        }

        if ($request->filled('team_id')) {
            $query->where('team_id', $request->team_id);
        }

        $users = $query
            ->orderBy('id', 'asc')
            ->paginate(10);

        return new UserCollection($users);
    }

    /**
     * Store a newly created user.
     */
    public function store(Request $request, User $user)
    {
        $validated = $request->validate([
            'employee_id' => [
                'required',
                'string',
                'max:20',
                Rule::unique('users', 'employee_id'),
            ],

            'name' => [
                'required',
                'string',
                'max:100',
            ],

            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email'),
            ],

            'password' => [
                'required',
                'min:8',
            ],

            'phone' => [
                'nullable',
                'string',
                'max:20',
            ],

            'address' => [
                'nullable',
                'string',
            ],

            'gender' => [
                'nullable',
                Rule::in(['male', 'female']),
            ],

            'birth_date' => [
                'nullable',
                'date',
            ],


            'is_active' => [
                'required',
                'boolean',
            ],
        ]);

        $user = User::create([
            'uuid' => Str::uuid(),

            'employee_id' => $validated['employee_id'],

            'name' => $validated['name'],

            'email' => $validated['email'],

            'password' => Hash::make($validated['password']),

            'phone' => $validated['phone'] ?? null,

            'address' => $validated['address'] ?? null,

            'gender' => $validated['gender'] ?? null,

            'birth_date' => $validated['birth_date'] ?? null,

            'role' => UserRole::Staff,

            'is_active' => $validated['is_active'],
        ]);

        $user->load([
            'team',
            'managedTeam',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'User created successfully.',
            'data' => new UserResource($user),
        ], 201);
    }

    /**
     * Display the specified user.
     */
    public function show(string $uuid)
    {
        $user = User::query()
            ->with([
                'team',
                'managedTeam',
            ])
            ->where('uuid', $uuid)
            ->firstOrFail();

        return new UserResource($user);
    }

    /**
     * Update the specified user.
     */
    public function update(Request $request, string $uuid)
    {
        $user = User::where('uuid', $uuid)
            ->firstOrFail();

        $validated = $request->validate([
            'employee_id' => [
                'required',
                'string',
                'max:20',
                Rule::unique('users', 'employee_id')
                    ->ignore($user->id),
            ],

            'name' => [
                'required',
                'string',
                'max:100',
            ],

            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')
                    ->ignore($user->id),

            ],

            'password' => [
                'nullable',
                'min:8',
            ],

            'phone' => [
                'nullable',
                'string',
                'max:20',
            ],

            'address' => [
                'nullable',
                'string',
            ],

            'gender' => [
                'nullable',
                Rule::in(['male', 'female']),
            ],

            'birth_date' => [
                'nullable',
                'date',
            ],

            'is_active' => [
                'required',
                'boolean',
            ],
        ]);

        $user->employee_id = $validated['employee_id'];
        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->phone = $validated['phone'] ?? null;
        $user->address = $validated['address'] ?? null;
        $user->gender = $validated['gender'] ?? null;
        $user->birth_date = $validated['birth_date'] ?? null;
        $user->is_active = $validated['is_active'];

        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        $user->load([
            'team',
            'managedTeam',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'User updated successfully.',
            'data' => new UserResource($user),
        ]);
    }

    /**
     * Remove the specified user.
     */
    public function destroy(string $uuid)
    {
        $user = User::where('uuid', $uuid)
            ->firstOrFail();

        // Jangan izinkan menghapus manager yang masih mengelola tim
        if ($user->managedTeam()->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'This user is currently assigned as a team manager.',
            ], 422);
        }

        // Bebaskan unique employee_id dan email
        $user->employee_id =
            'deleted_' . time() . '_' . $user->employee_id;

        $user->email =
            'deleted_' . time() . '_' . $user->email;

        $user->save();

        // Soft Delete
        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'User deleted successfully.',
        ]);
    }

    /**
     * Get available staff (without team).
     */
    public function available(Request $request)
    {
        $users = User::query()
            ->where('role', UserRole::Staff)
            ->whereNull('team_id')
            ->orderBy('employee_id')
            ->paginate(
                $request->integer('per_page', 10)
            );

        return new UserCollection($users);
    }
}
