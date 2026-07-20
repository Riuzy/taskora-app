<?php

namespace App\Models;

use App\Enums\TaskActivityAction;
use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TaskActivity extends Model
{
    use HasFactory;
    use SoftDeletes;
    use HasUuid;

    protected $fillable = [
        'uuid',
        'task_id',
        'user_id',
        'action',
        'description',
        'old_value',
        'new_value',
    ];

    protected function casts(): array
    {
        return [
            'action' => TaskActivityAction::class,
        ];
    }

    public function task()
    {
        return $this->belongsTo(Task::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
