import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/pro-regular-svg-icons";
import { Button, Col, Form, Row, Popconfirm, Checkbox } from "antd";

import FloatSelect from "../../../../providers/FloatSelect";
import FloatInput from "../../../../providers/FloatInput";
import FloatDatePicker from "../../../../providers/FloatDatePicker";
import FloatInputMask from "../../../../providers/FloatInputMask";
import optionRelationship from "../../../../providers/optionRelationship";

export default function EmployeeFormBenificiaryInfo(props) {
    const { formDisabled } = props;

    const RenderInput = (props) => {
        const { formDisabled, name, restField, fields, remove } = props;

        return (
            <Row gutter={[12, 0]}>
                <Col xs={24} sm={12} md={12} lg={7} xl={7}>
                    <Form.Item {...restField} name={[name, "fullname"]}>
                        <FloatInput
                            label="Fullname"
                            placeholder="Fullname"
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={7} xl={7}>
                    <Form.Item {...restField} name={[name, "birthdate"]}>
                        <FloatDatePicker
                            label="Birthdate"
                            placeholder="Birthdate"
                            format="MM/DD/YYYY"
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={7} xl={7}>
                    <Form.Item
                        {...restField}
                        name={[name, "contact_number"]}
                        // rules={[validateRules.required]}
                    >
                        <FloatInputMask
                            label="Contact Number"
                            placeholder="Contact Number"
                            maskType="999 9999 999"
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={3} xl={3}>
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

                <Col xs={24} sm={12} md={12} lg={7} xl={7}>
                    <Form.Item {...restField} name={[name, "relationship"]}>
                        <FloatSelect
                            label="Relationship"
                            placeholder="Relationship"
                            options={optionRelationship}
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={7} xl={7}>
                    <Form.Item {...restField} name={[name, "start_date"]}>
                        <FloatDatePicker
                            label="Start Date"
                            placeholder="Start Date"
                            disabled={formDisabled}
                            format="MM/DD/YYYY"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={7} xl={7}>
                    <Form.Item {...restField} name={[name, "end_date"]}>
                        <FloatDatePicker
                            label="End Date"
                            placeholder="End Date"
                            disabled={formDisabled}
                            format="MM/DD/YYYY"
                        />
                    </Form.Item>
                </Col>
            </Row>
        );
    };

    return (
        <Row gutter={[12, 12]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.List name="benificiary_list">
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
                                    Add Another Benificiary
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form.List>
            </Col>
        </Row>
    );
}
