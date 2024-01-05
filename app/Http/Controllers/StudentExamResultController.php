<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\StudentExamResult;
use App\Models\User;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class StudentExamResultController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $fullname = "SELECT CONCAT(lastname, ', ', COALESCE(firstname, '')) FROM profiles WHERE profiles.user_id=users.id ORDER BY id LIMIT 1";

        $data = StudentExamResult::join('profiles', 'profiles.id', '=', 'student_exam_results.profile_id')
            ->join('users', 'users.id', '=', 'profiles.user_id')
            ->select([
                'users.*',
                'profiles.middlename',
                'profiles.name_ext',
                DB::raw("($fullname) fullname"),
                'student_exam_results.exam_date',
                'student_exam_results.exam_status',
                'student_exam_results.exam_result',
            ]);


        $data = $data->where(function ($query) use ($request, $fullname) {
            if ($request->search) {
                $query->orWhere(DB::raw("($fullname)"), 'LIKE', "%$request->search%");
                $query->orWhere(DB::raw("(email)"), 'LIKE', "%$request->search%");
            }
        });

        if ($request->from) {

            //students current & archived
            if ($request->from === "/students/current") {
                $data = $data->where(function ($query) {
                    $query->whereRaw("(SELECT IF(`role` = 'Student', 'Student Assistant', `role`) FROM user_roles WHERE user_roles.id = user_role_id) = 'Student Assistant'")
                        ->where("status", "Active");
                });
            } else if ($request->from === "/students/archived") {
                $data = $data->where(function ($query) {
                    $query->whereRaw("(SELECT IF(`role` = 'Student', 'Student Assistant', `role`) FROM user_roles WHERE user_roles.id = user_role_id) = 'Student Assistant'")
                        ->where("status", "Deactivated");
                });
            }
        }

        if ($request->sort_field && $request->sort_order) {
            if (
                $request->sort_field != '' && $request->sort_field != 'undefined' && $request->sort_field != 'null'  &&
                $request->sort_order != ''  && $request->sort_order != 'undefined' && $request->sort_order != 'null'
            ) {
                $data = $data->orderBy(isset($request->sort_field) ? $request->sort_field : 'id', isset($request->sort_order)  ? $request->sort_order : 'desc');
            }
        } else {
            $data = $data->orderBy('id', 'desc');
        }

        if ($request->page_size) {
            $data = $data->limit($request->page_size)
                ->paginate($request->page_size, ['*'], 'page', $request->page)
                ->toArray();
        } else {
            $data = $data->get();
        }

        Log::info($data);

        return response()->json([
            'success'   => true,
            'data'      => $data
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $ret = [
            "success" => true,
            "message" => "Data " . ($request->id ? "updated" : "created") . " successfully",
        ];

        $request->validate([
            'username' => [
                'required',
                Rule::unique('users')->ignore($request->id),
            ],
            'email' => [
                'required',
                Rule::unique('users')->ignore($request->id)
            ]
        ]);

        if ($request->id) {
            $ret = $this->update_student($request);
        } else {
            $ret = $this->create_student($request);;
        }

        return response()->json($ret, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\StudentExamResult  $studentExamResult
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // $studentExamResult = StudentExamResult::find($id);

        // if ($studentExamResult) {
        //     $data = [
        //         'exam_date' => $studentExamResult->exam_date,
        //         'exam_status' => $studentExamResult->exam_status,
        //         'exam_result' => $studentExamResult->exam_result,
        //         // add more fields as needed
        //     ];
        //     return response()->json($data, 200);
        // } else {
        //     return response()->json(['error' => 'Student exam result not found'], 404);
        // }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\StudentExamResult  $studentExamResult
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, StudentExamResult $studentExamResult)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\StudentExamResult  $studentExamResult
     * @return \Illuminate\Http\Response
     */
    public function destroy(StudentExamResult $studentExamResult)
    {
        //
    }

    public function create_student(Request $request)
    {
        $ret = [
            "success" => false,
            "message" => "Data not created",
        ];

        $error = false;

        $usersInfo = [
            "user_role_id" => 4,
            "username" => $request->username,
            "email" => $request->email,
            "password" => Hash::make($request->password),
            "created_by" => auth()->user()->id,
            "status" => 'Active',
        ];

        $findSchoolId = Profile::firstWhere('user_id', $request->user_id);

        if ($findSchoolId) {
            if ($findSchoolId->user_id != "") {
                $error = true;

                $ret = [
                    "success" => true,
                    "message" => "School ID already exist and already taken by other user",
                ];
            }
        }

        if ($error == false) {
            $createUser = User::create($usersInfo);

            if ($createUser) {
                $dataProfile = [
                    "user_id" => $createUser->id,
                    "school_id" => $request->school_id,

                    "firstname" => $request->firstname,
                    "middlename" => $request->middlename,
                    "lastname" => $request->lastname,
                    "name_ext" => $request->name_ext,
                    "birthplace" => $request->birthplace,

                    "blood_type" => $request->blood_type,
                    "height" => $request->height,
                    "weight" => $request->weight,

                    "gender" => $request->gender,
                    "religion_id" => $request->religion_id,
                    "civil_status_id" => $request->civil_status_id,
                    "nationality_id" => $request->nationality_id,
                ];


                $findProfilByUserId = \App\Models\Profile::where('user_id', $createUser->id)->first();

                $folder_name = "";

                if ($findProfilByUserId) {
                    if (!$findProfilByUserId->school_id) {
                        $dataProfile["school_id"] = $this->generate_school_id("employee");
                    }
                    if ($findProfilByUserId->folder_name) {
                        $folder_name = $findProfilByUserId->folder_name;
                    } else {
                        $folder_name = Str::random(10);
                        $dataProfile["folder_name"] = $folder_name;
                    }
                } else {
                    $dataProfile["school_id"] = $this->generate_school_id("employee");
                    $folder_name = Str::random(10);
                    $dataProfile["folder_name"] = $folder_name;
                }

                $profile_id = "";

                if ($findProfilByUserId) {
                    $profile_id = $findProfilByUserId->id;
                    $dataProfile["updated_by"] = auth()->user()->id;

                    $findProfilByUserIdUpdate = $findProfilByUserId->fill($dataProfile);
                    $findProfilByUserIdUpdate->save();

                    if ($request->hasFile('imagefile')) {
                        $this->create_attachment($findProfilByUserId, $request->file('imagefile'), [
                            "action" => "Add",
                            "root_folder" => "profiles",
                            "folder_name" => $folder_name,
                            "file_description" => "Profile",
                            "file_type" => "image",
                        ]);
                    }
                } else {
                    $dataProfile["created_by"] = auth()->user()->id;
                    $createProfile = \App\Models\Profile::create($dataProfile);

                    if ($createProfile) {
                        $profile_id = $createProfile->id;

                        if ($request->hasFile('imagefile')) {

                            $this->create_attachment($createProfile, $request->file('imagefile'), [
                                "action" => "Add",
                                "folder_name" => $folder_name,
                                "root_folder" => "profiles",
                                "file_description" => "Profile",
                                "file_type" => "image",
                            ]);
                        }
                    }
                }

                $contact_number = $request->contact_number;
                $language_id = $request->language_id;
                $address_list = $request->address_list;
                $school_attended_list = $request->school_attended_list;

                $exam_date = $request->exam_date;

                if ($profile_id != "") {
                    // Contact Information Update & Create
                    if ($contact_number != "") {
                        \App\Models\ProfileContactInformation::where("profile_id", $profile_id)->update(['status' => 0]);

                        $findContactInformation = \App\Models\ProfileContactInformation::where("contact_number", $contact_number)
                            ->where("profile_id", $profile_id)->first();

                        if ($findContactInformation) {
                            $findContactInformation->fill([
                                'status' => 1,
                                'created_by' => auth()->user()->id
                            ])->save();
                        } else {
                            \App\Models\ProfileContactInformation::create([
                                'contact_number' => $contact_number,
                                'category' => 'Student Contact Information',
                                "profile_id" => $profile_id,
                                'status' => 1,
                                'updated_by' => auth()->user()->id
                            ]);
                        }
                    }

                    // Language Update & Create
                    if (!empty($language_id)) {
                        foreach (json_decode($language_id) as $id) {
                            $findProfileLanguage = \App\Models\ProfileLanguage::where('language_id', $id)
                                ->where('profile_id', $profile_id)
                                ->first();

                            if ($findProfileLanguage) {
                                $findProfileLanguage->fill([
                                    "profile_id" => $profile_id,
                                    'language_id' => $id,
                                    "updated_by" => auth()->user()->id,
                                ])->save();
                            } else {
                                \App\Models\ProfileLanguage::create([
                                    "profile_id" => $profile_id,
                                    'language_id' => $id,
                                    "created_by" => auth()->user()->id,
                                ]);
                            }
                        }
                    }

                    // Address Update & Create
                    if (!empty($address_list)) {
                        foreach (json_decode($address_list, true) as $key => $value) {
                            if (!empty($value['id'])) {
                                $findAddress = \App\Models\ProfileAddress::find($value['id']);

                                $findAddress->fill([
                                    "profile_id" => $profile_id,
                                    'category' => "STUDENT ADDRESS",
                                    'address' => $value['address'] ?? null,
                                    'city_id' => $value['municipality_id'] ?? null,
                                    'is_home_address' => !empty($value['is_home_address']) && $value['is_home_address'] ? 1 : 0,
                                    'is_current_address' => !empty($value['is_current_address']) && $value['is_current_address'] ? 1 : 0,
                                    'updated_by' => auth()->user()->id
                                ])->save();
                            } else {
                                \App\Models\ProfileAddress::create([
                                    "profile_id" => $profile_id,
                                    'category' => "STUDENT ADDRESS",
                                    'address' => $value['address'] ?? null,
                                    'city_id' => $value['municipality_id'] ?? null,
                                    'is_home_address' => !empty($value['is_home_address']) && $value['is_home_address'] ? 1 : 0,
                                    'is_current_address' => !empty($value['is_current_address']) && $value['is_current_address'] ? 1 : 0,
                                    'created_by' => auth()->user()->id
                                ]);
                            }
                        }
                    }

                    // School Attended Update & Create
                    if (!empty($school_attended_list)) {
                        foreach (json_decode($school_attended_list, true) as $key => $value) {
                            if (!empty($value['id'])) {
                                $findSchool = \App\Models\ProfileSchoolAttended::find($value['id']);

                                $findSchool->fill([
                                    "profile_id" => $profile_id,
                                    'school_level_id' => $value['school_level_id'] ?? null,
                                    'school_name' => $value['school_name'] ?? null,
                                    'school_type' => $value['school_type'] ?? null,
                                    'year_graduated' => $value['year_graduated'] ?? null,
                                    'school_address' => $value['school_address'] ?? null,
                                    'updated_by' => auth()->user()->id
                                ])->save();
                            } else {

                                \App\Models\ProfileSchoolAttended::create([
                                    "profile_id" => $profile_id,
                                    'school_level_id' => $value['school_level_id'] ?? null,
                                    'school_name' => $value['school_name'] ?? null,
                                    'school_type' => $value['school_type'] ?? null,
                                    'year_graduated' => $value['year_graduated'] ?? null,
                                    'school_address' => $value['school_address'] ?? null,
                                    'created_by' => auth()->user()->id
                                ]);
                            }
                        }
                    }

                    // Student Exam Result Update & Create
                    if ($exam_date != "") {
                        \App\Models\StudentExamResult::where("profile_id", $profile_id);

                        $findStudentExamResult = \App\Models\StudentExamResult::where("exam_date", $exam_date)
                            ->where("profile_id", $profile_id)
                            ->first();

                        if ($findStudentExamResult) {
                            $findStudentExamResult->fill([
                                "updated_by" => auth()->user()->id,
                            ])->save();
                        } else {
                            \App\Models\StudentExamResult::create([
                                'exam_date' => new DateTime($exam_date),
                                'exam_status' => $request->exam_status,
                                'exam_result' => $request->exam_result,
                                "profile_id" => $profile_id,
                                "created_by" => auth()->user()->id,
                            ]);
                        }
                    }
                }

                $this->user_persmissions($createUser->id, $request->user_role_id);

                $ret = [
                    "success" => true,
                    "message" => "Data created successfully",
                ];
            }
        }
    }

    public function update_student(Request $request)
    {
        $ret = [
            "success" => false,
            "message" => "Data not updated",
        ];

        $usersInfo = [
            "user_role_id" => 4,
            "updated_by" => auth()->user()->id
        ];

        if ($request->password) {
            $usersInfo['password'] = Hash::make($request->password);
        }

        // Update User
        $finduser = User::find($request->id);

        if ($finduser) {
            $finduserUpdate = $finduser->fill($usersInfo);
            $finduserUpdate->save();

            $dataProfile = [
                "school_id" => $request->school_id,

                "firstname" => $request->firstname,
                "middlename" => $request->middlename,
                "lastname" => $request->lastname,
                "name_ext" => $request->name_ext,
                "birthplace" => $request->birthplace,

                "gender" => $request->gender,
                "contact_number" => $request->contact_number,
                "religion_id" => $request->religion_id,
                "civil_status_id" => $request->civil_status_id,
                "nationality_id" => $request->nationality_id,
            ];

            $profile_id = "";

            $findProfilByUserId = \App\Models\Profile::where('user_id', $finduser->id)->first();

            if ($findProfilByUserId) {
                $profile_id = $findProfilByUserId->id;

                $dataProfile["updated_by"] = auth()->user()->id;

                $findProfilByUserIdUpdate = $findProfilByUserId->fill($dataProfile);
                $findProfilByUserIdUpdate->save();

                if ($request->hasFile('imagefile')) {
                    $folder_name = "";

                    if ($findProfilByUserId->folder_name) {
                        $folder_name = $findProfilByUserId->folder_name;
                    } else {
                        $folder_name = Str::random(10);
                    }

                    $this->create_attachment($findProfilByUserId, $request->file('imagefile'), [
                        "action" => "Add",
                        "folder_name" => $folder_name,
                        "root_folder" => "profiles",
                        "file_description" => "Profile"
                    ]);
                }
            } else {
                $dataProfile["created_by"] = auth()->user()->id;
                $createProfile = \App\Models\Profile::create($dataProfile);

                if ($createProfile) {
                    $profile_id = $createProfile->id;

                    if ($request->hasFile('imagefile')) {
                        $folder_name = Str::random(10);
                        $this->create_attachment($createProfile, $request->file('imagefile'), [
                            "action" => "Add",
                            "folder_name" => $folder_name,
                            "root_folder" => "profiles",
                            "file_description" => "Profile"
                        ]);
                    }
                }
            }

            $contact_number = $request->contact_number;
            $exam_date = $request->exam_date;

            if ($profile_id != "") {
                // Contact Information Update & Create
                if ($contact_number != "") {
                    \App\Models\ProfileContactInformation::where("profile_id", $profile_id)->update(['status' => 0]);

                    $findContactInformation = \App\Models\ProfileContactInformation::where("contact_number", $contact_number)
                        ->where("profile_id", $profile_id)
                        ->first();

                    if ($findContactInformation) {
                        $findContactInformation->fill([
                            "status" => 1,
                            "updated_by" => auth()->user()->id,
                        ])->save();
                    } else {
                        \App\Models\ProfileContactInformation::create([
                            'contact_number' => $contact_number,
                            'category' => 'Student Contact Information',
                            "profile_id" => $profile_id,
                            "created_by" => auth()->user()->id,
                            'status' => 1,
                        ]);
                    }
                }

                // Student Exam Result Update & Create
                if ($exam_date != "") {
                    \App\Models\StudentExamResult::where("profile_id", $profile_id);

                    $findStudentExamResult = \App\Models\StudentExamResult::where("exam_date", $exam_date)
                        ->where("profile_id", $profile_id)
                        ->first();

                    if ($findStudentExamResult) {
                        $findStudentExamResult->fill([
                            "updated_by" => auth()->user()->id,
                        ])->save();
                    } else {
                        \App\Models\StudentExamResult::create([
                            'exam_date' => new DateTime($exam_date),
                            'exam_status' => $request->exam_status,
                            'exam_result' => $request->exam_result,
                            "profile_id" => $profile_id,
                            "created_by" => auth()->user()->id,
                        ]);
                    }
                }
            }

            $this->user_persmissions($finduser->id, $request->user_role_id);

            $ret = [
                "success" => true,
                "message" => "Data updated successfully",
            ];
        }

        return $ret;
    }

    public function update_exam_result(Request $request)
    {
        $ret = [
            "success" => false,
            "message" => "Exam result not updated",
        ];

        $exam_date = $request->exam_date;
        $profile_id = $request->profile_id; // Assuming profile_id is passed in the request

        if ($profile_id != "" && $exam_date != "") {
            $findStudentExamResult = \App\Models\StudentExamResult::where("exam_date", $exam_date)
                ->where("profile_id", $profile_id)
                ->first();

            if ($findStudentExamResult) {
                $findStudentExamResult->fill([
                    "exam_status" => $request->exam_status,
                    "exam_result" => $request->exam_result,
                    "updated_by" => auth()->user()->id,
                ])->save();

                $ret = [
                    "success" => true,
                    "message" => "Exam result updated successfully",
                ];
            } else {
                \App\Models\StudentExamResult::create([
                    'exam_date' => new DateTime($exam_date),
                    'exam_status' => $request->exam_status,
                    'exam_result' => $request->exam_result,
                    "profile_id" => $profile_id,
                    "created_by" => auth()->user()->id,
                ]);

                $ret = [
                    "success" => true,
                    "message" => "Exam result created successfully",
                ];
            }
        }

        return $ret;
    }
}
