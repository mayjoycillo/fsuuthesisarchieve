<?php

namespace App\Http\Controllers;

use App\Models\RefDepartment;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Str;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function formatSizeUnits($bytes)
    {
        if ($bytes >= 1073741824) {
            $bytes = number_format($bytes / 1073741824, 2) . ' GB';
        } elseif ($bytes >= 1048576) {
            $bytes = number_format($bytes / 1048576, 2) . ' MB';
        } elseif ($bytes >= 1024) {
            $bytes = number_format($bytes / 1024, 2) . ' KB';
        } elseif ($bytes > 1) {
            $bytes = $bytes . ' bytes';
        } elseif ($bytes == 1) {
            $bytes = $bytes . ' byte';
        } else {
            $bytes = '0 bytes';
        }

        return $bytes;
    }

    public function create_attachment($model, $file, $option)
    {
        $action = !empty($option['action']) ? $option['action'] : "";
        $id = !empty($option['id']) ? $option['id'] : "";
        $folder_name = !empty($option['folder_name']) ? $option['folder_name'] : null;
        $file_description = !empty($option['file_description']) ? $option['file_description'] : null;
        $root_folder = !empty($option['root_folder']) ? $option['root_folder'] : null;
        $file_type = !empty($option['file_type']) ? $option['file_type'] : null;

        if ($action == 'Add') {
            $filePathStr = "uploads/attachments";

            if (!empty($root_folder)) {
                $filePathStr .= "/" . ($root_folder);
            }
            if (!empty($folder_name)) {
                $filePathStr .= "/" . ($folder_name);
            }

            $fileName = $file->getClientOriginalName();
            $filePath = Str::random(10) . '.' . $file->getClientOriginalExtension();
            $filePath = $file->storeAs($filePathStr, $filePath, 'public');
            $fileSize = $this->formatSizeUnits($file->getSize());

            $model->attachments()->create([
                'file_name' => $fileName,
                'file_path' => "storage/" . $filePath,
                'file_size' => $fileSize,
                'file_description' => $file_description,
                'file_type' => $file_type
            ]);
        }
    }

    public function generate_school_id($type, $employment_type = null)
    {
        $school_id = "";
        $lastProfile = \App\Models\Profile::whereYear("created_at", date("Y"))->orderBy('id', 'desc')->first();

        if ($lastProfile) {
            $lastSchoolId = $lastProfile->school_id ? $lastProfile->school_id : "";
            $lastSchoolId = $lastSchoolId ? explode("-", $lastSchoolId) : [];
            $lastSchoolId = count($lastSchoolId) > 0 ? ($lastSchoolId[2] ? (int) $lastSchoolId[2] : 0) : 0;
            $lastSchoolId = $lastSchoolId + 1;

            if ($type == "employee") {
                $lastSchoolId = str_pad($lastSchoolId, 3, '0', STR_PAD_LEFT);
                $school_id = $employment_type[0] . "-" . date("y") . "-" . $lastSchoolId;
            } else {
                $lastSchoolId = $lastSchoolId + 1;
                $lastSchoolId = str_pad($lastSchoolId, 6, '0', STR_PAD_LEFT);
                $school_id = date("ym") . "-1-" . $lastSchoolId;
            }
        } else {
            if ($type == "employee") {
                $school_id = $employment_type[0] . "-" . date("y") . "-001";
            } else {
                $school_id = date("ym") . "-1-000001";
            }
        }

        return $school_id;
    }

    public function user_persmissions($user_id, $user_role_id)
    {
        if ($user_id != "" && $user_role_id != "") {
            $dataUserRolePermission = \App\Models\UserRolePermission::where('user_role_id', $user_role_id)
                ->get();

            foreach ($dataUserRolePermission as $key => $value) {
                $dataUserPermission = \App\Models\UserPermission::where('user_id', $user_id)
                    ->where('mod_button_id', $value->mod_button_id)
                    ->first();

                if ($dataUserPermission) {
                    $dataUserPermission->fill([
                        'status' => $value->status,
                        'updated_by' => auth()->user()->id
                    ])->save();
                } else {
                    \App\Models\UserPermission::create([
                        "user_id" => $user_id,
                        "mod_button_id" => $value->mod_button_id,
                        'status' => $value->status,
                        'created_by' => auth()->user()->id
                    ]);
                }
            }
        }
    }
}
