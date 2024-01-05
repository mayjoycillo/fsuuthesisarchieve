<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function module_buttons()
    {
        return $this->hasMany(ModuleButton::class, "module_id");
    }
}