<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeamDetailResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [

            'id' => $this->id,

            'uuid' => $this->uuid,

            'name' => $this->name,

            'description' => $this->description,

            'manager' => new UserResource(
                $this->whenLoaded('manager')
            ),

            'member_count' => $this->members_count,

            'members' => UserResource::collection(
                $this->whenLoaded('members')
            ),

            'created_at' => $this->created_at,

            'updated_at' => $this->updated_at,

        ];
    }
}
