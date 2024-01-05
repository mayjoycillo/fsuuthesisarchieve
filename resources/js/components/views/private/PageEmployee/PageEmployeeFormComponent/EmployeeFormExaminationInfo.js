import { Row, Col, Form, Button, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/pro-regular-svg-icons";

import FloatInput from "../../../../providers/FloatInput";
import FloatDatePicker from "../../../../providers/FloatDatePicker";

import validateRules from "../../../../providers/validateRules";

export default function EmployeeFormExaminationInfo(props) {
    const { formDisabled } = props;

    const RenderInput = (props) => {
        const { formDisabled, name, restField, fields, remove } = props;
        return (
            <Row gutter={[12, 12]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item {...restField} name={[name, "title"]}>
                        <FloatInput
                            label="Title"
                            placeholder="Title"
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>

                <Col xs={23} sm={24} md={5} lg={5} xl={5}>
                    <Form.Item {...restField} name={[name, "exam_rating"]}>
                        <FloatInput
                            label="Rating"
                            placeholder="Rating"
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>

                <Col xs={23} sm={24} md={5} lg={5} xl={5}>
                    <Form.Item {...restField} name={[name, "year"]}>
                        <FloatDatePicker
                            label="Year/Date"
                            placeholder="Year/Date"
                            format="MM/DD/YYYY"
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12} lg={2} xl={2}>
                    <div className="action">
                        <div />
                        {fields.length > 1 ? (
                            <Popconfirm
                                title="Are you sure to delete this?"
                                onConfirm={() => {
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
            </Row>
        );
    };

    return (
        <Row gutter={[12, 12]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.List name="profile_other2">
                    {(fields, { add, remove }) => (
                        <Row gutter={[12, 0]}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                {fields.map(
                                    ({ key, name, ...restField }, index) => (
                                        <div key={key}>
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
                                    Add Examination/s Taken
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form.List>
            </Col>
        </Row>
    );
}
