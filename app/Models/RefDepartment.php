<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RefDepartment extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function profile_departments()
    {
        return $this->hasMany(RefDepartment::class, "department_id");
    }

    public function department_books()
    {
        return $this->hasMany(DepartmentBook::class, "department_book_id");
    }
}
