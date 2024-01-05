import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-regular-svg-icons";

import TableEmployee from "./TableEmployee";
import { GET } from "../../../providers/useAxiosQuery";

export default function PageEmployee(props) {
    const location = useLocation();
    const navigate = useNavigate();

    let addLinks = ["/employees/full-time", "/employees/part-time"];

    const [sortInfo, setSortInfo] = useState({
        order: "descend",
        columnKey: "created_at",
    });

    const [tableFilter, setTableFilter] = useState({
        page: 1,
        page_size: 50,
        search: "",
        sort_field: "created_at",
        sort_order: "desc",
        from: location.pathname,
    });

    useEffect(() => {
        setTableFilter({
            page: 1,
            page_size: 50,
            search: "",
            sort_field: "created_at",
            sort_order: "desc",
            from: location.pathname,
        });

        setSortInfo({
            order: "descend",
            columnKey: "created_at",
        });

        return () => {};
    }, [location]);

    const { data: dataSource, refetch: refetchSource } = GET(
        `api/profile?${new URLSearchParams(tableFilter)}`,
        ["profile_active_list", "check_user_permission"]
    );

    useEffect(() => {
        refetchSource();

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableFilter]);

    return (
        <Row gutter={[12, 12]}>
            {addLinks.includes(location.pathname) ? (
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Button
                        className=" btn-main-primary btn-main-invert-outline b-r-none hide"
                        icon={<FontAwesomeIcon icon={faPlus} />}
                        onClick={() => navigate(`${location.pathname}/add`)}
                        size="large"
                        name="btn_add"
                    >
                        Add Employee
                    </Button>
                </Col>
            ) : null}

            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <TableEmployee
                    dataSource={dataSource}
                    tableFilter={tableFilter}
                    setTableFilter={setTableFilter}
                    sortInfo={sortInfo}
                    setSortInfo={setSortInfo}
                />
            </Col>
        </Row>
    );
}
