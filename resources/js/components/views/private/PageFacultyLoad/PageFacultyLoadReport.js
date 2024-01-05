import { useEffect, useState } from "react";
import { Row, Button, Col, Table, Form, Tooltip, Select } from "antd";
import { GET } from "../../../providers/useAxiosQuery";
import {
    TableGlobalSearch,
    TablePageSize,
    TablePagination,
    TableShowingEntries,
} from "../../../providers/CustomTableFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBalanceScale,
    faCheckCircle,
    faFileSpreadsheet,
    faFolderImage,
} from "@fortawesome/pro-regular-svg-icons";
import { role } from "../../../providers/companyInfo";
import ModalFormReportUpdateRemarks from "./components/ModalFormReportUpdateRemarks";
import ModalFormFacultyLoadEndorseForApproval from "./components/ModalFormFacultyLoadEndorseForApproval";
import ModalFormFacultyLoadReportAttachment from "./components/ModalFormFacultyLoadReportAttachment";
import ModalFormFacultyLoadJustificationAttachment from "./components/ModalFormFacultyLoadJustificationAttachment";
import ModalFormExcelPrint from "./components/ModalFormExcelPrint";

export default function PageFacultyLoadReport() {
    const [form] = Form.useForm();

    const [toggleModalExcelPrint, setToggleModalExcelPrint] = useState(false);

    const [toggleModalFormUpdateRemarks, setToggleModalFormUpdateRemarks] =
        useState({
            open: false,
            data: null,
        });

    const [
        toggleModalFormIndorseForApproval,
        setToggleModalFormIndorseForApproval,
    ] = useState({
        open: false,
        data: null,
    });

    const [
        toggleModalFormJustificationAttachment,
        setToggleModalFormJustificationAttachment,
    ] = useState({
        open: false,
        data: [],
    });

    const [tableFilter, setTableFilter] = useState({
        page: 1,
        page_size: 50,
        search: "",
        sort_field: "created_at",
        sort_order: "desc",
        status: "Active",
        from: "page_faculty_load_report",
        building_id: [],
        floor_id: [],
        room_id: [],
        status_id: "",
        department_id: "",
    });

    const { data: dataSource, refetch: refetchSource } = GET(
        `api/faculty_load_monitoring?${new URLSearchParams(tableFilter)}`,
        "faculty_load_monitoring_list"
    );

    const { data: dataBuildings } = GET(
        "api/ref_building",
        "building_select",
        (res) => {}
    );

    const { data: dataFloors } = GET(
        `api/ref_floor`,
        "floor_select",
        (res) => {},
        false
    );

    const [roomFilter, setRoomFilter] = useState({
        from: "PageFacultyMonitoring",
        building_id: "",
        floor_id: "",
    });

    const { data: dataRooms, refetch: refetchRooms } = GET(
        `api/ref_room?${new URLSearchParams(roomFilter)}`,
        "room_selectss",
        (res) => {},
        false
    );

    const { data: dataStatus } = GET(
        `api/ref_status?status_category_id=1`,
        "status_selectss",
        (res) => {},
        false
    );

    const { data: dataDepartments } = GET(
        `api/ref_department`,
        "department_status",
        (res) => {},
        false
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

    useEffect(() => {
        refetchRooms();

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomFilter]);

    return (
        <Row gutter={[12, 12]} id="tbl_wrapper">
            <Col xs={24} sm={24} md={24} lg={24} className="filter-select">
                <Form form={form}>
                    <Form.Item name="building_id">
                        <Select
                            label="Building"
                            placeholder="Building"
                            className="w-100 filter"
                            size="large"
                            showSearch
                            allowClear
                            options={
                                dataBuildings
                                    ? dataBuildings.data.map((item) => {
                                          return {
                                              label: item.building,
                                              value: item.id,
                                          };
                                      })
                                    : []
                            }
                            onChange={(value) => {
                                setTableFilter((prevState) => ({
                                    ...prevState,
                                    building_id: value ? value : "",
                                }));
                                setRoomFilter((prevState) => ({
                                    ...prevState,
                                    building_id: value ? value : "",
                                }));
                                form.resetFields(["room_id"]);
                            }}
                        />
                    </Form.Item>

                    <Form.Item name="floor_id">
                        <Select
                            label="Floor"
                            placeholder="Floor"
                            className="w-100 filter"
                            size="large"
                            allowClear
                            options={
                                dataFloors
                                    ? dataFloors.data.map((item) => {
                                          return {
                                              label: item.floor,
                                              value: item.id,
                                          };
                                      })
                                    : []
                            }
                            onChange={(value) => {
                                setTableFilter((prevState) => ({
                                    ...prevState,
                                    floor_id: value ? value : "",
                                }));
                                setRoomFilter((prevState) => ({
                                    ...prevState,
                                    floor_id: value ? value : "",
                                }));
                                form.resetFields(["room_id"]);
                            }}
                        />
                    </Form.Item>

                    <Form.Item name="room_id">
                        <Select
                            label="Room"
                            placeholder="Room"
                            className="w-100 filter"
                            size="large"
                            allowClear
                            options={
                                dataRooms
                                    ? dataRooms.data.map((item) => {
                                          return {
                                              label: item.room_code,
                                              value: item.id,
                                          };
                                      })
                                    : []
                            }
                            onChange={(value) => {
                                setTableFilter((prevState) => ({
                                    ...prevState,
                                    room_id: value ? value : "",
                                }));
                            }}
                        />
                    </Form.Item>

                    <Form.Item name="status_id">
                        <Select
                            label="Status"
                            placeholder="Status"
                            className="w-100 filter"
                            size="large"
                            allowClear
                            options={
                                dataStatus
                                    ? dataStatus.data.map((item) => {
                                          return {
                                              label: item.status,
                                              value: item.id,
                                          };
                                      })
                                    : []
                            }
                            onChange={(value) => {
                                setTableFilter((prevState) => ({
                                    ...prevState,
                                    status_id: value ? value : "",
                                }));
                            }}
                        />
                    </Form.Item>

                    {role() !== 3 ? (
                        <Form.Item name="department_id">
                            <Select
                                label="Department"
                                placeholder="Department"
                                className="w-100 filter"
                                size="large"
                                allowClear
                                options={
                                    dataDepartments
                                        ? dataDepartments.data.map((item) => {
                                              return {
                                                  label: item.department_name,
                                                  value: item.id,
                                              };
                                          })
                                        : []
                                }
                                onChange={(value) => {
                                    setTableFilter((prevState) => ({
                                        ...prevState,
                                        department_id: value ? value : "",
                                    }));
                                }}
                            />
                        </Form.Item>
                    ) : null}
                </Form>
            </Col>
            <Col xs={24} sm={24} md={24}>
                <Button
                    size="large"
                    className="btn-main-primary"
                    icon={
                        <FontAwesomeIcon
                            icon={faFileSpreadsheet}
                            className="mr-5"
                        />
                    }
                    onClick={() => setToggleModalExcelPrint(true)}
                >
                    Excel Print
                </Button>
            </Col>
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
                        render={(_, record) => {
                            return (
                                <Button
                                    icon={
                                        <FontAwesomeIcon icon={faFolderImage} />
                                    }
                                    type="link"
                                    className="btn-info"
                                    onClick={() =>
                                        setToggleModalFormJustificationAttachment(
                                            {
                                                open: true,
                                                data: record.attachments,
                                            }
                                        )
                                    }
                                />
                            );
                        }}
                    />

                    <Table.Column
                        title="Date Created"
                        key="created_at_format"
                        dataIndex="created_at_format"
                        sorter
                    />

                    <Table.Column
                        title="Status"
                        key="status"
                        dataIndex="status"
                        sorter
                    />

                    {/* <Table.Column
                        title="Remarks"
                        key="remarks"
                        dataIndex="remarks"
                        sorter
                        render={(text, record) => {
                            return (
                                <>
                                    <Tooltip title="Remark">
                                        <Button
                                            icon={
                                                <FontAwesomeIcon
                                                    icon={faEdit}
                                                />
                                            }
                                            type="link"
                                            className="btn-main-primary"
                                            onClick={() =>
                                                setToggleModalFormUpdateRemarks(
                                                    {
                                                        open: true,
                                                        data: record,
                                                    }
                                                )
                                            }
                                        />
                                    </Tooltip>{" "}
                                    {text}
                                </>
                            );
                        }}
                    /> */}

                    <Table.Column
                        title="Justification"
                        key="justification"
                        dataIndex="justification"
                        align="center"
                        render={(text, record) => {
                            let data = {
                                faculty_load_monitoring_id: record.id,
                                ...record.faculty_load_monitoring_justification,
                            };

                            return (
                                <>
                                    {record.faculty_load_monitoring_justification ? (
                                        <Tooltip
                                            title={
                                                record.faculty_load_monitoring_justification
                                                    ? record
                                                          .faculty_load_monitoring_justification
                                                          .code === "S-07"
                                                        ? "For Justification"
                                                        : "Justified"
                                                    : "For Justification"
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={faCheckCircle}
                                                className={
                                                    record.faculty_load_monitoring_justification
                                                        ? record
                                                              .faculty_load_monitoring_justification
                                                              .code === "S-07"
                                                            ? "text-primary"
                                                            : record
                                                                  .faculty_load_monitoring_justification
                                                                  .code ===
                                                              "S-08"
                                                            ? "text-success"
                                                            : "text-danger"
                                                        : ""
                                                }
                                            />
                                        </Tooltip>
                                    ) : null}

                                    <Tooltip
                                        placement="top"
                                        title={
                                            record.faculty_load_monitoring_justification
                                                ? record
                                                      .faculty_load_monitoring_justification
                                                      .code === "S-07"
                                                    ? "Processing"
                                                    : "Updated & Justified"
                                                : "Apply for approval"
                                        }
                                    >
                                        <Button
                                            icon={
                                                <FontAwesomeIcon
                                                    icon={faBalanceScale}
                                                />
                                            }
                                            type="link"
                                            className={
                                                record.faculty_load_monitoring_justification
                                                    ? "btn-disabled"
                                                    : "btn-main-primary"
                                            }
                                            onClick={() => {
                                                if (
                                                    !record.faculty_load_monitoring_justification
                                                ) {
                                                    setToggleModalFormIndorseForApproval(
                                                        {
                                                            open: true,
                                                            data: data,
                                                        }
                                                    );
                                                }
                                            }}
                                        />
                                    </Tooltip>
                                </>
                            );
                        }}
                    />

                    <Table.Column
                        title="Justification Status"
                        key="status_update"
                        dataIndex="status_update"
                        sorter
                    />

                    <Table.Column
                        title="Justification Remarks"
                        key="update_remarks"
                        dataIndex="update_remarks"
                        sorter
                    />

                    <Table.Column
                        title="Name"
                        key="fullname"
                        dataIndex="fullname"
                        sorter
                    />
                    <Table.Column
                        title="Time"
                        key="time"
                        dataIndex="time"
                        sorter
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

            <ModalFormReportUpdateRemarks
                toggleModalFormUpdateRemarks={toggleModalFormUpdateRemarks}
                setToggleModalFormUpdateRemarks={
                    setToggleModalFormUpdateRemarks
                }
            />
            <ModalFormFacultyLoadEndorseForApproval
                toggleModalFormIndorseForApproval={
                    toggleModalFormIndorseForApproval
                }
                setToggleModalFormIndorseForApproval={
                    setToggleModalFormIndorseForApproval
                }
            />
            <ModalFormFacultyLoadJustificationAttachment
                toggleModalFormJustificationAttachment={
                    toggleModalFormJustificationAttachment
                }
                setToggleModalFormJustificationAttachment={
                    setToggleModalFormJustificationAttachment
                }
            />
            <ModalFormExcelPrint
                toggleModalExcelPrint={toggleModalExcelPrint}
                setToggleModalExcelPrint={setToggleModalExcelPrint}
                from="Faculty Load Report"
            />
        </Row>
    );
}
