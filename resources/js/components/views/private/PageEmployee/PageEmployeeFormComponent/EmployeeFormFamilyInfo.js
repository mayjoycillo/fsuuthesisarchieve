import { Row, Col, Form, Button, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/pro-regular-svg-icons";

import FloatSelect from "../../../../providers/FloatSelect";
import FloatInput from "../../../../providers/FloatInput";
import validateRules from "../../../../providers/validateRules";
import EmployeeFormChildrenInfo from "./EmployeeFormChildrenInfo";

export default function EmployeeFormFamilyInfo(props) {
    const { formDisabled, dataCivilStatus } = props;

    const RenderInput = (props) => {
        const { formDisabled, name, restField, fields, remove } = props;
        return (
            <Row gutter={[12, 12]}>
                <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                    <Form.Item
                        {...restField}
                        name={[name, "civil_status_id"]}
                        rules={[validateRules.required]}
                    >
                        <FloatSelect
                            label="Civil Status"
                            placeholder="Civil Status"
                            required={true}
                            disabled={formDisabled}
                            options={dataCivilStatus.map((item) => ({
                                value: item.id,
                                label: item.civil_status,
                            }))}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <Form.Item {...restField} name={[name, "name"]}>
                        <FloatInput
                            label="Name of Spouse"
                            placeholder="Name of Spouse"
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <Form.Item {...restField} name={[name, "occupation"]}>
                        <FloatInput
                            label="Occupation"
                            placeholder="Occupation"
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

                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <EmployeeFormChildrenInfo pname={name} />
                </Col>
            </Row>
        );
    };

    return (
        <Row gutter={[12, 12]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.List name="spouse_list">
                    {(fields, { add, remove }) => (
                        <Row gutter={[12, 0]}>
                            <Col
                                xs={24}
                                sm={24}
                                md={24}
                                lg={24}
                                xl={24}
                                className="form-spouse-group"
                            >
                                {fields.map(({ key, name, ...restField }) => (
                                    <div key={key}>
                                        <RenderInput
                                            formDisabled={formDisabled}
                                            name={name}
                                            restField={restField}
                                            fields={fields}
                                            remove={remove}
                                        />
                                    </div>
                                ))}
                            </Col>

                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Button
                                    type="link"
                                    className="btn-main-primary p-0"
                                    icon={<FontAwesomeIcon icon={faPlus} />}
                                    onClick={() => add()}
                                >
                                    Add Another Spouse
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form.List>
            </Col>
        </Row>
    );
}
