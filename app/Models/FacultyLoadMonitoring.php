<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FacultyLoadMonitoring extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function faculty_load_monitoring_justification()
    {
        return $this->hasOne(FacultyLoadMonitoringJustification::class, "faculty_load_monitoring_id");
    }

    public function attachments()
    {
        return $this->morphMany(Attachment::class, 'attachmentable');
    }
}
