import { useEffect, useState } from "react";
import { Button, Form, Modal, notification, Row, Col } from "antd";
import Draggable from "react-draggable";

import FloatSelect from "../../../../providers/FloatSelect";
import { GET } from "../../../../providers/useAxiosQuery";
import ScheduleForm from "./ModalScheduleFormComponents/ScheduleForm";

export default function ModalScheduleForm(props) {
    const [form] = Form.useForm();
    const [formDisabled, setFormDisabled] = useState(false);

    const { toggleModalForm, setToggleModalForm } = props;
    const { disabled, setDisabled } = props;
    const { bounds, setBounds } = props;
    const { draggleRef } = props;
    const { onStart } = props;

    const { data: dataDepartments } = GET(
        `api/ref_department`,
        "department_select",
        (res) => {},
        false
    );

    const { data: dataSections } = GET(
        `api/ref_section`,
        "section_select",
        (res) => {},
        false
    );

    return (
        <Modal
            wrapClassName="modal-schedule-form"
            className="w-750"
            mask={false}
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
                    FORM SCHEDULE
                </div>
            }
            open={toggleModalForm.open}
            onCancel={() => {
                setToggleModalForm({
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
                        setToggleModalForm({
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
                >
                    SUBMIT
                </Button>,
            ]}
        >
            <Form
                form={form}
                initialValues={{
                    schedule_list: [""],
                }}
            >
                <Row gutter={[12, 0]}>
                    <Col xs={24} sm={24} md={24} lg={11} xl={11}>
                        <Form.Item name="department_id">
                            <FloatSelect
                                label="Department"
                                placeholder="Department"
                                allowClear
                                required={true}
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
                                    dataSections
                                        ? dataSections.data.map((item) => {
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
                    <ScheduleForm
                        formDisabled={formDisabled}
                        location={location}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}
