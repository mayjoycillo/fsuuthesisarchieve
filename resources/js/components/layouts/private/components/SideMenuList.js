import { Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faUsers,
    faShieldKeyhole,
    faCogs,
} from "@fortawesome/pro-light-svg-icons";

export const adminHeaderMenuLeft = (
    <>
        {/* <div className="ant-menu-left-icon">
            <Link to="/subscribers/current">
                <span className="anticon">
                    <FontAwesomeIcon icon={faUsers} />
                </span>
                <Typography.Text>Subscribers</Typography.Text>
            </Link>
        </div> */}
    </>
);

export const adminHeaderDropDownMenuLeft = () => {
    const items = [
        // {
        //     key: "/subscribers/current",
        //     icon: <FontAwesomeIcon icon={faUsers} />,
        //     label: <Link to="/subscribers/current">Subscribers</Link>,
        // },
    ];

    return <Menu items={items} />;
};

export const adminSideMenu = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: <FontAwesomeIcon icon={faHome} />,
        moduleCode: "M-01",
    },
    {
        title: "Users",
        path: "/users",
        icon: <FontAwesomeIcon icon={faUsers} />,
        children: [
            {
                title: "Current",
                path: "/users/current",
                moduleCode: "M-02",
            },
            {
                title: "Archived",
                path: "/users/archived",
                moduleCode: "M-03",
            },
        ],
    },
    {
        title: "Permissions",
        path: "/permission",
        icon: <FontAwesomeIcon icon={faShieldKeyhole} />,
        children: [
            {
                title: "OPIS",
                path: "/permission/opis",
                moduleCode: "M-04",
            },
            {
                title: "Faculty Monitoring",
                path: "/permission/faculty-monitoring",
                moduleCode: "M-05",
            },
        ],
    },
    {
        title: "System Settings",
        path: "/system-settings",
        icon: <FontAwesomeIcon icon={faCogs} />,
        children: [
            {
                title: "Email Templates",
                path: "/system-settings/email-templates",
                moduleCode: "M-06",
            },
        ],
    },
];
