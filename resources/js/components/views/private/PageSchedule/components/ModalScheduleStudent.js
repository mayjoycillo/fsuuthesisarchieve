import { useState } from "react";
import { Card, Form, Modal, Row, Col, Button } from "antd";
import Draggable from "react-draggable";

import FloatSelect from "../../../../providers/FloatSelect";
import { GET, POST } from "../../../../providers/useAxiosQuery";
import ScheduleStudent from "./ModalScheduleFormComponents/ScheduleStudent";

export default function ModalScheduleStudent(props) {
    const [form] = Form.useForm();
    const [formDisabled, setFormDisabled] = useState(false);

    const { toggleModalScheduleStudent, setToggleModalScheduleStudent } = props;

    const { disabled, setDisabled } = props;
    const { bounds, setBounds } = props;
    const { draggleRef } = props;
    const { onStart } = props;

    const { mutate: mutateSchedule, loading: loadingSchedule } = POST(
        `api/schedule_day_time`,
        "schedule_day_time_list"
    );

    const { data: dataSchedules } = GET(
        `api/scheduling`,
        "scheduling_select",
        (res) => {},
        false
    );

    const { data: dataDays } = GET(
        `api/ref_day_schedule`,
        "day_schedule_select",
        (res) => {},
        false
    );

    const { data: dataTimes } = GET(
        `api/ref_time_schedule`,
        "time_schedule_select",
        (res) => {},
        false
    );

    return (
        <Modal
            className="w-750"
            title={
                <div
                    style={{
                        width: "100%",
                        cursor: "move",
                    }}
                    onMouseOver={() => {
                        if (disabled) {
                            setDisabled(false);
                        }
                    }}
                    onMouseOut={() => {
                        setDisabled(true);
                    }}
                >
                    FORM FACULTY SCHEDULE
                </div>
            }
            open={toggleModalScheduleStudent.open}
            onCancel={() => {
                setToggleModalScheduleStudent({
                    open: false,
                    data: null,
                });
                form.resetFields();
            }}
            modalRender={(modal) => (
                <Draggable
                    disabled={disabled}
                    bounds={bounds}
                    nodeRef={draggleRef}
                    onStart={(event, uiData) => onStart(event, uiData)}
                >
                    <div ref={draggleRef}>{modal}</div>
                </Draggable>
            )}
            forceRender
            footer={[
                <Button
                    className="btn-main-primary outlined"
                    size="large"
                    key={1}
                    onClick={() => {
                        setToggleModalScheduleStudent({
                            open: false,
                            data: null,
                        });
                        form.resetFields();
                    }}
                >
                    CANCLE
                </Button>,
                <Button
                    className="btn-main-primary"
                    type="primary"
                    size="large"
                    key={2}
                    onClick={() => form.submit()}
                    loading={loadingSchedule}
                >
                    SUBMIT
                </Button>,
            ]}
        >
            <Form
                form={form}
                initialValues={{
                    scheduledaytime_list: [""],
                }}
            >
                <Row gutter={[12, 0]}>
                    <Col xs={24} sm={24} md={24} lg={11} xl={11}>
                        <Form.Item name="day_id">
                            <FloatSelect
                                label="Day Schedule"
                                placeholder="Day Schedule"
                                allowClear
                                required={true}
                                options={
                                    dataDays
                                        ? dataDays.data.map((item) => {
                                              return {
                                                  label: item.name,
                                                  value: item.id,
                                              };
                                          })
                                        : []
                                }
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={11} xl={11}>
                        <Form.Item name="time_id">
                            <FloatSelect
                                label="Time Schedule"
                                placeholder="Time Schedule"
                                allowClear
                                required={true}
                                options={
                                    dataTimes
                                        ? dataTimes.data.map((item) => {
                                              const label = `${item.time_in} - ${item.time_out} ${item.meridiem}`;
                                              return {
                                                  label: label,
                                                  value: item.id,
                                              };
                                          })
                                        : []
                                }
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={11} xl={11}>
                        <Form.Item name="section_id">
                            <FloatSelect
                                label="Section"
                                placeholder="Section"
                                allowClear
                                required={true}
                                options={
                                    dataSchedules
                                        ? dataSchedules.data.map((item) => {
                                              return {
                                                  label: item.section,
                                                  value: item.id,
                                              };
                                          })
                                        : []
                                }
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <ScheduleStudent
                        formDisabled={formDisabled}
                        location={location}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}
