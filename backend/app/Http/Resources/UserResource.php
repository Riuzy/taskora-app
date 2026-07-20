<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [

            'uuid' => $this->uuid,

            'employee_id' => $this->employee_id,

            'name' => $this->name,

            'email' => $this->email,

            'phone' => $this->phone,

            'address' => $this->address,

            'avatar' => $this->avatar,

            'gender' => $this->gender,

            'birth_date' => optional($this->birth_date)->format('Y-m-d'),

            'role' => $this->role->value,

            'is_active' => $this->is_active,

            'team' => $this->whenLoaded('team', function () {
                return $this->team ? [
                    'uuid' => $this->team->uuid,
                    'name' => $this->team->name,
                ] : null;
            }),

            'managed_team' => $this->whenLoaded('managedTeam', function () {
                return $this->managedTeam ? [
                    'uuid' => $this->managedTeam->uuid,
                    'name' => $this->managedTeam->name,
                ] : null;
            }),

            'created_at' => $this->created_at,

            'updated_at' => $this->updated_at,

        ];
    }
}