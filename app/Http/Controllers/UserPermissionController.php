<?php

namespace App\Http\Controllers;

use App\Models\Module;
use App\Models\UserPermission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserPermissionController extends Controller
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\UserPermission  $userPermission
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\UserPermission  $userPermission
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, UserPermission $userPermission)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\UserPermission  $userPermission
     * @return \Illuminate\Http\Response
     */
    public function destroy(UserPermission $userPermission)
    {
        //
    }

    public function user_permission_status(Request $request)
    {
        $ret = [
            "success" => false,
            "message" => "Status not change"
        ];

        $find = UserPermission::find($request->user_permission_id);

        if ($find) {
            $findUpdate = $find->fill(['status' => $request->status]);

            if ($findUpdate->save()) {
                $ret = [
                    "success" => true,
                    "message" => "Status changed successfully"
                ];
            }
        }

        return response()->json($ret, 200);
    }
}
