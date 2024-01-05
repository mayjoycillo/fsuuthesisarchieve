<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Profile extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class, "user_id");
    }

    public function ref_civil_status()
    {
        return $this->belongsTo(RefCivilStatus::class, "civil_status_id");
    }

    public function ref_nationality()
    {
        return $this->belongsTo(RefNationality::class, "nationality_id");
    }

    public function student_exam_results()
    {
        return $this->hasMany(StudentExamResult::class, "profile_id");
    }

    public function profile_contact_informations()
    {
        return $this->hasMany(ProfileContactInformation::class, "profile_id");
    }

    public function profile_languages()
    {
        return $this->hasMany(ProfileLanguage::class, "profile_id");
    }

    public function profile_addresses()
    {
        return $this->hasMany(ProfileAddress::class, "profile_id");
    }

    public function profile_spouses()
    {
        return $this->hasMany(ProfileSpouse::class, "profile_id");
    }
    public function profile_childrens()
    {
        return $this->hasMany(ProfileChildren::class, "profile_id");
    }

    public function profile_departments()
    {
        return $this->hasMany(ProfileDepartment::class, "profile_id");
    }

    public function profile_parent_informations()
    {
        return $this->hasMany(ProfileParentInformation::class, "profile_id");
    }

    public function profile_work_experiences()
    {
        return $this->hasMany(ProfileWorkExperience::class, "profile_id");
    }

    public function profile_beneficiaries()
    {
        return $this->hasMany(ProfileBenificiary::class, "profile_id");
    }

    public function profile_training_certificates()
    {
        return $this->hasMany(ProfileTrainingCertificate::class, "profile_id");
    }

    public function profile_school_attendeds()
    {
        return $this->hasMany(ProfileSchoolAttended::class, "profile_id");
    }

    public function profile_others()
    {
        return $this->hasMany(ProfileOther::class, "profile_id");
    }

    public function attachments()
    {
        return $this->morphMany(Attachment::class, 'attachmentable');
    }
}