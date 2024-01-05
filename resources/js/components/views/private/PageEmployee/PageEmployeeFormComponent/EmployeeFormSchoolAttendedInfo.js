import { Button, Col, Form, Row, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/pro-regular-svg-icons";

import FloatDatePicker from "../../../../providers/FloatDatePicker";
import FloatInput from "../../../../providers/FloatInput";
import FloatSelect from "../../../../providers/FloatSelect";
import validateRules from "../../../../providers/validateRules";

export default function EmployeeFormSchoolAttendedInfo(props) {
    const { formDisabled, dataSchoolLevel } = props;

    const RenderInput = (props) => {
        const { formDisabled, name, restField, fields, remove } = props;

        return (
            <Row gutter={[12, 0]}>
                <Col xs={24} sm={12} md={12} lg={5} xl={5}>
                    <Form.Item
                        {...restField}
                        name={[name, "school_level_id"]}
                        rules={[validateRules.required]}
                    >
                        <FloatSelect
                            label="School Level"
                            disabled={formDisabled}
                            required={true}
                            options={
                                dataSchoolLevel
                                    ? dataSchoolLevel.map((item) => ({
                                          value: item.id,
                                          label: item.school_level,
                                      }))
                                    : []
                            }
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={5} xl={5}>
                    <Form.Item
                        {...restField}
                        name={[name, "school_name"]}
                        rules={[validateRules.required]}
                    >
                        <FloatInput
                            label="School Name"
                            placeholder="School Name"
                            required={true}
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={5} xl={5}>
                    <Form.Item
                        {...restField}
                        name={[name, "school_type"]}
                        rules={[validateRules.required]}
                    >
                        <FloatSelect
                            label="School Type"
                            placeholder="School Type"
                            required={true}
                            disabled={formDisabled}
                            options={[
                                { value: "Public", label: "Public" },
                                { value: "Private", label: "Private" },
                            ]}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={5} xl={5}>
                    <Form.Item
                        {...restField}
                        name={[name, "year_graduated"]}
                        rules={[validateRules.required]}
                    >
                        <FloatDatePicker
                            label="Year Graduated"
                            placeholder="Year Graduated"
                            format="YYYY"
                            picker="year"
                            required={true}
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

                <Col xs={24} sm={12} md={12} lg={5} xl={5}>
                    <Form.Item
                        {...restField}
                        name={[name, "school_address"]}
                        rules={[validateRules.required]}
                    >
                        <FloatInput
                            label="School Address"
                            placeholder="School Address"
                            required={true}
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
                <Form.List name="school_attended_list">
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
                                    Add Another School Attended
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form.List>
            </Col>
        </Row>
    );
}
