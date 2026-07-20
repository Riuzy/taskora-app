<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [

            'id' => $this->id,

            'uuid' => $this->uuid,

            'team' => $this->whenLoaded(
                'team',
                fn () => [
                    'id' => $this->team->id,
                    'uuid' => $this->team->uuid,
                    'name' => $this->team->name,
                ]
            ),

            'creator' => $this->whenLoaded(
                'creator',
                fn () => [
                    'id' => $this->creator->id,
                    'uuid' => $this->creator->uuid,
                    'name' => $this->creator->name,
                ]
            ),

            'code' => $this->code,

            'name' => $this->name,

            'description' => $this->description,

            'status' => $this->status->value,

            'status_label' => $this->status->label(),

            'start_date' => $this->start_date?->format('Y-m-d'),

            'end_date' => $this->end_date?->format('Y-m-d'),

            'is_active' => $this->is_active,

            'created_at' => $this->created_at,

            'updated_at' => $this->updated_at,

        ];
    }
}
