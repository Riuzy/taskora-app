<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
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

            'assignee' => $this->whenLoaded('assignee', function () {
                return [
                    'id' => $this->assignee->id,

                    'uuid' => $this->assignee->uuid,

                    'name' => $this->assignee->name,

                    'email' => $this->assignee->email,
                ];
            }),

            'creator' => $this->whenLoaded('creator', function () {
                return [
                    'id' => $this->creator->id,

                    'uuid' => $this->creator->uuid,

                    'name' => $this->creator->name,

                    'email' => $this->creator->email,
                ];
            }),

            'start_date' => $this->start_date?->toDateString(),

            'due_date' => $this->due_date?->toDateString(),

            'comments' => CommentResource::collection(
                $this->whenLoaded('comments')
            ),

            'attachments' => AttachmentResource::collection(
                $this->whenLoaded('attachments')
            ),

            'activities' => TaskActivityResource::collection(
                $this->whenLoaded('activities')
            ),

            'comments_count' => $this->comments_count,

            'attachments_count' => $this->attachments_count,

            'completed_at' => $this->completed_at,

            'created_at' => $this->created_at,

            'updated_at' => $this->updated_at,
        ];
    }
}
