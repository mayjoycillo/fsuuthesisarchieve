<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\ProfileDepartment;
use App\Models\ProfileSpouse;
use App\Models\User;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $fullname = "CONCAT(firstname, IF(lastname IS NOT NULL, CONCAT(' ', lastname), ''))";
        $usernames = "SELECT username FROM users WHERE users.id = profiles.user_id";
        $email = "SELECT email FROM users WHERE users.id = profiles.user_id";
        $user_role_id = "SELECT user_role_id FROM users WHERE users.id = profiles.user_id";
        $school_id = "REPLACE(school_id, '-', '')";

        $data = Profile::select([
            "*",
            DB::raw("($fullname) fullname"),
            DB::raw("($usernames) username"),
            DB::raw("($email) email"),
            DB::raw("($user_role_id) user_role_id"),
            DB::raw("($school_id) school_id"),
        ]);

        $data = $data->where(function ($query) use ($request, $fullname, $usernames, $email, $user_role_id, $school_id) {
            if ($request->search) {
                $query->orWhere(DB::raw("($fullname)"), 'LIKE', "%$request->search%");
                $query->orWhere(DB::raw("($usernames)"), 'LIKE', "%$request->search%");
                $query->orWhere(DB::raw("($email)"), 'LIKE', "%$request->search%");
                $query->orWhere(DB::raw("($user_role_id)"), 'LIKE', "%$request->search%");
                $query->orWhere(DB::raw("($school_id)"), 'LIKE', "%$request->search%");
            }
        });

        $data = $data->where(function ($query) use ($request, $fullname) {
            if ($request->search) {
                $query->orWhere(DB::raw("($fullname)"), 'LIKE', "%$request->search%");
            }
        });

        if ($request->from) {
            $fromArhived = ["/employees/full-time", "/students/archived"];
            $fromArhived = ["/employees/archived", "/students/archived"];
            if (in_array($request->from, $fromArhived)) {
                $data = $data->onlyTrashed();
            } else if ($request->from == '/employees/full-time') {
                $data = $data->where("employment_type", "Full-Time");
            } else if ($request->from == '/employees/part-time') {
                $data = $data->where("employment_type", "Part-Time");
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
            "success" => false,
            "message" => "Data not saved.",
            "request" => $request->all()
        ];

        $request->validate([
            'username' => [
                'required',
                Rule::unique('users'),
            ],
            'email' => [
                'required',
                Rule::unique('users'),
            ],
        ]);

        $usersInfo = [
            "user_role_id"  => $request->user_role_id,
            "username"      => $request->username,
            "email"         => $request->email,
            "password"      => Hash::make($request->password),
            "created_by"    => auth()->user()->id,
            "status"        => "Active",
        ];

        $createUser = User::create($usersInfo);

        if ($createUser) {
            $dataProfile = [
                "user_id" => $createUser->id,
                "school_id" => $request->school_id,
                "firstname" => $request->firstname,
                "middlename" => $request->middlename,
                "lastname" => $request->lastname,
                "suffix" => $request->suffix,
                "role" => $request->role,
                "course" => $request->course,
                "contact" => $request->contact,

            ];

            $profile = Profile::create($dataProfile);

            $profile_id = "";

            $ret = [
                "success" => true,
                "message" => "Data saved successfully",
                "profile_id" => $profile_id
            ];
        }

        return response()->json($ret, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = Profile::with([
            'user',
        ])
            ->find($id);

        return response()->json([
            'success'   => true,
            'data'      => $data
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Profile $profile)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function destroy(Profile $profile)
    {
        //
    }

    public function profile_update(Request $request)
    {
        $ret = [
            "success" => false,
            "message" => "Data not updated",
            "request" => $request->all(),
        ];

        return response()->json($ret, 200);
    }

    public function create_profile(Request $request)
    {
    }

    public function profile_deactivate(Request $request)
    {
    }
}
