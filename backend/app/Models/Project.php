<?php

namespace App\Models;

use App\Enums\ProjectStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Project extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [

        'uuid',

        'team_id',

        'created_by',

        'code',

        'name',

        'description',

        'status',

        'start_date',

        'end_date',

        'is_active',

    ];

    protected function casts(): array
    {
        return [

            'status' => ProjectStatus::class,

            'start_date' => 'date',

            'end_date' => 'date',

            'is_active' => 'boolean',

        ];
    }

    public function team()
    {
        return $this->belongsTo(
            Team::class
        );
    }

    public function creator()
    {
        return $this->belongsTo(
            User::class,
            'created_by'
        );
    }

    public function tasks()
    {
        return $this->hasMany(
            Task::class
        );
    }
}