<?php

namespace App\Http\Controllers;

use App\Models\Module;
use App\Models\UserRolePermission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserRolePermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $ret  = [
            "success" => false,
            "message" => "Data not update"
        ];

        $findUserRolePermission = UserRolePermission::where("user_role_id", $request->user_role_id)
            ->where("mod_button_id", $request->mod_button_id)
            ->first();

        if ($findUserRolePermission) {
            $findUserRolePermissionUpdate = $findUserRolePermission->fill([
                "status" => $request->status,
            ])->save();

            if ($findUserRolePermissionUpdate) {
                $ret  = [
                    "success" => true,
                    "message" => "Data updated successfully"
                ];
            }
        } else {
            $createUserRolePermission = UserRolePermission::create([
                "user_role_id" => $request->user_role_id,
                "mod_button_id" => $request->mod_button_id,
                "status" => $request->status,
            ]);
            if ($createUserRolePermission) {
                $ret  = [
                    "success" => true,
                    "message" => "Data updated successfully"
                ];
            }
        }

        return response()->json($ret, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\UserRolePermission  $userRolePermission
     * @return \Illuminate\Http\Response
     */
    public function show(UserRolePermission $userRolePermission)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\UserRolePermission  $userRolePermission
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, UserRolePermission $userRolePermission)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\UserRolePermission  $userRolePermission
     * @return \Illuminate\Http\Response
     */
    public function destroy(UserRolePermission $userRolePermission)
    {
        //
    }
}
