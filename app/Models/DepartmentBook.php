<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DepartmentBook extends Model
{
    use HasFactory, SoftDeletes;

    public function book()
    {
        return $this->belongsTo(Books::class, "book_id");
    }

    public function ref_department()
    {
        return $this->belongsTo(RefDepartment::class, "department_id");
    }
}
