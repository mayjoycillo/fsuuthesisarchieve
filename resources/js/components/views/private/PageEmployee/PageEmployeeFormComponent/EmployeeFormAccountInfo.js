import { useState } from "react";
import { Col, Form, Row, Button } from "antd";

import FloatInput from "../../../../providers/FloatInput";
import FloatInputPassword from "../../../../providers/FloatInputPassword";
import validateRules from "../../../../providers/validateRules";

export default function EmployeeFormAccountInfo(props) {
    const { formDisabled, location } = props;
    const [toggleModalFormChangePassword, setToggleModalFormChangePassword] =
        useState(false);

    const addlink = ["/employees/full-time/add", "/employees/part-time/add"];

    return (
        <Row gutter={[18, 0]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item name="username" rules={[validateRules.required]}>
                    <FloatInput
                        label="Username"
                        placeholder="Username"
                        required
                        disabled={formDisabled}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                    name="email"
                    rules={[validateRules.email, validateRules.required]}
                >
                    <FloatInput
                        label="Email"
                        placeholder="Email"
                        required
                        disabled={formDisabled}
                    />
                </Form.Item>
            </Col>

            {addlink.includes(location.pathname) ? (
                <>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                            name="password"
                            rules={[
                                validateRules.required,
                                validateRules.password,
                            ]}
                        >
                            <FloatInputPassword
                                label="Password"
                                placeholder="Password"
                                disabled={formDisabled}
                                autoComplete="new-password"
                                required
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                            name="confirm-password"
                            rules={[
                                validateRules.required,
                                validateRules.password_validate,
                            ]}
                        >
                            <FloatInputPassword
                                label="Confirm Password"
                                placeholder="Confirm Password"
                                disabled={formDisabled}
                                required
                            />
                        </Form.Item>
                    </Col>
                </>
            ) : (
                <>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Button
                            type="link"
                            className="btn-main-primary p-0"
                            onClick={() =>
                                setToggleModalFormChangePassword(true)
                            }
                        >
                            Change Password
                        </Button>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Button type="link" className="btn-main-primary p-0">
                            CLICK HERE
                        </Button>{" "}
                        <span>to enabled 2-Factor Authentication (2FA)</span>
                    </Col>
                </>
            )}
        </Row>
    );
}
