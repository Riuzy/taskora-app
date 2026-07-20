<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskActivityResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'uuid' => $this->uuid,

            'action' => $this->action,

            'description' => $this->description,

            'old_value' => $this->old_value,

            'new_value' => $this->new_value,

            'user' => [
                'uuid' => $this->user->uuid,
                'name' => $this->user->name,
            ],

            'created_at' => $this->created_at,
        ];
    }
}
