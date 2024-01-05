import { Button, Col, Form, Row, Popconfirm, Radio, Space, Upload } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faInbox,
    faPlus,
    faTrashAlt,
} from "@fortawesome/pro-regular-svg-icons";

import FloatInput from "../../../../providers/FloatInput";
import FloatDatePicker from "../../../../providers/FloatDatePicker";
import FloatSelect from "../../../../providers/FloatSelect";

export default function EmployeeFormTrainingCertificateInfo(props) {
    const { formDisabled } = props;

    const RenderInput = (props) => {
        const { formDisabled, name, restField, fields, remove } = props;

        return (
            <Row gutter={[12, 0]}>
                <Col xs={24} sm={12} md={12} lg={5} xl={5}>
                    <Form.Item {...restField} name={[name, "title"]}>
                        <FloatInput
                            label="Title"
                            placeholder="Title"
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={5} xl={5}>
                    <Form.Item {...restField} name={[name, "description"]}>
                        <FloatInput
                            label="Description"
                            placeholder="Description"
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={5} xl={5}>
                    <Form.Item {...restField} name={[name, "provider"]}>
                        <FloatInput
                            label="Provider"
                            placeholder="Provider"
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={5} xl={5}>
                    <Form.Item
                        {...restField}
                        name={[name, "type_of_certificate"]}
                    >
                        <FloatSelect
                            label="Type Of Certificate"
                            placeholder="Type Of Certificate"
                            disabled={formDisabled}
                            options={[
                                {
                                    value: "Attendance",
                                    label: "Attendance",
                                },
                                {
                                    value: "Commendation",
                                    label: "Commendation",
                                },
                                {
                                    value: "Participation",
                                    label: "Participation",
                                },
                                {
                                    value: "Recognition",
                                    label: "Recognition",
                                },
                            ]}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={5} xl={5}>
                    <Form.Item
                        {...restField}
                        name={[name, "level_of_certification"]}
                    >
                        <FloatSelect
                            label="Level Of Certificate"
                            placeholder="Level Of Certificate"
                            disabled={formDisabled}
                            options={[
                                {
                                    value: "Local",
                                    label: "Local",
                                },
                                {
                                    value: "National",
                                    label: "National",
                                },
                                {
                                    value: "International",
                                    label: "International",
                                },
                            ]}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={5} xl={5}>
                    <Form.Item
                        {...restField}
                        name={[name, "date_start_covered"]}
                    >
                        <FloatDatePicker
                            label="Date Start Covered"
                            placeholder="Date Start Covered"
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={5} xl={5}>
                    <Form.Item {...restField} name={[name, "date_end_covered"]}>
                        <FloatDatePicker
                            label="Date End Covered"
                            placeholder="Date End Covered"
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={1} xl={1}>
                    <div className="action">
                        <div />
                        {fields.length > 1 ? (
                            <Popconfirm
                                title="Are you sure to delete this address?"
                                onConfirm={() => {
                                    // handleDeleteQuestion(name);
                                    remove(name);
                                }}
                                onCancel={() => {}}
                                okText="Yes"
                                cancelText="No"
                                placement="topRight"
                                okButtonProps={{
                                    className: "btn-main-invert",
                                }}
                            >
                                <Button
                                    type="link"
                                    className="form-list-remove-button p-0"
                                >
                                    <FontAwesomeIcon
                                        icon={faTrashAlt}
                                        className="fa-lg"
                                    />
                                </Button>
                            </Popconfirm>
                        ) : null}
                    </div>
                </Col>

                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item
                        {...restField}
                        name={[name, "files"]}
                        noStyle
                        valuePropName="fileList"
                        getValueFromEvent={(e) => {
                            console.log("Upload event:", e);
                            if (Array.isArray(e)) {
                                return e;
                            }
                            return e?.fileList;
                        }}
                    >
                        <Upload.Dragger>
                            <p className="ant-upload-drag-icon">
                                <FontAwesomeIcon icon={faInbox} />
                            </p>
                            <p className="ant-upload-text">
                                Click or drag file to this area to upload
                            </p>
                            <p className="ant-upload-hint">
                                Support for a single or bulk upload.
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Col>
            </Row>
        );
    };

    return (
        <Row gutter={[12, 12]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.List name="training_certificate_list">
                    {(fields, { add, remove }) => (
                        <Row gutter={[12, 0]}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                {fields.map(
                                    ({ key, name, ...restField }, index) => (
                                        <div
                                            key={key}
                                            className={`${
                                                index !== 0 ? "mt-25" : ""
                                            }`}
                                        >
                                            <RenderInput
                                                formDisabled={formDisabled}
                                                name={name}
                                                restField={restField}
                                                fields={fields}
                                                remove={remove}
                                            />
                                        </div>
                                    )
                                )}
                            </Col>

                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Button
                                    type="link"
                                    className="btn-main-primary p-0"
                                    icon={<FontAwesomeIcon icon={faPlus} />}
                                    onClick={() => add()}
                                >
                                    Add Another Trainig Certificate
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form.List>
            </Col>
        </Row>
    );
}
