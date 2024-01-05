import { Button, Col, Form, Row, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/pro-regular-svg-icons";
import FloatInput from "../../../../providers/FloatInput";
import FloatDatePicker from "../../../../providers/FloatDatePicker";
import FloatSelect from "../../../../providers/FloatSelect";
import FloatInputNumber from "../../../../providers/FloatInputNumber";

export default function EmployeeFormWorkExperienceInfo(props) {
    const { formDisabled, dataPosition } = props;

    const RenderInput = (props) => {
        const { formDisabled, name, restField, fields, remove } = props;

        return (
            <Row gutter={[12, 0]}>
                <Col xs={24} sm={12} md={12} lg={5} xl={5}>
                    <Form.Item {...restField} name={[name, "employer_name"]}>
                        <FloatInput
                            label="Employer Name"
                            placeholder="Employer Name"
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={5} xl={5}>
                    <Form.Item {...restField} name={[name, "govt_service"]}>
                        <FloatInput
                            label="Govt Service"
                            placeholder="Govt Service"
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={5} xl={5}>
                    <Form.Item {...restField} name={[name, "start_date"]}>
                        <FloatDatePicker
                            label="Start Date"
                            placeholder="Start Date"
                            format="MM/DD/YYYY"
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={5} xl={5}>
                    <Form.Item {...restField} name={[name, "end_date"]}>
                        <FloatDatePicker
                            label="End Date"
                            placeholder="End Date"
                            format="MM/DD/YYYY"
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={4} xl={4}>
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

                <Col xs={24} sm={12} md={12} lg={10} xl={10}>
                    <Form.Item {...restField} name={[name, "position_id"]}>
                        <FloatSelect
                            label="Position"
                            placeholder="Position"
                            options={
                                dataPosition
                                    ? dataPosition.map((item) => ({
                                          value: item.id,
                                          label: item.position,
                                      }))
                                    : []
                            }
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={10} xl={10}>
                    <Form.Item {...restField} name={[name, "description"]}>
                        <FloatInput
                            label="Description"
                            placeholder="Description"
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={10} xl={10}>
                    <Form.Item {...restField} name={[name, "industry"]}>
                        <FloatInput
                            label="Industry"
                            placeholder="Industry"
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={10} xl={10}>
                    <Form.Item {...restField} name={[name, "address"]}>
                        <FloatInput
                            label="Address"
                            placeholder="Address"
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>
                {/* <Col xs={24} sm={12} md={12} lg={10} xl={10}>
                    <Form.Item {...restField} name={[name, "monthly_salary"]}>
                        <FloatInputNumber
                            label="Monthly Salary"
                            placeholder="Monthly Salary"
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col> */}

                <Col xs={24} sm={12} md={12} lg={10} xl={10}>
                    <Form.Item {...restField} name={[name, "salary"]}>
                        <FloatInputNumber
                            label="Salary"
                            placeholder="Salary"
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>
            </Row>
        );
    };

    return (
        <Row gutter={[12, 12]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.List name="work_experience_list">
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
                                    Add Another Work Experience
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form.List>
            </Col>
        </Row>
    );
}
