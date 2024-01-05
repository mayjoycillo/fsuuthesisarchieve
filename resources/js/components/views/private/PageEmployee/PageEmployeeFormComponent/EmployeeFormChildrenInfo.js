import { Row, Col, Form, Button, Popconfirm, Typography } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/pro-regular-svg-icons";

import FloatDatePicker from "../../../../providers/FloatDatePicker";
import FloatInput from "../../../../providers/FloatInput";
import FloatSelect from "../../../../providers/FloatSelect";
import optionGender from "../../../../providers/optionGender";

export default function EmployeeFormChildrenInfo(props) {
    const { formDisabled, pname } = props;

    const RenderInput = (props) => {
        const { formDisabled, name, pname, restField, fields, remove } = props;

        return (
            <Row gutter={[12, 12]}>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <Form.Item
                        {...restField}
                        name={[name, "fullname"]}
                        key={`${name}-${pname}}`}
                    >
                        <FloatInput
                            label="Name of Children"
                            placeholder="Name of Children"
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={8} lg={4} xl={4}>
                    <Form.Item
                        {...restField}
                        name={[name, "birthdate"]}
                        key={`${name}-${pname}}`}
                    >
                        <FloatDatePicker
                            label="Date of Birth"
                            placeholder="Date of Birth"
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                    <Form.Item
                        {...restField}
                        name={[name, "education_attainment"]}
                        key={`${name}-${pname}}`}
                    >
                        <FloatInput
                            label="Education Attainment"
                            placeholder="Education Attainment"
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={8} lg={4} xl={4}>
                    <Form.Item
                        {...restField}
                        name={[name, "gender"]}
                        key={`${name}-${pname}}`}
                    >
                        <FloatSelect
                            label="gender"
                            placeholder="gender"
                            options={optionGender}
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>

                <Col xs={3} sm={3} md={2} lg={2} xl={2}>
                    <div className="action">
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
            <Col>
                <Typography.Title level={5} type="secondary">
                    Children:
                </Typography.Title>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.List key={pname} name={[pname, "children_list"]}>
                    {(fields, { add, remove }) => (
                        <Row gutter={[12, 0]}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                {fields &&
                                    fields.length > 0 &&
                                    fields.map(
                                        ({ key, name, ...restField }) => (
                                            <div key={`${key}-${pname}`}>
                                                <RenderInput
                                                    formDisabled={formDisabled}
                                                    name={name}
                                                    restField={restField}
                                                    fields={fields}
                                                    remove={remove}
                                                    pname={pname}
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
                                    Add Another Children
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form.List>
                <hr className="form-children-group" />
            </Col>
        </Row>
    );
}
