import { useEffect, useState, useRef } from "react";
import { Row, Button, Col, Table, notification, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus, faTrash } from "@fortawesome/pro-regular-svg-icons";

import notificationErrors from "../../../providers/notificationErrors";
import ModalSchedule from "./components/ModalScheduleForm";

export default function PageScheduleScheduling() {
    const [toggleModalForm, setToggleModalForm] = useState({
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
            semester: "First Semester",
            year: "2022-2023",
        },
        {
            key: "2",
            department: "Computer Science",
            section: "BLIS 2-BLIS21",
            subject: "LIS 283",
            room: "CB 227",
            semester: "First Semester",
            year: "2022-2023",
        },
        {
            key: "3",
            department: "Computer Science",
            section: "BSCS 3-CS311",
            subject: "GE 119",
            room: "CB 220",
            semester: "First Semester",
            year: "2022-2023",
        },
    ];

    return (
        <Row gutter={[12, 12]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Button
                    className=" btn-main-primary btn-main-invert-outline b-r-none"
                    icon={<FontAwesomeIcon icon={faPlus} />}
                    onClick={() =>
                        setToggleModalForm({
                            open: true,
                            data: null,
                        })
                    }
                    size="large"
                >
                    Add Schedule
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
                                                    setToggleModalForm({
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
                                                            "Data was not deleted",
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
                                sorter={true}
                                defaultSortOrder="ascend"
                                dataIndex="department"
                            />
                            <Table.Column
                                title="Section"
                                sorter={true}
                                defaultSortOrder="ascend"
                                dataIndex="section"
                            />
                            <Table.Column
                                title="Subject"
                                sorter={true}
                                defaultSortOrder="ascend"
                                dataIndex="subject"
                            />
                            <Table.Column
                                title="Room"
                                sorter={true}
                                defaultSortOrder="ascend"
                                dataIndex="room"
                            />
                            <Table.Column
                                title="Semester"
                                sorter={true}
                                defaultSortOrder="ascend"
                                dataIndex="semester"
                            />
                            <Table.Column
                                title="School Year"
                                sorter={true}
                                defaultSortOrder="ascend"
                                dataIndex="year"
                            />
                        </Table>
                    </Col>
                </Row>
            </Col>
            <ModalSchedule
                toggleModalForm={toggleModalForm}
                setToggleModalForm={setToggleModalForm}
                disabled={disabled}
                setDisabled={setDisabled}
                bounds={bounds}
                draggleRef={draggleRef}
                onStart={onStart}
            />
        </Row>
    );
}
