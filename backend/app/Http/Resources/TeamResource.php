<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeamResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'uuid' => $this->uuid,

            'name' => $this->name,

            'description' => $this->description,

            'is_active' => $this->is_active,

            'manager' => $this->whenLoaded(
                'manager',
                fn () => new UserResource($this->manager)
            ),

            'members' => UserResource::collection(
                $this->whenLoaded('members')
            ),

            'members_count' => $this->whenCounted('members'),

            'created_at' => $this->created_at,

            'updated_at' => $this->updated_at,
        ];
    }
}
