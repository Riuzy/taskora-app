<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeamMemberResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
                'id' => $this->id,

                'user_id' => $this->user_id,

                'uuid' => $this->uuid,

                'employee_id' => $this->employee_id,

                'name' => $this->name,

                'email' => $this->email,

                'avatar' => $this->avatar,

                'role' => $this->role,

                'is_active' => $this->is_active,
            ];
    }
}