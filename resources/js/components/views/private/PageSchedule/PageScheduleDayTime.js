import { Row, Button, Col, Table, notification, Popconfirm, Card } from "antd";
import { useEffect, useRef, useState } from "react";
import { DELETE, GET } from "../../../providers/useAxiosQuery";
import {
    TableGlobalSearch,
    TablePageSize,
    TablePagination,
    TableShowingEntries,
} from "../../../providers/CustomTableFilter";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus, faTrash } from "@fortawesome/pro-regular-svg-icons";
import notificationErrors from "../../../providers/notificationErrors";
import ModalScheduleDayTime from "./components/ModalScheduleDayTime";

export default function PageScheduleDayTime() {
    const [toggleModalFormDayTime, setToggleModalFormDayTime] = useState({
        open: false,
        data: null,
    });

    const [disabled, setDisabled] = useState(true);
    const [bounds, setBounds] = useState({
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    });

    const draggleRef = useRef(null);

    const onStart = (_event, uiData) => {
        const { clientWidth, clientHeight } = window.document.documentElement;
        const targetRect = draggleRef.current?.getBoundingClientRect();
        if (!targetRect) {
            return;
        }
        setBounds({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
    };

    const dataSource = [
        {
            key: "1",
            department: "Computer Science",
            section: "BSIT 1-IT11",
            subject: "IT 180",
            room: "CB 219",
            day: "Monday",
            time: "7:00-8:00",
            meridiem: "AM",
            semester: "First Semester",
            year: "2022-2023",
        },
        {
            key: "2",
            department: "Computer Science",
            section: "BLIS 2-BLIS21",
            subject: "LIS 283",
            room: "CB 227",
            day: "Monday",
            time: "7:00-8:00",
            meridiem: "AM",
            semester: "First Semester",
            year: "2022-2023",
        },
        {
            key: "3",
            department: "Computer Science",
            section: "BSCS 3-CS311",
            subject: "GE 119",
            room: "CB 220",
            day: "Monday",
            time: "7:00-8:00",
            meridiem: "AM",
            semester: "First Semester",
            year: "2022-2023",
        },
    ];

    // const { data: dataSource, refetch: refetchSource } = GET(
    //     `api/schedule_day_time?${new URLSearchParams(tableFilter)}`,
    //     "schedule_day_time_list"
    // );

    return (
        <Row gutter={[12, 12]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Button
                    className=" btn-main-primary btn-main-invert-outline b-r-none"
                    icon={<FontAwesomeIcon icon={faPlus} />}
                    onClick={() =>
                        setToggleModalFormDayTime({
                            open: true,
                            data: null,
                        })
                    }
                    size="large"
                >
                    Add Schedule Day Time
                </Button>
            </Col>

            <Col xs={24} sm={24} md={24}>
                <Row gutter={[12, 12]}>
                    <Col xs={24} sm={24} md={24}>
                        <Table
                            className="ant-table-default ant-table-striped"
                            dataSource={dataSource}
                            bordered={false}
                            scroll={{ x: "max-content" }}
                        >
                            <Table.Column
                                title="Action"
                                key="action"
                                dataIndex="action"
                                align="center"
                                width={150}
                                render={(text, record) => {
                                    return (
                                        <>
                                            <Button
                                                type="link"
                                                className="color-1"
                                                onClick={() =>
                                                    setToggleModalFormDayTime({
                                                        open: true,
                                                        data: record,
                                                    })
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faPencil}
                                                />
                                            </Button>
                                            <Popconfirm
                                                title="Are you sure to delete this data?"
                                                onConfirm={() => {
                                                    handleDelete(record);
                                                }}
                                                onCancel={() => {
                                                    notification.error({
                                                        message: "Schedule",
                                                        description:
                                                            "Data not deleted",
                                                    });
                                                }}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <Button
                                                    type="link"
                                                    className="text-danger"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                    />
                                                </Button>
                                            </Popconfirm>
                                        </>
                                    );
                                }}
                            />
                            <Table.Column
                                title="Department"
                                key="department"
                                dataIndex="department"
                                sorter={true}
                                defaultSortOrder="ascend"
                            />
                            <Table.Column
                                title="Section"
                                key="section"
                                dataIndex="section"
                                sorter={true}
                            />
                            <Table.Column
                                title="Subject"
                                key="subject"
                                dataIndex="subject"
                                sorter={true}
                            />
                            <Table.Column
                                title="Room No."
                                key="room"
                                dataIndex="room"
                                sorter={true}
                            />
                            <Table.Column
                                title="Day"
                                key="day"
                                dataIndex="day"
                                sorter={true}
                            />
                            <Table.Column
                                title="Time"
                                key="time"
                                dataIndex="time"
                                sorter={true}
                            />
                            <Table.Column
                                title="Meridiem"
                                key="meridiem"
                                dataIndex="meridiem"
                                sorter={true}
                            />
                            <Table.Column
                                title="Semester"
                                key="semester"
                                dataIndex="semester"
                                sorter={true}
                            />
                            {/* <Table.Column
                                title="School Year"
                                key="school_year"
                                dataIndex="school_year"
                                sorter={true}
                            />
                            <Table.Column
                                title="Max Slot"
                                key="max_slot"
                                dataIndex="max_slot"
                                sorter={true}
                            /> */}
                        </Table>
                    </Col>
                </Row>
            </Col>
            <ModalScheduleDayTime
                toggleModalFormDayTime={toggleModalFormDayTime}
                setToggleModalFormDayTime={setToggleModalFormDayTime}
                disabled={disabled}
                setDisabled={setDisabled}
                bounds={bounds}
                draggleRef={draggleRef}
                onStart={onStart}
            />
        </Row>
    );
}
