<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\ProfileContactInformation;
use App\Models\ProfileDepartment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $type = "SELECT `type` FROM user_roles WHERE user_roles.id = users.user_role_id";
        $role = "SELECT `role` FROM user_roles WHERE user_roles.id = users.user_role_id";
        $fullname = "SELECT CONCAT(firstname, IF(lastname, CONCAT(' ', lastname), '')) FROM profiles WHERE profiles.user_id=users.id ORDER BY id LIMIT 1";

        $data = User::select([
            "*",
            DB::raw("($type) type"),
            DB::raw("($role) role"),
            DB::raw("($fullname) fullname"),
            DB::raw("email"),
            DB::raw("username"),
        ]);

        $data = $data->where(function ($query) use ($request, $fullname, $type, $role) {
            if ($request->search) {
                $query->orWhere(DB::raw("($type)"), 'LIKE', "%$request->search%");
                $query->orWhere(DB::raw("($role)"), 'LIKE', "%$request->search%");
                $query->orWhere(DB::raw("($fullname)"), 'LIKE', "%$request->search%");
                $query->orWhere(DB::raw("(email)"), 'LIKE', "%$request->search%");
            }
        });

        if ($request->from) {
            //users current & archived
            if ($request->from === "/users/current") {

                $data = $data->where(function ($query) {
                    $query->where("status", "Active")->whereNull("deactivated_at");
                });
            } else if ($request->from === "/users/archived") {
                $data = $data->where(function ($query) {
                    $query->where("status", "Deactivated")->whereNotNull("deactivated_at");
                });
            }

            //students current & archived
            if ($request->from === "/students/current") {
                $data = $data->where(function ($query) {
                    $query->whereRaw("(SELECT IF(`role` = 'Student', 'Student Assistant', `role`) FROM user_roles WHERE user_roles.id = user_role_id) = 'Student Assistant'")
                        ->where("status", "Active")
                        ->whereNull("deactivated_at");
                });
            } else if ($request->from === "/students/archived") {
                $data = $data->where(function ($query) {
                    $query->whereRaw("(SELECT IF(`role` = 'Student', 'Student Assistant', `role`) FROM user_roles WHERE user_roles.id = user_role_id) = 'Student Assistant'")
                        ->where("status", "Deactivated")
                        ->whereNotNull("deactivated_at");
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
            $ret = $this->update_user($request);
        } else {
            $ret = $this->create_user($request);;
        }

        return response()->json($ret, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = User::with([
            "user_role",
            "profile" => function ($query) {
                $query->with([
                    "profile_contact_informations" => function ($query3) {
                        $query3->where("status", 1)->orderBy("id", "desc")->limit(1);
                    },
                    "profile_departments" => function ($query4) {
                        $query4->where("status", 1)->orderBy("id", "desc")->limit(1);
                    },
                    "attachments" => function ($query5) {
                        $query5->orderBy("id", "desc")->limit(1);
                    },
                    // "schoo_id" => function ($query6) {
                    //     $query6->orderBy("id", "desc");
                    // }
                ]);
            }
        ])->find($id);

        $ret = [
            "success" => true,
            "data" => $data
        ];

        return response()->json($ret, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $ret  = [
            "success" => false,
            "message" => "Data not deleted",
        ];

        $findUser = User::find($id);

        if ($findUser) {
            if ($findUser->delete()) {
                $ret  = [
                    "success" => true,
                    "message" => "Data deleted successfully"
                ];
            }
        }

        return response()->json($ret, 200);
    }

    public function create_user($request)
    {
        $ret = [
            "success" => false,
            "message" => "Data not created",
        ];

        $error = false;

        $usersInfo = [
            "user_role_id" => $request->user_role_id,
            "username" => $request->username,
            "email" => $request->email,
            "password" => Hash::make($request->password),
            "created_by" => auth()->user()->id,
            "status" => 'Active',
        ];

        $findSchoolId = Profile::firstWhere('school_id', $request->school_id);

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
                    "firstname" => $request->firstname,
                    "lastname" => $request->lastname,
                    "user_id" => $createUser->id,
                    "school_id" => $request->school_id,
                    "gender" => $request->gender,
                ];

                $profile_id = "";

                $findProfilByUserId = \App\Models\Profile::where('user_id', $createUser->id)->first();

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

                $department_id = $request->department_id;
                $contact_number = $request->contact_number;

                if ($profile_id != "") {
                    if ($department_id != "") {
                        \App\Models\ProfileDepartment::where("profile_id", $profile_id)->update(['status' => 0]);

                        $findDepartment = ProfileDepartment::where("department_id", $department_id)
                            ->where("profile_id", $profile_id)->first();

                        if ($findDepartment) {
                            $findDepartment->fill([
                                'status' => 1,
                                'updated_by' => auth()->user()->id
                            ])->save();
                        } else {
                            \App\Models\ProfileDepartment::create([
                                'department_id' => $department_id,
                                "profile_id" => $profile_id,
                                'status' => 1,
                                'updated_by' => auth()->user()->id
                            ]);
                        }
                    }

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
                                "profile_id" => $profile_id,
                                'status' => 1,
                                'updated_by' => auth()->user()->id
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

        return $ret;
    }

    public function update_user($request)
    {
        $ret = [
            "success" => false,
            "message" => "Data not updated",
        ];

        $usersInfo = [
            "user_role_id" => $request->user_role_id,
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
                "firstname" => $request->firstname,
                "lastname" => $request->lastname,
                "user_id" => $finduser->id,
                "school_id" => $request->school_id,
                "civil_status_id" => $request->civil_status_id,
                "nationality_id" => $request->nationality_id,
                "gender" => $request->gender,
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

            $department_id = $request->department_id;
            $contact_number = $request->contact_number;

            if ($profile_id != "") {
                // Department Update & Create
                if ($department_id != "") {
                    \App\Models\ProfileDepartment::where("profile_id", $profile_id)->update(['status' => 0]);

                    $findDepartment = \App\Models\ProfileDepartment::where("department_id", $department_id)
                        ->where("profile_id", $profile_id)
                        ->first();

                    if ($findDepartment) {
                        $findDepartment->fill([
                            'status' => 1,
                            "updated_by" => auth()->user()->id,
                        ])->save();
                    } else {
                        \App\Models\ProfileDepartment::create([
                            'department_id' => $department_id,
                            "profile_id" => $profile_id,
                            "created_by" => auth()->user()->id,
                            'status' => 1,
                        ]);
                    }
                }

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
                            "profile_id" => $profile_id,
                            "created_by" => auth()->user()->id,
                            'status' => 1,
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

    public function users_update_email(Request $request)
    {
        $ret  = [
            "success" => true,
            "message" => "Email not updated",
        ];

        $data = User::find($request->id);

        if ($data) {
            $data = $data->fill(["email" => $request->email]);
            if ($data->save()) {
                $ret  = [
                    "success" => true,
                    "message" => "Email updated successfully"
                ];
            }
        }

        return response()->json($ret, 200);
    }

    public function users_update_password(Request $request)
    {
        $ret  = [
            "success" => false,
            "message" => "Password not updated",
        ];

        $data = User::find($request->id);

        if ($data) {
            $data = $data->fill(["password" => Hash::make($request->new_password)]);
            if ($data->save()) {
                $ret  = [
                    "success" => true,
                    "message" => "Password updated successfully"
                ];
            }
        }

        return response()->json($ret, 200);
    }

    public function users_info_update_password(Request $request)
    {
        $ret  = [
            "success" => false,
            "message" => "Password not updated",
        ];

        $data = User::find($request->id);

        if ($data) {
            if (Hash::check($request->old_password, $data->password)) {
                $data = $data->fill(["password" => Hash::make($request->new_password)]);
                if ($data->save()) {
                    $ret  = [
                        "success" => true,
                        "message" => "Password updated successfully"
                    ];
                }
            } else {
                $ret  = [
                    "success" => false,
                    "message" => "Old password did not match",
                ];
            }
        } else {
            $ret  = [
                "success" => false,
                "message" => "No found data",
            ];
        }

        return response()->json($ret, 200);
    }

    public function user_update_role(Request $request)
    {
        $ret  = [
            "success" => false,
            "message" => "User role not updated",
        ];

        $findUser = User::find($request->id);

        if ($findUser) {
            if ($findUser->status === 'Active') {
                $findUser = $findUser->fill(["user_role_id" => $request->type, "user_role_id" => $request->user_role_id]);
                if ($findUser->save()) {
                    $ret  = [
                        "success" => true,
                        "message" => "User role updated successfully"
                    ];
                }
            }
        }

        return response()->json($ret, 200);
    }

    public function user_deactivate(Request $request)
    {
        $ret = [
            "success" => false,
            "message" => "Data not deactivate"
        ];

        $findUser = User::find($request->id);

        if ($findUser) {
            if ($findUser->status === 'Active') {
                // deactivate user
                $findUser->status = 'Deactivated';
                $findUser->deactivated_by = auth()->user()->id;
                $findUser->deactivated_at = now();

                if ($findUser->save()) {
                    $findUserProfile = Profile::where('id', $findUser->id)->first();

                    if ($findUserProfile) {
                        $findUserProfile->deactivated_by = auth()->user()->id;
                        $findUserProfile->deactivated_at = now();
                        $findUserProfile->save();
                    }

                    $ret = [
                        "success" => true,
                        "message" => "Data deactivated successfully"
                    ];
                }
            }
        } else {
            $ret = [
                "success" => false,
                "message" => "Failed to deactivate data"
            ];
        }

        return response()->json($ret, 200);
    }

    public function user_profile_info()
    {
        $data = User::with([
            "user_role",
            "profile" => function ($query) {
                $query->with([
                    "attachments" => function ($query1) {
                        $query1->orderBy("id", "desc")->limit(1);
                    },
                ]);
            }
        ])->find(auth()->user()->id);

        return response()->json([
            "success" => true,
            "data" => $data
        ], 200);
    }

    public function user_profile_info_update(Request $request)
    {
        $ret = [
            "success" => false,
            "message" => "Data not updated"
        ];

        $find = User::find(auth()->user()->id);

        if ($find) {
            $findProfile = Profile::where("user_id", auth()->user()->id)->first();

            if ($findProfile) {
                $findProfileUpdate = $findProfile->fill([
                    "firstname" => $request->firstname,
                    "lastname" => $request->lastname,
                    "civil_status_id" => $request->civil_status_id,
                    "nationality_id" => $request->nationality_id,
                    "gender" => $request->gender,
                ]);

                if ($findProfileUpdate->save()) {
                    ProfileContactInformation::where("profile_id", $findProfile->id)->update(['status' => 0]);

                    $checkContactNumber = ProfileContactInformation::where("profile_id", $findProfile->id)
                        ->where("contact_number", $request->contact_number)
                        ->first();

                    if ($checkContactNumber) {
                        $checkContactNumber->fill(['status' => 1])->save();
                    } else {
                        ProfileContactInformation::create([
                            "profile_id" => $findProfile->id,
                            "contact_number" => $request->contact_number,
                            "status" => 1
                        ]);
                    }


                    $ret = [
                        "success" => true,
                        "message" => "Data updated successfully"
                    ];
                }
            }
        }

        return response()->json($ret, 200);
    }
}
