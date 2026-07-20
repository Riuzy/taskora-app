<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class TeamMemberCollection extends ResourceCollection
{
    public function toArray(Request $request): array
    {
        return TeamMemberResource::collection(
            $this->collection
        )->resolve();
    }

    public function with(Request $request): array
    {
        return [
            'success' => true,
            'message' => 'Team members retrieved successfully.',
        ];
    }
}
