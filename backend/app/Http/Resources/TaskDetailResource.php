<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskDetailResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [

            'uuid' => $this->uuid,

            'title' => $this->title,

            'description' => $this->description,

            'status' => $this->status->value,

            'status_label' => $this->status->label(),

            'priority' => $this->priority->value,

            'priority_label' => $this->priority->label(),

            'start_date' => $this->start_date?->toDateString(),

            'due_date' => $this->due_date?->toDateString(),

            'completed_at' => $this->completed_at,

            'created_at' => $this->created_at,

            'updated_at' => $this->updated_at,

            /*
            |--------------------------------------------------------------------------
            | User
            |--------------------------------------------------------------------------
            */

            'assignee' => new UserSummaryResource(
                $this->whenLoaded('assignee')
            ),

            'creator' => new UserSummaryResource(
                $this->whenLoaded('creator')
            ),

            /*
            |--------------------------------------------------------------------------
            | Relations
            |--------------------------------------------------------------------------
            */

            'comments' => CommentResource::collection(
                $this->whenLoaded('comments')
            ),

            'attachments' => AttachmentResource::collection(
                $this->whenLoaded('attachments')
            ),

            'activities' => TaskActivityResource::collection(
                $this->whenLoaded('activities')
            ),

        ];
    }
}
