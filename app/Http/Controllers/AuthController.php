<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentialsEmail = [
            'email' => $request->email,
            'password' => $request->password
        ];

        if (auth()->attempt($credentialsEmail)) {
            $user = auth()->user();

            $dataUser = \App\Models\Profile::firstWhere("user_id", $request->id);
            $dataUserRole = \App\Models\UserRole::find($request->user_role_id);

            if ($dataUser) {
                $user['firstname'] = $dataUser->firstname ?? null;
                $user['lastname'] = $dataUser->lastname ?? null;
            }

            if ($dataUserRole) {
                $user['role'] = $dataUserRole->role ?? null;
            }

            if ($user->status == 'Active') {
                if ($request->from) {
                    if ($request->from == 'faculty_monitoring_attendance_checker' && in_array($user->user_role_id, [1, 2])) {
                        $token = $user->createToken(date('Y') . '-' . env('APP_NAME'))->accessToken;

                        return response()->json([
                            'success' => true,
                            'data' => $user,
                            'token' => $token,

                        ], 200);
                    } else {
                        return response()->json([
                            'success' => false,
                            'message' => 'Permission not allowed!',
                        ], 200);
                    }
                } else {
                    $token = $user->createToken(date('Y') . '-' . env('APP_NAME'))->accessToken;
                    return response()->json([
                        'success' => true,
                        'data' => $user,
                        'token' => $token,

                    ], 200);
                }
            } else if ($user->status == 'Deactivated') {
                return response()->json([
                    'success' => false,
                    'message' => 'This account is deactivated!',
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Error',
                    'description' => 'Unrecognized username or password. <b>Forgot your password?</b>',
                ], 401);
            }
        } else {
            $credentialsUsername = [
                'username' => $request->email,
                'password' => $request->password
            ];
            if (auth()->attempt($credentialsUsername)) {
                $user = auth()->user();

                $dataUser = \App\Models\Profile::firstWhere("user_id", $request->id);
                $dataUserRole = \App\Models\UserRole::find($user->user_role_id);

                if ($dataUser) {
                    $user['firstname'] = $dataUser->firstname ?? null;
                    $user['lastname'] = $dataUser->lastname ?? null;
                }

                if ($dataUserRole) {
                    $user['role'] = $dataUserRole->role ?? null;
                }

                if ($user->status == 'Active') {
                    if ($request->from) {
                        if ($request->from == 'faculty_monitoring_attendance_checker' && in_array($user->user_role_id, [1, 2])) {
                            $token = $user->createToken(date('Y') . '-' . env('APP_NAME'))->accessToken;
                            return response()->json([
                                'success' => true,
                                'data' => $user,
                                'token' => $token,

                            ], 200);
                        } else {
                            return response()->json([
                                'success' => false,
                                'message' => 'Permission not allowed!',
                            ], 200);
                        }
                    } else {
                        $token = $user->createToken(date('Y') . '-' . env('APP_NAME'))->accessToken;

                        return response()->json([
                            'success' => true,
                            'data' => $user,
                            'token' => $token,

                        ], 200);
                    }
                } else if ($user->status == 'Deactivated') {
                    return response()->json([
                        'success' => false,
                        'message' => 'Account is deactivated!',
                    ], 200);
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Error',
                        'description' => 'Unrecognized username or password. <b>Forgot your password?</b>',
                    ], 401);
                }
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Error',
                    'description' => 'Unrecognized username or password. <b>Forgot your password?</b>',
                ], 401);
            }
        }
    }

    public function register(Request $request)
    {
        // $credentialsName = [
        //     'lastname' => $request->lastname,
        //     'firstname' => $request->firstname,
        //     'middlename' => $request->middlename
        // ];

        // if (auth()->attempt($credentialsName)) {
        //     $user = auth()->user();

        //     dd($user);

        //     if ($user->status == "") {
        //     }
        // }
    }

    public function forgot_password(Request $request)
    {
        //
    }
}