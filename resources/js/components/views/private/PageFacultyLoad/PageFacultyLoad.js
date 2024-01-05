import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Button, Col, Table, notification, Popconfirm } from "antd";
import { DELETE, GET } from "../../../providers/useAxiosQuery";
import {
    TableGlobalSearch,
    TablePageSize,
    TablePagination,
    TableShowingEntries,
} from "../../../providers/CustomTableFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/pro-regular-svg-icons";
import ModalFormFacultyLoad from "./components/ModalFormFacultyLoad";
import notificationErrors from "../../../providers/notificationErrors";

export default function PageFacultyLoad() {
    const navigate = useNavigate();

    const [toggleModalFormFacultyLoad, setToggleModalFormFacultyLoad] =
        useState({
            open: false,
            data: null,
        });

    const [tableFilter, setTableFilter] = useState({
        page: 1,
        page_size: 50,
        search: "",
        sort_field: "created_at",
        sort_order: "desc",
        status: "Active",
    });

    const { data: dataSource, refetch: refetchSource } = GET(
        `api/faculty_load?${new URLSearchParams(tableFilter)}`,
        "faculty_load_list"
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
        mutate: mutateDeleteFacultyLoad,
        loading: loadingDeleteFacultyLoad,
    } = DELETE(`api/faculty_load`, "faculty_load_list");

    const handleDelete = (record) => {
        mutateDeleteFacultyLoad(record, {
            onSuccess: (res) => {
                console.log("res", res);
                if (res.success) {
                    notification.success({
                        message: "Facmutate Load",
                        description: res.message,
                    });
                } else {
                    notification.error({
                        message: "Facmutate Load",
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
        <Row gutter={[12, 12]} id="tbl_wrapper">
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
                        title="Action"
                        key="action"
                        dataIndex="action"
                        align="center"
                        render={(text, record) => {
                            return (
                                <>
                                    <Button
                                        type="link"
                                        className="color-1"
                                        onClick={() => {
                                            setToggleModalFormFacultyLoad({
                                                open: true,
                                                data: record,
                                            });
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPencil} />
                                    </Button>
                                    <Popconfirm
                                        title="Are you sure to delete this data?"
                                        onConfirm={() => {
                                            handleDelete(record);
                                        }}
                                        onCancel={() => {
                                            notification.error({
                                                message: "Faculty Load",
                                                description: "Data not deleted",
                                            });
                                        }}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button
                                            type="link"
                                            className="text-danger"
                                            loading={loadingDeleteFacultyLoad}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </Popconfirm>
                                </>
                            );
                        }}
                    />
                    <Table.Column
                        title="Class Time Start"
                        key="time_in"
                        dataIndex="time_in"
                        sorter
                    />
                    <Table.Column
                        title="Class Time End"
                        key="time_out"
                        dataIndex="time_out"
                        sorter
                    />
                    <Table.Column
                        title="Meridian"
                        key="meridian"
                        dataIndex="meridian"
                        sorter
                    />
                    <Table.Column
                        title="Name"
                        key="fullname"
                        sorter
                        dataIndex="fullname"
                        width={120}
                    />

                    <Table.Column
                        title="Room"
                        key="room_code"
                        dataIndex="room_code"
                        sorter
                    />
                    <Table.Column
                        title="Subject"
                        key="code"
                        dataIndex="code"
                        sorter
                    />
                    <Table.Column
                        title="School Year"
                        key="school_year"
                        dataIndex="school_year"
                        sorter
                    />
                    <Table.Column
                        title="Semester"
                        key="semester"
                        dataIndex="semester"
                        sorter
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
            </Col>

            <ModalFormFacultyLoad
                toggleModalFormFacultyLoad={toggleModalFormFacultyLoad}
                setToggleModalFormFacultyLoad={setToggleModalFormFacultyLoad}
            />
        </Row>
    );
}
