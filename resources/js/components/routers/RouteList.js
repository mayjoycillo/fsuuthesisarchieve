import { Routes, Route } from "react-router-dom";
import { faBooks, faHome, faUsers } from "@fortawesome/pro-regular-svg-icons";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

import Page404 from "../views/errors/Page404";
import PageRequestPermission from "../views/errors/PageRequestPermission";

import PageLogin from "../views/public/PageLogin/PageLogin";

import PageEditProfile from "../views/private/PageEditProfile/PageEditProfile";
import PageDashboard from "../views/private/PageDashboard/PageDashboard";
import PageUser from "../views/private/PageUser/PageUser";
import PageUserForm from "../views/private/PageUser/PageUserForm";
import PageUserPermission from "../views/private/PageUser/PageUserPermission";
import PagePermission from "../views/private/PagePermission/PagePermission";

export default function RouteList() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <PublicRoute
                        title="LOGIN"
                        pageId="PageLogin"
                        component={PageLogin}
                    />
                }
            />

            <Route
                path="/edit-profile"
                element={
                    <PrivateRoute
                        moduleName="Edit Profile"
                        title="User"
                        subtitle="VIEW / EDIT"
                        pageId="PageUserProfile"
                        pageHeaderIcon={faUsers}
                        breadcrumb={[
                            {
                                name: "Dashboard",
                                link: "/dashboard",
                            },
                            {
                                name: "Edit Profile",
                            },
                        ]}
                        component={PageEditProfile}
                    />
                }
            />

            <Route
                path="/dashboard"
                element={
                    <PrivateRoute
                        // moduleCode="M-01"
                        moduleName="Dashboard"
                        title="Dashboard"
                        subtitle="ADMIN"
                        pageId="PageDashboard"
                        pageHeaderIcon={faHome}
                        breadcrumb={[
                            {
                                name: "Dashboard",
                            },
                        ]}
                        component={PageDashboard}
                    />
                }
            />

            {/* users */}
            <Route
                path="/users/current"
                element={
                    <PrivateRoute
                        // moduleCode="M-02"
                        moduleName="User Current"
                        title="Users"
                        subtitle="VIEW / EDIT"
                        pageId="PageUserCurrent"
                        pageHeaderIcon={faUsers}
                        breadcrumb={[
                            {
                                name: "Dashboard",
                                link: "/dashboard",
                            },
                            {
                                name: "Users",
                            },
                            {
                                name: "Current",
                            },
                        ]}
                        component={PageUser}
                    />
                }
            />

            <Route
                path="/users/current/add"
                element={
                    <PrivateRoute
                        // moduleCode="M-02"
                        moduleName="User Current Add"
                        title="Users"
                        subtitle="ADD"
                        pageId="PageUserAdd"
                        pageHeaderIcon={faUsers}
                        breadcrumb={[
                            {
                                name: "Dashboard",
                                link: "/dashboard",
                            },
                            {
                                name: "Users",
                                link: "/users/current",
                            },
                            {
                                name: "Current",
                                link: "/users/current",
                            },
                            {
                                name: "Add User",
                            },
                        ]}
                        component={PageUserForm}
                    />
                }
            />

            <Route
                path="/users/current/edit/:id"
                element={
                    <PrivateRoute
                        // moduleCode="M-02"
                        moduleName="User Current Edit"
                        title="Users Current"
                        subtitle="EDIT"
                        pageId="PageUserEdit"
                        pageHeaderIcon={faUsers}
                        breadcrumb={[
                            {
                                name: "Dashboard",
                                link: "/dashboard",
                            },
                            {
                                name: "Users",
                                link: "/users/current",
                            },
                            {
                                name: "Current",
                                link: "/users/current",
                            },
                            {
                                name: "Edit User",
                            },
                        ]}
                        component={PageUserForm}
                    />
                }
            />

            <Route
                path="/users/current/permission/:id"
                element={
                    <PrivateRoute
                        // moduleCode="M-02"
                        moduleName="User Current Edit Permission"
                        title="User's Edit Permission"
                        subtitle="EDIT"
                        pageId="PageUserEdit"
                        pageHeaderIcon={faUsers}
                        breadcrumb={[
                            {
                                name: "Dashboard",
                                link: "/dashboard",
                            },
                            {
                                name: "Users",
                                link: "/users/current",
                            },
                            {
                                name: "Current",
                                link: "/users/current",
                            },
                            {
                                name: "Edit Permission",
                            },
                        ]}
                        component={PageUserPermission}
                    />
                }
            />

            <Route
                path="/users/archived"
                element={
                    <PrivateRoute
                        // moduleCode="M-03"
                        moduleName="User Archived"
                        title="Users"
                        subtitle="ARCHIVED"
                        pageId="PageUserArchived"
                        pageHeaderIcon={faUsers}
                        breadcrumb={[
                            {
                                name: "Dashboard",
                                link: "/dashboard",
                            },
                            {
                                name: "Users",
                            },
                            {
                                name: "Archived",
                            },
                        ]}
                        component={PageUser}
                    />
                }
            />

            <Route
                path="/users/archived/edit/:id"
                element={
                    <PrivateRoute
                        // moduleCode="M-03"
                        moduleName="User Archived Edit"
                        title="Users Archived"
                        subtitle="EDIT"
                        pageId="PageUserEdit"
                        pageHeaderIcon={faUsers}
                        breadcrumb={[
                            {
                                name: "Dashboard",
                                link: "/dashboard",
                            },
                            {
                                name: "Users",
                                link: "/users/archived",
                            },
                            {
                                name: "Archived",
                                link: "/users/archived",
                            },
                            {
                                name: "Edit User",
                            },
                        ]}
                        component={PageUserForm}
                    />
                }
            />
            {/* end users */}

            {/* permission */}

            <Route
                path="/permission/:system"
                element={
                    <PrivateRoute
                        // moduleCode="M-04"
                        moduleName="Permission"
                        title="Permission"
                        subtitle="Permission"
                        pageId="PagePermission"
                        pageHeaderIcon={faBooks}
                        breadcrumb={[
                            {
                                name: "Dashboard",
                                link: "/dashboard",
                            },
                            {
                                name: "Permission",
                            },
                            {
                                name: "Permission",
                            },
                        ]}
                        component={PagePermission}
                    />
                }
            />

            {/* end permission */}

            <Route
                path="/request-permission"
                element={<PageRequestPermission />}
            />

            <Route path="*" element={<Page404 />} />
        </Routes>
    );
}
