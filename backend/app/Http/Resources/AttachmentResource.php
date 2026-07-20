<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AttachmentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'uuid' => $this->uuid,

            'original_name' => $this->original_name,

            'file_name' => $this->file_name,

            'extension' => $this->extension,

            'mime_type' => $this->mime_type,

            'size' => $this->size,

            'url' => asset('storage/' . $this->path),

            'uploaded_by' => $this->whenLoaded('user', function () {
                return [
                    'uuid' => $this->user->uuid,
                    'name' => $this->user->name,
                    'email' => $this->user->email,
                ];
            }),

            'created_at' => $this->created_at,
        ];
    }
}