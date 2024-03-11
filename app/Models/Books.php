<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Books extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function authors()
    {
        return $this->hasMany(Author::class, "book_id");
    }

    public function ref_departments()
    {
        return $this->belongsTo(RefDepartment::class, "department_id");
    }

    public function attachments()
    {
        return $this->morphMany(Attachment::class, 'attachmentable');
    }
}
