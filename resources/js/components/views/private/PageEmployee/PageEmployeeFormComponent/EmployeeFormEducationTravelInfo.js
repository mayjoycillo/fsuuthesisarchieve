import { Row, Col, Form, Button, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/pro-regular-svg-icons";

import FloatInput from "../../../../providers/FloatInput";
import FloatDatePicker from "../../../../providers/FloatDatePicker";
import validateRules from "../../../../providers/validateRules";

export default function EmployeeFormEducationTravelInfo(props) {
    const { formDisabled } = props;

    const RenderInput = (props) => {
        const { formDisabled, name, restField, fields, remove } = props;

        return (
            <Row gutter={[12, 12]}>
                <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                    <Form.Item {...restField} name={[name, "address"]}>
                        <FloatInput
                            label="Place"
                            placeholder="Place"
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item {...restField} name={[name, "purpose"]}>
                        <FloatInput
                            label="Specific Purpose"
                            placeholder="Specific Purpose"
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                    <Form.Item {...restField} name={[name, "year"]}>
                        <FloatDatePicker
                            label="Year"
                            placeholder="Year"
                            format="YYYY"
                            picker="year"
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

                <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                    <Form.Item {...restField} name={[name, "sponsor"]}>
                        <FloatInput
                            label="Sponsor"
                            placeholder="Sponsor"
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
                <Form.List name="profile_other5">
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
                                    Add Another Education Travel
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form.List>
            </Col>
        </Row>
    );
}
