import { Row, Button, Col, Table, Form } from "antd";
import { useEffect, useState } from "react";
import { GET } from "../../../providers/useAxiosQuery";
import {
    TableGlobalSearch,
    TablePageSize,
    TablePagination,
    TableShowingEntries,
} from "../../../providers/CustomTableFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faFileSpreadsheet,
    faFolderImage,
} from "@fortawesome/pro-regular-svg-icons";
import { role } from "../../../providers/companyInfo";
import ModalFormFacultyLoadJustification from "./components/ModalFormFacultyLoadJustification";
import ModalFormFacultyLoadJustificationAttachment from "./components/ModalFormFacultyLoadJustificationAttachment";
import ModalFormExcelPrint from "./components/ModalFormExcelPrint";

export default function PageFacultyLoadJustification() {
    const [form] = Form.useForm();

    const [toggleModalExcelPrint, setToggleModalExcelPrint] = useState(false);

    const [toggleModalFormJustification, setToggleModalFormJustification] =
        useState({
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
        from: "page_faculty_load_justification",
        building_id: [],
        floor_id: [],
        room_id: [],
        status_id: "",
        department_id: role() === 3 ? 1 : "",
    });

    const { data: dataSource, refetch: refetchSource } = GET(
        `api/flm_justification?${new URLSearchParams(tableFilter)}`,
        "flm_justification_list"
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
        // console.log(
        // 	"onChangeTable pagination, filters, sorter",
        // 	pagination,
        // 	filters,
        // 	sorter
        // );
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
            {/* <Col xs={24} sm={24} md={24} lg={24}>
                <Form form={form}>
                    <Row gutter={[12, 0]}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                            <Form.Item name="building_id">
                                <FloatSelect
                                    label="Building"
                                    placeholder="Building"
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
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                            <Form.Item name="floor_id">
                                <FloatSelect
                                    label="Floor"
                                    placeholder="Floor"
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
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                            <Form.Item name="room_id">
                                <FloatSelect
                                    label="Room"
                                    placeholder="Room"
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
                        </Col>

                        {role() !== 3 ? (
                            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                                <Form.Item name="department_id">
                                    <FloatSelect
                                        label="Department"
                                        placeholder="Department"
                                        allowClear
                                        options={
                                            dataDepartments
                                                ? dataDepartments.data.map(
                                                      (item) => {
                                                          return {
                                                              label: item.department_name,
                                                              value: item.id,
                                                          };
                                                      }
                                                  )
                                                : []
                                        }
                                        onChange={(value) => {
                                            setTableFilter((prevState) => ({
                                                ...prevState,
                                                department_id: value
                                                    ? value
                                                    : "",
                                            }));
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        ) : null}

                        <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                            <Form.Item name="status_id">
                                <FloatSelect
                                    label="Status"
                                    placeholder="Status"
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
                        </Col>
                    </Row>
                </Form>
            </Col>
             */}

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
                                <>
                                    <Button
                                        icon={<FontAwesomeIcon icon={faEdit} />}
                                        type="link"
                                        className="btn-main-primary"
                                        onClick={() =>
                                            setToggleModalFormJustification({
                                                open: true,
                                                data: record,
                                            })
                                        }
                                    />

                                    <Button
                                        icon={
                                            <FontAwesomeIcon
                                                icon={faFolderImage}
                                            />
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
                                </>
                            );
                        }}
                    />

                    <Table.Column
                        title="Status"
                        key="status"
                        dataIndex="status"
                        sorter
                    />
                    <Table.Column
                        title="Remarks"
                        key="remaks_new"
                        dataIndex="remaks_new"
                        sorter
                    />

                    <Table.Column
                        title="Name"
                        key="fullname"
                        dataIndex="fullname"
                        sorter
                    />

                    <Table.Column
                        title="Approved By"
                        key="approved_by_name"
                        dataIndex="approved_by_name"
                        sorter
                    />

                    <Table.Column
                        title="Date Approved"
                        key="date_approved"
                        dataIndex="date_approved"
                        sorter
                    />

                    <Table.Column
                        title="Date Scheduled"
                        key="date_reported"
                        dataIndex="date_reported"
                        sorter
                    />

                    <Table.Column
                        title="Time Scheduled"
                        key="time"
                        dataIndex="time"
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

            <ModalFormFacultyLoadJustification
                toggleModalFormJustification={toggleModalFormJustification}
                setToggleModalFormJustification={
                    setToggleModalFormJustification
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
                from="Faculty Load Justification"
            />
        </Row>
    );
}
