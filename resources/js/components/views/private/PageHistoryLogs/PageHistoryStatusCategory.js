import { useEffect, useState } from "react";
import { Row, Button, Col, Card, Table, notification, Popconfirm } from "antd";
import { DELETE, GET } from "../../../providers/useAxiosQuery";
import {
    TableGlobalSearch,
    TablePageSize,
    TablePagination,
    TableShowingEntries,
} from "../../../providers/CustomTableFilter";

import notificationErrors from "../../../providers/notificationErrors";

export default function PageStatusCategory() {
    const [tableFilter, setTableFilter] = useState({
        page: 1,
        page_size: 50,
        search: "",
        sort_field: "created_at",
        sort_order: "desc",
    });

    const { data: dataSource, refetch: refetchSource } = GET(
        `api/ref_status_category?${new URLSearchParams(tableFilter)}`,
        "status_category_list"
    );

    const onChangeTable = (pagination, filters, sorter) => {
        setTableFilter((prevState) => ({
            ...prevState,
            sort_field: sorter.columnKey,
            sort_order: sorter.order ? sorter.order.replace("end", "") : null,
            page: 1,
            page_size: "50",
        }));
    };

    useEffect(() => {
        if (dataSource) {
            refetchSource();
        }

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableFilter]);

    const {
        mutate: mutateDeleteStatusCategory,
        loading: loadingDeleteStatusCategory,
    } = DELETE(`api/ref_status_category`, "status_category_list");

    const handleDelete = (record) => {
        mutateDeleteStatusCategory(record, {
            onSuccess: (res) => {
                console.log("res", res);
                if (res.success) {
                    notification.success({
                        message: "Status Category",
                        description: res.message,
                    });
                } else {
                    notification.error({
                        message: "Status Category",
                        description: res.message,
                    });
                }
            },
            onError: (err) => {
                notificationErrors(err);
            },
        });
    };

    return (
        <Row gutter={[12, 12]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Row gutter={[12, 12]}>
                    <Col xs={24} sm={24} md={24}>
                        <div className="tbl-top-filter">
                            <TablePageSize
                                tableFilter={tableFilter}
                                setTableFilter={setTableFilter}
                            />
                            <TableGlobalSearch
                                tableFilter={tableFilter}
                                setTableFilter={setTableFilter}
                            />
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={24}>
                        <Table
                            className="ant-table-default ant-table-striped"
                            dataSource={dataSource && dataSource.data.data}
                            rowKey={(record) => record.id}
                            pagination={false}
                            bordered={false}
                            onChange={onChangeTable}
                            scroll={{ x: "max-content" }}
                        >
                            <Table.Column
                                title="Status Category"
                                key="status_category"
                                dataIndex="status_category"
                                sorter={true}
                            />
                            <Table.Column
                                title="Code"
                                key="code"
                                dataIndex="code"
                                sorter={true}
                            />
                        </Table>
                    </Col>
                    <Col xs={24} sm={24} md={24}>
                        <div className="tbl-bottom-filter">
                            <TableShowingEntries />
                            <TablePagination
                                tableFilter={tableFilter}
                                setTableFilter={setTableFilter}
                                setPaginationTotal={dataSource?.data.total}
                                showLessItems={true}
                                showSizeChanger={false}
                                tblIdWrapper="tbl_wrapper"
                            />
                        </div>
                    </Col>{" "}
                </Row>
            </Col>
        </Row>
    );
}
