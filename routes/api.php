<?php

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('api.access')->group(function () {

// Your API routes go here
Route::post('login', [App\Http\Controllers\AuthController::class, 'login']);
Route::post('register', [App\Http\Controllers\AuthController::class, 'register']);
// Route::post('register', '\App\Http\Controllers\AuthController@register');
// Route::post('forgot_password', 'App\Http\Controllers\AuthController@forgot_password');

Route::middleware('auth:api')->group(function () {
    // UserController
    Route::post('user_profile_photo_update', [App\Http\Controllers\UserController::class, "user_profile_photo_update"]);
    Route::get('user_profile_info', [App\Http\Controllers\UserController::class, "user_profile_info"]);
    Route::post('user_profile_info_update', [App\Http\Controllers\UserController::class, "user_profile_info_update"]);
    Route::post('user_update_role', [App\Http\Controllers\UserController::class, "user_update_role"]);
    Route::post('user_deactivate', [App\Http\Controllers\UserController::class, "user_deactivate"]);
    Route::post('users_update_email', [App\Http\Controllers\UserController::class, "users_update_email"]);
    Route::post('users_update_password', [App\Http\Controllers\UserController::class, "users_update_password"]);
    Route::post('users_info_update_password', [App\Http\Controllers\UserController::class, "users_info_update_password"]);
    Route::apiResource('users', App\Http\Controllers\UserController::class);
    // END UserController

    // UserPermissionController
    Route::post('user_permission_status', [App\Http\Controllers\UserPermissionController::class, 'user_permission_status']);
    Route::apiResource('user_permission', App\Http\Controllers\UserPermissionController::class);
    // END UserPermissionController

    // ModuleController
    Route::apiResource('module', App\Http\Controllers\ModuleController::class);
    // END ModuleController

    // UserRolePermissionController
    Route::apiResource('user_role_permission', App\Http\Controllers\UserRolePermissionController::class);
    // END UserRolePermissionController

    // EmailTemplateController
    Route::post('email_template_multiple', [App\Http\Controllers\EmailTemplateController::class, 'email_template_multiple']);
    Route::apiResource('email_template', App\Http\Controllers\EmailTemplateController::class);
    // END EmailTemplateController

    // ProfileController
    Route::post('profile_update', [App\Http\Controllers\ProfileController::class, "profile_update"]);
    Route::post('profile_deactivate', [App\Http\Controllers\ProfileController::class, "profile_deactivate"]);
    Route::apiResource('profile', App\Http\Controllers\ProfileController::class);
    // END ProfileController

    // StudentExamResultController
    Route::post('student_exam_result_update', [App\Http\Controllers\StudentExamResultController::class, 'update_exam_result']);
    Route::post('student_exam_result', [App\Http\Controllers\StudentExamResultController::class, 'create_student']);
    Route::apiResource('student_exam_results', App\Http\Controllers\StudentExamResultController::class);
    // END StudentExamResultController

    // FACULTY LOAD

    // FacultyLoadMonitoringController
    Route::get('faculty_load_monitoring_graph2', [App\Http\Controllers\FacultyLoadMonitoringController::class, 'faculty_load_monitoring_graph2']);
    Route::get('faculty_load_monitoring_graph', [App\Http\Controllers\FacultyLoadMonitoringController::class, 'faculty_load_monitoring_graph']);
    Route::post('faculty_load_deduction', [App\Http\Controllers\FacultyLoadMonitoringController::class, 'faculty_load_deduction']);
    Route::post('faculty_load_monitoring_remarks', [App\Http\Controllers\FacultyLoadMonitoringController::class, 'faculty_load_monitoring_remarks']);
    Route::apiResource('faculty_load_monitoring', App\Http\Controllers\FacultyLoadMonitoringController::class);
    // END FacultyLoadMonitoringController

    // FacultyLoadController
    Route::post('faculty_load_status_bulk', [App\Http\Controllers\FacultyLoadController::class, 'faculty_load_status_bulk']);
    Route::post('faculty_load_status', [App\Http\Controllers\FacultyLoadController::class, 'faculty_load_status']);
    Route::post('faculty_load_update_room', [App\Http\Controllers\FacultyLoadController::class, 'faculty_load_update_room']);
    Route::post('faculty_load_upload', [App\Http\Controllers\FacultyLoadController::class, 'faculty_load_upload']);
    Route::post('faculty_load_report_print', [App\Http\Controllers\FacultyLoadController::class, 'faculty_load_report_print']);
    Route::apiResource('faculty_load', App\Http\Controllers\FacultyLoadController::class);
    // END FacultyLoadController

    // FacultyLoadMonitoringJustificationController
    Route::post('flm_justification_update_status', [App\Http\Controllers\FacultyLoadMonitoringJustificationController::class, 'flm_justification_update_status']);
    Route::post('flm_endorse_for_approval', [App\Http\Controllers\FacultyLoadMonitoringJustificationController::class, 'flm_endorse_for_approval']);
    Route::apiResource('flm_justification', App\Http\Controllers\FacultyLoadMonitoringJustificationController::class);
    // END FacultyLoadMonitoringJustificationController
    // END FACULTY LOAD

    // SCHEDULES
    // ScheduleController
    Route::apiResource('scheduling', App\Http\Controllers\ScheduleController::class);
    // END ScheduleController

    // ScheduleDayTimeController
    Route::apiResource('schedule_day_time', App\Http\Controllers\ScheduleDayTimeController::class);
    // END ScheduleDayTimeController
    // END SCHEDULES

    // SETTINGS
    Route::apiResource('user_role', App\Http\Controllers\UserRoleController::class);
    Route::apiResource('ref_building', App\Http\Controllers\RefBuildingController::class);
    Route::apiResource('ref_floor', App\Http\Controllers\RefFloorController::class);
    Route::apiResource('ref_room', App\Http\Controllers\RefRoomController::class);
    Route::apiResource('ref_department', App\Http\Controllers\RefDepartmentController::class);
    Route::apiResource('ref_status_category', App\Http\Controllers\RefStatusCategoryController::class);
    Route::apiResource('ref_status', App\Http\Controllers\RefStatusController::class);
    Route::apiResource('ref_day_schedule', App\Http\Controllers\RefDayScheduleController::class);
    Route::apiResource('ref_time_schedule', App\Http\Controllers\RefTimeScheduleController::class);
    Route::apiResource('ref_subject', App\Http\Controllers\RefSubjectController::class);
    Route::apiResource('ref_section', App\Http\Controllers\RefSectionController::class);
    Route::apiResource('ref_rate', App\Http\Controllers\RefRateController::class);

    Route::apiResource('ref_semester', App\Http\Controllers\RefSemesterController::class);
    Route::apiResource('ref_school_year', App\Http\Controllers\RefSchoolYearController::class);

    Route::apiResource('ref_civilstatus', App\Http\Controllers\RefCivilStatusController::class);
    Route::apiResource('ref_nationality', App\Http\Controllers\RefNationalityController::class);
    Route::apiResource('ref_religion', App\Http\Controllers\RefReligionController::class);
    Route::apiResource('ref_language', App\Http\Controllers\RefLanguageController::class);
    Route::apiResource('ref_region', App\Http\Controllers\RefRegionController::class);
    Route::apiResource('ref_province', App\Http\Controllers\RefProvinceController::class);
    Route::apiResource('ref_municipality', App\Http\Controllers\RefMunicipalityController::class);
    Route::apiResource('ref_barangay', App\Http\Controllers\RefBarangayController::class);
    Route::apiResource('ref_school_level', App\Http\Controllers\RefSchoolLevelController::class);
    Route::apiResource('ref_position', App\Http\Controllers\RefPositionController::class);
    // END SETTINGS
});

Route::get('faculty_load_report_print', [App\Http\Controllers\FacultyLoadMonitoringController::class, 'faculty_load_report_print']);

// });

function pp($data)
{
    echo '<pre>';
    print_r($data);
    echo '</pre>';
}
