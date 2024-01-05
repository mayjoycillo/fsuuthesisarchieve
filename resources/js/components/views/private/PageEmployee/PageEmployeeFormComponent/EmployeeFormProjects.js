import { Row, Col, Form, Button, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/pro-regular-svg-icons";

import FloatSelect from "../../../../providers/FloatSelect";
import FloatInput from "../../../../providers/FloatInput";
import FloatDatePicker from "../../../../providers/FloatDatePicker";

export default function EmployeeFormProjects(props) {
    const { formDisabled } = props;

    const RenderInput = (props) => {
        const { formDisabled, name, restField, fields, remove } = props;

        return (
            <Row gutter={[12, 12]}>
                <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                    <Form.Item {...restField} name={[name, "type"]}>
                        <FloatSelect
                            label="Type"
                            placeholder="Type"
                            disabled={formDisabled}
                            options={[
                                { label: "Article", value: "Article" },
                                { label: "Research", value: "Research" },
                                { label: "Book", value: "Book" },
                                { label: "Other", value: "Other" },
                            ]}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item {...restField} name={[name, "title"]}>
                        <FloatInput
                            label="Title"
                            placeholder="Title"
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={5} lg={5} xl={5}>
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

                <Col xs={24} sm={24} md={3} lg={3} xl={3}>
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

                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item {...restField} name={[name, "source_fund"]}>
                        <FloatInput
                            label="Source of Funding"
                            placeholder="Source of Funding"
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                    <Form.Item {...restField} name={[name, "status"]}>
                        <FloatInput
                            label="Status"
                            placeholder="Status"
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={11} lg={11} xl={11}>
                    <Form.Item {...restField} name={[name, "publication"]}>
                        <FloatInput
                            label="Publication"
                            placeholder="Publication"
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
                <Form.List name="profile_other3">
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
                                    Add Written Project
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form.List>
            </Col>
        </Row>
    );
}
