<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TeamMemberCollection;
use App\Models\Team;
use App\Models\User;
use Illuminate\Http\Request;

class TeamMemberController extends Controller
{
    /**
     * Display team members.
     */
    public function index(string $uuid)
    {
        $team = Team::query()
            ->where('uuid', $uuid)
            ->firstOrFail();

        $members = $team->members()
            ->where('role', 'staff')
            ->orderBy('employee_id')
            ->get();
        return new TeamMemberCollection($members);
    }

    /**
     * Add members to team.
     */
    public function store(
        Request $request,
        string $uuid
    ) {
        $validated = $request->validate([
            'user_uuids' => [
                'required',
                'array',
                'min:1',
            ],

            'user_uuids.*' => [
                'required',
                'uuid',
                'exists:users,uuid',
            ],
        ]);

        $team = Team::query()
            ->where('uuid', $uuid)
            ->firstOrFail();

        User::query()
            ->whereIn('uuid', $validated['user_uuids'])
            ->update([
                'team_id' => $team->id,
            ]);

        return response()->json([
            'success' => true,
            'message' => 'Members added successfully.',
        ]);
    }

    /**
     * Remove member from team.
     */
    public function destroy(
        string $uuid,
        string $userUuid
    ) {
        $team = Team::query()
            ->where('uuid', $uuid)
            ->firstOrFail();

        $user = User::query()
            ->where('uuid', $userUuid)
            ->where('team_id', $team->id)
            ->firstOrFail();

        $user->update([
            'team_id' => null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Member removed successfully.',
        ]);
    }
}
