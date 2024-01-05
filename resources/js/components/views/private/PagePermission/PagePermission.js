import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Tabs } from "antd";

import TabPermissionModule from "./components/TabPermissionModule";
import TabPermissionUserRole from "./components/TabPermissionUserRole";

export default function PagePermission() {
    const params = useParams();

    useEffect(() => {
        console.log("params", params);
        let system = params.system;

        let pageHeaderSubtitle = document.getElementById("pageHeaderSubtitle");
        if (pageHeaderSubtitle) {
            pageHeaderSubtitle.innerHTML =
                system === "opis" ? "OPIS" : "FACULTY MONITORING";
        }

        let breadcrumbTtemLast = document.querySelector(
            ".breadcrumb-item-last"
        );
        if (breadcrumbTtemLast) {
            breadcrumbTtemLast.innerHTML =
                system === "opis" ? "OPIS" : "FACULTY MONITORING";
        }

        return () => {};
    }, [params]);

    return (
        <Row gutter={[12, 12]}>
            <Col xs={24} sm={24} md={24}>
                <Tabs
                    defaultActiveKey="0"
                    type="card"
                    items={[
                        {
                            key: "0",
                            label: "Module",
                            children: (
                                <TabPermissionModule system={params.system} />
                            ),
                        },
                        {
                            key: "1",
                            label: "User Role",
                            children: (
                                <TabPermissionUserRole system={params.system} />
                            ),
                        },
                    ]}
                />
            </Col>
        </Row>
    );
}
