<?php

namespace App\Models;

use App\Enums\UserRole;
use App\Traits\HasUuid;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;
    use SoftDeletes;
    use HasUuid;

    protected $fillable = [
        'uuid',
        'team_id',
        'employee_id',
        'name',
        'email',
        'password',
        'phone',
        'address',
        'gender',
        'birth_date',
        'avatar',
        'role',
        'is_active',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
            'birth_date' => 'date',
            'is_active' => 'boolean',
            'role' => UserRole::class,
        ];
    }


    public function isManager(): bool
    {
        return $this->role === UserRole::Manager;
    }

    public function isStaff(): bool
    {
        return $this->role === UserRole::Staff;
    }


    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function managedTeam()
    {
        return $this->hasOne(
            Team::class,
            'manager_id'
        );
    }

    public function createdProjects()
    {
        return $this->hasMany(
            Project::class,
            'created_by'
        );
    }

    public function assignedTasks()
    {
        return $this->hasMany(Task::class, 'assignee_id');
    }

    public function createdTasks()
    {
        return $this->hasMany(Task::class, 'created_by');
    }

    public function taskComments()
    {
        return $this->hasMany(TaskComment::class);
    }

    public function taskAttachments()
    {
        return $this->hasMany(TaskAttachment::class);
    }

    public function taskActivities()
    {
        return $this->hasMany(TaskActivity::class);
    }
}