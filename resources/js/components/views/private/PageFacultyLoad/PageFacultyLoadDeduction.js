import { useEffect, useState } from "react";
import {
    Row,
    Col,
    Form,
    Table,
    DatePicker,
    Select,
    Button,
    Tooltip,
} from "antd";
import { GET } from "../../../providers/useAxiosQuery";
import {
    TableGlobalSearch,
    TablePageSize,
    TablePagination,
    TableShowingEntries,
} from "../../../providers/CustomTableFilter";
import { role } from "../../../providers/companyInfo";
import {
    faCalculator,
    faFileSpreadsheet,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalFormDeduction from "./components/ModalFormDeduction";
import ModalFormExcelPrint from "./components/ModalFormExcelPrint";

export default function PageFacultyLoadDeduction() {
    const [form] = Form.useForm();

    const [toggleModalExcelPrint, setToggleModalExcelPrint] = useState(false);

    const [toggleModalFormDeduction, setToggleModalFormDeduction] = useState({
        open: false,
        data: null,
    });

    const [tableFilter, setTableFilter] = useState({
        page: 1,
        page_size: 50,
        search: "",
        sort_field: "created_at",
        sort_order: "desc",
        from: "page_faculty_load_deduction",
        department_id: "",
    });

    const { data: dataSource, refetch: refetchSource } = GET(
        `api/faculty_load_monitoring?${new URLSearchParams(tableFilter)}`,
        "faculty_load_deduction_list"
    );

    const { data: dataDepartments } = GET(
        `api/ref_department`,
        "department_status",
        (res) => {},
        false
    );

    const onChangeTable = (pagination, filters, sorter) => {
        setTableFilter((ps) => ({
            ...ps,
            sort_field: sorter.columnKey,
            sort_order: sorter.order ? sorter.order.replace("end", "") : null,
            page: 1,
            page_size: "50",
        }));
    };

    const handleDeduction = (values) => {};

    useEffect(() => {
        if (dataSource) {
            refetchSource();
        }

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableFilter]);

    return (
        <Row gutter={[12, 12]} id="tbl_wrapper">
            <Col xs={24} sm={24} md={24} lg={24} className="filter-select">
                <Form form={form}>
                    <Row gutter={[12, 0]}>
                        <Col xs={24} sm={12} md={12} lg={6}>
                            <Form.Item name="date_range">
                                <DatePicker.RangePicker
                                    size="large"
                                    className="w-100"
                                    onChange={(value) => {
                                        console.log("value", value);
                                        setTableFilter((ps) => ({
                                            ...ps,
                                            date_range: value ? value : "",
                                        }));
                                    }}
                                />
                            </Form.Item>
                        </Col>

                        {role() !== 3 ? (
                            <Col xs={24} sm={12} md={12} lg={6}>
                                <Form.Item name="department_id">
                                    <Select
                                        placeholder="Department"
                                        className="w-100"
                                        size="large"
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
                                            setTableFilter((ps) => ({
                                                ...ps,
                                                department_id: value
                                                    ? value
                                                    : "",
                                            }));
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        ) : null}
                    </Row>
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
                        align="center"
                        render={(_, record) => {
                            return (
                                <Tooltip title="Deduction">
                                    <Button
                                        icon={
                                            <FontAwesomeIcon
                                                icon={faCalculator}
                                            />
                                        }
                                        type="link"
                                        className="btn-main-primary"
                                        onClick={() =>
                                            setToggleModalFormDeduction({
                                                open: true,
                                                data: record,
                                            })
                                        }
                                    />
                                </Tooltip>
                            );
                        }}
                    />

                    <Table.Column
                        title="Name"
                        key="fullname"
                        dataIndex="fullname"
                        sorter
                    />

                    <Table.Column
                        title="Total Time Absent"
                        key="time_total_absent"
                        dataIndex="time_total_absent"
                        sorter
                    />

                    <Table.Column
                        title="Total Time Absent (Decimal)"
                        key="time_total_absent_decimal"
                        dataIndex="time_total_absent_decimal"
                        sorter
                    />

                    <Table.Column
                        title="Rate"
                        key="rate"
                        dataIndex="rate"
                        sorter
                        render={(text, _) => (
                            <span className="text-primary">
                                {text ? `Php ${text}` : ""}
                            </span>
                        )}
                    />

                    <Table.Column
                        title="Deduction"
                        key="total_deduction"
                        dataIndex="total_deduction"
                        sorter
                        render={(text, _) => (
                            <b className="text-danger">
                                {text ? `Php ${text}` : ""}
                            </b>
                        )}
                    />

                    <Table.Column
                        title="Date Scheduled"
                        key="created_at_format"
                        dataIndex="created_at_format"
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

            <ModalFormDeduction
                toggleModalFormDeduction={toggleModalFormDeduction}
                setToggleModalFormDeduction={setToggleModalFormDeduction}
            />

            <ModalFormExcelPrint
                toggleModalExcelPrint={toggleModalExcelPrint}
                setToggleModalExcelPrint={setToggleModalExcelPrint}
                from="Faculty Load Deduction"
            />
        </Row>
    );
}
