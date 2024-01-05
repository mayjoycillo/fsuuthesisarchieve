import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GET } from "./useAxiosQuery";
import { userData } from "./companyInfo";

export default function checkUserPermission(moduleCode, moduleName, location) {
    const { data: dataPermissions, refetch: refetchPermission } = GET(
        `api/user_permission/${userData().id}`,
        ["check_user_permission"],
        (res) => {},
        false
    );

    const navigate = useNavigate();

    useEffect(() => {
        refetchPermission();

        let excludeUrl = ["/edit-profile", "/dashboard"];

        if (!excludeUrl.includes(location.pathname)) {
            if (
                dataPermissions &&
                dataPermissions.data &&
                dataPermissions.data.length
            ) {
                let dataPermissionsFilter = dataPermissions.data.filter(
                    (f) =>
                        f.module_code === moduleCode &&
                        f.module_buttons.filter(
                            (f2) =>
                                f2.mod_button_code === "view_page" &&
                                parseInt(f2.status) === 1
                        ).length > 0
                );
                if (dataPermissionsFilter.length) {
                    dataPermissionsFilter[0].module_buttons.forEach((el) => {
                        setTimeout(() => {
                            if (el.mod_button_code === "btn_add") {
                                let btnAdd =
                                    document.querySelectorAll("[name=btn_add]");
                                if (btnAdd.length) {
                                    btnAdd.forEach((elem) => {
                                        if (parseInt(el.status) === 0) {
                                            elem.remove();
                                        } else {
                                            elem.classList.remove("hide");
                                        }
                                    });
                                }

                                if (parseInt(el.status) === 0) {
                                    let moduleNames = [
                                        "Employee Current Add",
                                        "Student Current Add",
                                        "User Current Add",
                                    ];
                                    if (moduleNames.includes(moduleName)) {
                                        navigate(-1);
                                    }
                                }
                            }
                            if (el.mod_button_code === "btn_edit") {
                                let btnEdit =
                                    document.querySelectorAll(
                                        "[name=btn_edit]"
                                    );
                                if (btnEdit.length) {
                                    btnEdit.forEach((elem) => {
                                        if (parseInt(el.status) === 0) {
                                            elem.remove();
                                        } else {
                                            elem.classList.remove("hide");
                                        }
                                    });
                                }

                                if (parseInt(el.status) === 0) {
                                    let moduleNames = [
                                        "Employee Current Edit",
                                        "Employee Archived Edit",
                                        "Student Current Edit",
                                        "Student Archived Edit",
                                        "User Current Edit",
                                        "User Archived Edit",
                                    ];
                                    if (moduleNames.includes(moduleName)) {
                                        navigate(-1);
                                    }
                                }
                            }
                            if (el.mod_button_code === "btn_edit_permission") {
                                let btnEditPermission =
                                    document.querySelectorAll(
                                        "[name=btn_edit_permission]"
                                    );

                                if (btnEditPermission.length) {
                                    btnEditPermission.forEach((elem) => {
                                        if (parseInt(el.status) === 0) {
                                            elem.remove();
                                        } else {
                                            elem.classList.remove("hide");
                                        }
                                    });
                                }

                                if (parseInt(el.status) === 0) {
                                    if (parseInt(el.status) === 0) {
                                        let moduleNames = [
                                            "User Current Edit Permission",
                                        ];
                                        if (moduleNames.includes(moduleName)) {
                                            navigate(-1);
                                        }
                                    }
                                }
                            }
                            if (el.mod_button_code === "btn_delete") {
                                let btnDelete =
                                    document.querySelectorAll(
                                        "[name=btn_delete]"
                                    );
                                if (btnDelete.length) {
                                    btnDelete.forEach((elem) => {
                                        if (parseInt(el.status) === 0) {
                                            elem.remove();
                                        } else {
                                            elem.classList.remove("hide");
                                        }
                                    });
                                }
                            }
                            if (el.mod_button_code === "btn_status") {
                                let btnStatus =
                                    document.querySelectorAll(
                                        "[name=btn_status]"
                                    );
                                if (btnStatus.length) {
                                    btnStatus.forEach((elem) => {
                                        if (parseInt(el.status) === 0) {
                                            elem.remove();
                                        } else {
                                            elem.classList.remove("hide");
                                        }
                                    });
                                }
                            }
                        }, 1000);
                    });
                } else {
                    navigate("/request-permission");
                }
            }
        }

        return () => {};
    }, [moduleCode, moduleName, dataPermissions, navigate]);

    return "";
}
