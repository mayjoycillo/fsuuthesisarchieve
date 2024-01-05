import { Row, Col, Form } from "antd";

export default function EmployeeFormDepartmentInfo(props) {
    const { formDisabled } = props;

    return (
        <Row gutter={[12, 12]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Row gutter={[12, 12]}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item
                            name="school_id"
                            rules={[validateRules.required]}
                        >
                            <FloatInput
                                label="School ID"
                                placeholder="School ID"
                                required={true}
                                disabled={formDisabled}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                <Form.Item name="firstname" rules={[validateRules.required]}>
                    <FloatInput
                        label="Given Name"
                        placeholder="Given Name"
                        required={true}
                        disabled={formDisabled}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                <Form.Item name="middlename">
                    <FloatInput
                        label="Middle Name"
                        placeholder="Middle Name"
                        required={true}
                        disabled={formDisabled}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                <Form.Item name="lastname" rules={[validateRules.required]}>
                    <FloatInput
                        label="Family Name"
                        placeholder="Family Name"
                        required={true}
                        disabled={formDisabled}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                <Form.Item name="name_ext">
                    <FloatInput
                        label="Name Extension"
                        placeholder="Name Extension"
                        required={true}
                        disabled={formDisabled}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                <Form.Item name="birthdate">
                    <FloatDatePicker
                        label="Date Of Birth"
                        placeholder="Date Of Birth"
                        required={true}
                        disabled={formDisabled}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                <Form.Item name="birthplace">
                    <FloatInput
                        label="Place of Birth"
                        placeholder="Place of Birth"
                        required={true}
                        disabled={formDisabled}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                <Form.Item name="email" rules={[validateRules.email]}>
                    <FloatInput
                        label="Email"
                        placeholder="Email"
                        required={true}
                        disabled={formDisabled}
                    />
                </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                <Form.Item name="contact_number" rules={[validateRules.phone]}>
                    <FloatInputNumber
                        label="Contact Number"
                        placeholder="Contact Number"
                        required={true}
                        disabled={formDisabled}
                    />
                </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                <Form.Item name="religion_id" rules={[validateRules.phone]}>
                    <FloatSelect
                        label="Religion"
                        placeholder="Religion"
                        required={true}
                        disabled={formDisabled}
                        options={[]}
                    />
                </Form.Item>
            </Col>
        </Row>
    );
}
