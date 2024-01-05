import { Col, Form, Row } from "antd";

import FloatInput from "../../../../providers/FloatInput";
import FloatDatePicker from "../../../../providers/FloatDatePicker";
import FloatSelect from "../../../../providers/FloatSelect";
import optionGender from "../../../../providers/optionGender";
import optionBloodType from "../../../../providers/optionBloodType";
import optionLanguage from "../../../../providers/optionLanguage";
import validateRules from "../../../../providers/validateRules";

export default function EmployeeFormBasicInfo(props) {
    const { formDisabled, dataReligion, dataLanguage, dataNationalities } =
        props;

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
                        disabled={formDisabled}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                <Form.Item name="birthplace" rules={[validateRules.required]}>
                    <FloatInput
                        label="Place of Birth"
                        placeholder="Place of Birth"
                        required={true}
                        disabled={formDisabled}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                <Form.Item name="birthdate" rules={[validateRules.required]}>
                    <FloatDatePicker
                        label="Date Of Birth"
                        placeholder="Date Of Birth"
                        required={true}
                        disabled={formDisabled}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                <Form.Item name="gender">
                    <FloatSelect
                        label="Sex"
                        placeholder="Sex"
                        options={optionGender}
                        disabled={formDisabled}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                <Form.Item name="height">
                    <FloatInput
                        label="Height"
                        placeholder="Height"
                        disabled={formDisabled}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                <Form.Item name="weight">
                    <FloatInput
                        label="Weight"
                        placeholder="Weight"
                        disabled={formDisabled}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                <Form.Item name="blood_type">
                    <FloatSelect
                        label="Blood Type"
                        placeholder="Blood Type"
                        options={optionBloodType}
                        disabled={formDisabled}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                <Form.Item
                    name="nationality_id"
                    rules={[validateRules.required]}
                >
                    <FloatSelect
                        label="Citizenship"
                        placeholder="Citizenship"
                        required={true}
                        disabled={formDisabled}
                        options={dataNationalities.map((item) => ({
                            value: item.id,
                            label: item.nationality,
                        }))}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                <Form.Item name="religion_id" rules={[validateRules.required]}>
                    <FloatSelect
                        label="Religion"
                        placeholder="Religion"
                        required={true}
                        disabled={formDisabled}
                        options={dataReligion.map((item) => ({
                            value: item.id,
                            label: item.religion,
                        }))}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                <Form.Item name="language_id">
                    <FloatSelect
                        label="Language"
                        placeholder="Language"
                        multi="multiple"
                        disabled={formDisabled}
                        options={optionLanguage}
                    />
                </Form.Item>
            </Col>
        </Row>
    );
}
