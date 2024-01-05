<?php

namespace Database\Seeders;

use App\Models\Module;
use App\Models\ModuleButton;
use App\Models\User;
use App\Models\UserPermission;
use App\Models\UserRole;
use App\Models\UserRolePermission;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class ModuleAndRolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Module::truncate();
        ModuleButton::truncate();
        UserPermission::truncate();
        UserRolePermission::truncate();

        $systemModule = [
            [
                "system_id" => 1,
                "modules" => [
                    [
                        "module_name" => "Dashboard",
                        "description" => "",
                        "module_buttons" => [
                            [
                                "mod_button_code" => "view_page",
                                "mod_button_name" => "View Page",
                            ]
                        ]
                    ],
                    [
                        "module_name" => "Schedule Scheduling",
                        "description" => "",
                        "module_buttons" => [
                            [
                                "mod_button_code" => "view_page",
                                "mod_button_name" => "View Page",
                            ],
                            [
                                "mod_button_code" => "btn_add",
                                "mod_button_name" => "Add",
                            ],
                            [
                                "mod_button_code" => "btn_edit",
                                "mod_button_name" => "Edit",
                            ],
                            [
                                "mod_button_code" => "btn_view",
                                "mod_button_name" => "Preview",
                            ],
                            [
                                "mod_button_code" => "btn_delete",
                                "mod_button_name" => "Delete",
                            ]
                        ]
                    ],
                    [
                        "module_name" => "Schedule Day Time",
                        "description" => "",
                        "module_buttons" => [
                            [
                                "mod_button_code" => "view_page",
                                "mod_button_name" => "View Page",
                            ],
                            [
                                "mod_button_code" => "btn_add",
                                "mod_button_name" => "Add",
                            ],
                            [
                                "mod_button_code" => "btn_edit",
                                "mod_button_name" => "Edit",
                            ],
                            [
                                "mod_button_code" => "btn_view",
                                "mod_button_name" => "Preview",
                            ],
                            [
                                "mod_button_code" => "btn_delete",
                                "mod_button_name" => "Delete",
                            ]
                        ]
                    ],
                    [
                        "module_name" => "Faculty Schedule",
                        "description" => "",
                        "module_buttons" => [
                            [
                                "mod_button_code" => "view_page",
                                "mod_button_name" => "View Page",
                            ],
                            [
                                "mod_button_code" => "btn_add",
                                "mod_button_name" => "Add",
                            ],
                            [
                                "mod_button_code" => "btn_edit",
                                "mod_button_name" => "Edit",
                            ],
                            [
                                "mod_button_code" => "btn_view",
                                "mod_button_name" => "Preview",
                            ],
                            [
                                "mod_button_code" => "btn_delete",
                                "mod_button_name" => "Delete",
                            ]
                        ]
                    ],
                    [
                        "module_name" => "Student Schedule",
                        "description" => "",
                        "module_buttons" => [
                            [
                                "mod_button_code" => "view_page",
                                "mod_button_name" => "View Page",
                            ],
                            [
                                "mod_button_code" => "btn_add",
                                "mod_button_name" => "Add",
                            ],
                            [
                                "mod_button_code" => "btn_edit",
                                "mod_button_name" => "Edit",
                            ],
                            [
                                "mod_button_code" => "btn_view",
                                "mod_button_name" => "Preview",
                            ],
                            [
                                "mod_button_code" => "btn_delete",
                                "mod_button_name" => "Delete",
                            ]
                        ]
                    ],
                    [
                        "module_name" => "Employee Full-time",
                        "description" => "",
                        "module_buttons" => [
                            [
                                "mod_button_code" => "view_page",
                                "mod_button_name" => "View Page",
                            ],
                            [
                                "mod_button_code" => "btn_add",
                                "mod_button_name" => "Add",
                            ],
                            [
                                "mod_button_code" => "btn_edit",
                                "mod_button_name" => "Edit",
                            ],
                            [
                                "mod_button_code" => "btn_view",
                                "mod_button_name" => "Preview",
                            ],
                            [
                                "mod_button_code" => "btn_delete",
                                "mod_button_name" => "Delete",
                            ]
                        ]
                    ],
                    [
                        "module_name" => "Employee Part-time",
                        "description" => "",
                        "module_buttons" => [
                            [
                                "mod_button_code" => "view_page",
                                "mod_button_name" => "View Page",
                            ],
                            [
                                "mod_button_code" => "btn_add",
                                "mod_button_name" => "Add",
                            ],
                            [
                                "mod_button_code" => "btn_edit",
                                "mod_button_name" => "Edit",
                            ],
                            [
                                "mod_button_code" => "btn_view",
                                "mod_button_name" => "Preview",
                            ],
                            [
                                "mod_button_code" => "btn_delete",
                                "mod_button_name" => "Delete",
                            ]
                        ]
                    ],
                    [
                        "module_name" => "Employee Archived",
                        "description" => "",
                        "module_buttons" => [
                            [
                                "mod_button_code" => "view_page",
                                "mod_button_name" => "View Page",
                            ],
                            [
                                "mod_button_code" => "btn_edit",
                                "mod_button_name" => "Edit",
                            ],
                            [
                                "mod_button_code" => "btn_view",
                                "mod_button_name" => "Preview",
                            ],
                            [
                                "mod_button_code" => "btn_delete",
                                "mod_button_name" => "Delete",
                            ]
                        ]
                    ],
                    [
                        "module_name" => "Student Current",
                        "description" => "",
                        "module_buttons" => [
                            [
                                "mod_button_code" => "view_page",
                                "mod_button_name" => "View Page",
                            ],
                            [
                                "mod_button_code" => "btn_add",
                                "mod_button_name" => "Add",
                            ],
                            [
                                "mod_button_code" => "btn_edit",
                                "mod_button_name" => "Edit",
                            ],
                            [
                                "mod_button_code" => "btn_view",
                                "mod_button_name" => "Preview",
                            ],
                            [
                                "mod_button_code" => "btn_delete",
                                "mod_button_name" => "Delete",
                            ]
                        ]
                    ],
                    [
                        "module_name" => "Student Archived",
                        "description" => "",
                        "module_buttons" => [
                            [
                                "mod_button_code" => "view_page",
                                "mod_button_name" => "View Page",
                            ],
                            [
                                "mod_button_code" => "btn_edit",
                                "mod_button_name" => "Edit",
                            ],
                            [
                                "mod_button_code" => "btn_view",
                                "mod_button_name" => "Preview",
                            ],
                            [
                                "mod_button_code" => "btn_delete",
                                "mod_button_name" => "Delete",
                            ]
                        ]
                    ],
                    [
                        "module_name" => "User Current",
                        "description" => "",
                        "module_buttons" => [
                            [
                                "mod_button_code" => "view_page",
                                "mod_button_name" => "View Page",
                            ],
                            [
                                "mod_button_code" => "btn_add",
                                "mod_button_name" => "Add",
                            ],
                            [
                                "mod_button_code" => "btn_edit",
                                "mod_button_name" => "Edit",
                            ],
                            [
                                "mod_button_code" => "btn_delete",
                                "mod_button_name" => "Delete",
                            ],
                            [
                                "mod_button_code" => "btn_edit_permission",
                                "mod_button_name" => "Permission",
                            ],
                        ]
                    ],
                    [
                        "module_name" => "User Archived",
                        "description" => "",
                        "module_buttons" => [
                            [
                                "mod_button_code" => "view_page",
                                "mod_button_name" => "View Page",
                            ],
                            [
                                "mod_button_code" => "btn_edit",
                                "mod_button_name" => "Edit",
                            ],
                            [
                                "mod_button_code" => "btn_delete",
                                "mod_button_name" => "Delete",
                            ],
                        ]
                    ],
                    [
                        "module_name" => "Profile",
                        "description" => "",
                        "module_buttons" => [
                            [
                                "mod_button_code" => "view_page",
                                "mod_button_name" => "View Page",
                            ],
                            [
                                "mod_button_code" => "btn_edit",
                                "mod_button_name" => "Edit",
                            ],
                        ]
                    ],
                ]

            ],
            [
                "system_id" => 2,
                "modules" => [
                    [
                        "module_name" => "Dashboard",
                        "description" => "",
                        "module_buttons" => [
                            [
                                "mod_button_code" => "view_page",
                                "mod_button_name" => "View Page",
                            ]
                        ]
                    ],
                    [
                        "module_name" => "Upload Excel File",
                        "description" => "",
                        "module_buttons" => [
                            [
                                "mod_button_code" => "view_page",
                                "mod_button_name" => "View Page",
                            ],
                        ]
                    ],
                    [
                        "module_name" => "Faculty Load List",
                        "description" => "",
                        "module_buttons" => [
                            [
                                "mod_button_code" => "view_page",
                                "mod_button_name" => "View Page",
                            ],
                        ]
                    ],
                    [
                        "module_name" => "Faculty Load Report",
                        "description" => "",
                        "module_buttons" => [
                            [
                                "mod_button_code" => "view_page",
                                "mod_button_name" => "View Page",
                            ],
                        ]
                    ],
                    [
                        "module_name" => "Faculty Load Justification",
                        "description" => "",
                        "module_buttons" => [
                            [
                                "mod_button_code" => "view_page",
                                "mod_button_name" => "View Page",
                            ],
                        ]
                    ],
                    [
                        "module_name" => "Faculty Load Deduction",
                        "description" => "",
                        "module_buttons" => [
                            [
                                "mod_button_code" => "view_page",
                                "mod_button_name" => "View Page",
                            ],
                        ]
                    ],
                    [
                        "module_name" => "Admin Settings",
                        "description" => "",
                        "module_buttons" => [
                            [
                                "mod_button_code" => "view_page",
                                "mod_button_name" => "View Page",
                            ],
                        ]
                    ],
                ]
            ],
        ];

        foreach ($systemModule as $key => $value) {
            foreach ($value["modules"] as $key2 => $value2) {
                $last_mod_code = "";

                $lastModuleCode = Module::where("system_id", $value["system_id"])->orderBy("id", "desc")->first();

                if ($lastModuleCode) {
                    $code_split = explode("-", $lastModuleCode->module_code);

                    $last_mod_code = "M-" . sprintf("%02d", $code_split[1] + 1);
                } else {
                    $last_mod_code = "M-01";
                }

                $data_mod = Arr::except($value2, ['module_buttons']);
                $data_mod["module_code"] = $last_mod_code;
                $data_mod["system_id"] = $value["system_id"];

                $moduleCreate = Module::create($data_mod);
                if ($moduleCreate) {
                    foreach ($value2['module_buttons'] as $key3 => $value3) {
                        $createModuleButton = ModuleButton::create($value3 + ["module_id" => $moduleCreate->id]);

                        if ($createModuleButton) {
                            $dataUserRoles = UserRole::all();

                            foreach ($dataUserRoles as $key4 => $value4) {
                                if ($value4->id == 3) {
                                    $includeModule = [
                                        "Dashboard",
                                        "Faculty Load Justification",
                                        "Faculty Load Report"
                                    ];

                                    if (in_array($value2['module_name'], $includeModule)) {
                                        UserRolePermission::create([
                                            "user_role_id" => $value4->id,
                                            "mod_button_id" => $createModuleButton->id,
                                            "status" => 1,
                                            "created_by" => 1
                                        ]);
                                    }
                                } else if ($value4->id == 4) {
                                    $includeModule = [
                                        "Dashboard",
                                    ];

                                    if (in_array($value2['module_name'], $includeModule)) {
                                        UserRolePermission::create([
                                            "user_role_id" => $value4->id,
                                            "mod_button_id" => $createModuleButton->id,
                                            "status" => 1,
                                            "created_by" => 1
                                        ]);
                                    }
                                } else {
                                    UserRolePermission::create([
                                        "user_role_id" => $value4->id,
                                        "mod_button_id" => $createModuleButton->id,
                                        "status" => 1,
                                        "created_by" => 1
                                    ]);
                                }
                            }

                            $dataUsers = User::all();

                            foreach ($dataUsers as $key4 => $value4) {
                                if ($value4->user_role_id == 3) {
                                    $includeModule = [
                                        "Dashboard",
                                        "Faculty Load Justification",
                                        "Faculty Load Report"
                                    ];

                                    if (in_array($value2['module_name'], $includeModule)) {
                                        UserPermission::create([
                                            "user_id" => $value4->id,
                                            "mod_button_id" => $createModuleButton->id,
                                            "status" => 1,
                                            "created_by" => 1
                                        ]);
                                    }
                                } else  if ($value4->user_role_id == 4) {
                                    $includeModule = [
                                        "Dashboard",
                                    ];

                                    if (in_array($value2['module_name'], $includeModule)) {
                                        UserPermission::create([
                                            "user_id" => $value4->id,
                                            "mod_button_id" => $createModuleButton->id,
                                            "status" => 1,
                                            "created_by" => 1
                                        ]);
                                    }
                                } else {
                                    UserPermission::create([
                                        "user_id" => $value4->id,
                                        "mod_button_id" => $createModuleButton->id,
                                        "status" => 1,
                                        "created_by" => 1
                                    ]);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
