import { useEffect, useState } from "react";
import { Tabs } from "antd";

import { GET } from "../../../../providers/useAxiosQuery";
import TableUserRolePermission from "./TableUserRolePermission";

export default function TabPermissionUserRole(props) {
    const { system } = props;

    const [tableFilter, setTableFilter] = useState({
        page: 1,
        page_size: 50,
        search: "",
        sort_field: "module_code",
        sort_order: "asc",
        system_id: system === "opis" ? 1 : 2,
        user_role_id: 1,
    });

    useEffect(() => {
        setTableFilter((ps) => ({
            ...ps,
            system_id: system === "opis" ? 1 : 2,
        }));

        return () => {};
    }, [system]);

    const { data: dataSourceUserRole } = GET(
        `api/user_role?sort_field=id&sort_order=asc`,
        "user_role_tab"
    );

    const { data: dataSource, refetch: refetchSource } = GET(
        `api/user_role_permission?${new URLSearchParams(tableFilter)}`,
        "user_role_permission_list"
    );

    useEffect(() => {
        refetchSource();

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableFilter]);

    const handleTabChange = (key) => {
        setTableFilter((ps) => ({ ...ps, user_role_id: key }));
    };

    return (
        <Tabs
            onChange={handleTabChange}
            defaultActiveKey="1"
            type="card"
            items={[
                ...(dataSourceUserRole && dataSourceUserRole.data
                    ? dataSourceUserRole.data.map((item) => ({
                          key: item.id,
                          label: item.role,
                          children: (
                              <TableUserRolePermission
                                  dataSource={dataSource}
                                  tableFilter={tableFilter}
                                  setTableFilter={setTableFilter}
                              />
                          ),
                      }))
                    : []),
            ]}
        />
    );
}
