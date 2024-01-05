import { useState } from "react";
import { Row, Col, Button, Form, Collapse, Image, notification } from "antd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/pro-regular-svg-icons";

import FloatInput from "../../../providers/FloatInput";
import FloatSelect from "../../../providers/FloatSelect";
import FloatInputMask from "../../../providers/FloatInputMask";

import { GET, POST } from "../../../providers/useAxiosQuery";

import validateRules from "../../../providers/validateRules";
import ModalFormEmail from "./ModalFormEmail";
import ModalFormPassword from "./ModalFormPassword";

import ModalUserUploadPictureForm from "./ModalUserUploadPictureForm";
import {
    apiUrl,
    defaultProfile,
    userData,
} from "../../../providers/companyInfo";
import notificationErrors from "../../../providers/notificationErrors";

export default function PageEditProfile() {
    const [form] = Form.useForm();

    const [selectedData, setSelectedData] = useState({
        username: "",
        email: "",
        department_id: "",
        school_id: "",
        firstname: "",
        lastname: "",
        contact_number: "",
        gender: "",
        civil_status_id: "",
        nationality_id: "",
    });

    const [toggleModalFormEmail, setToggleModalFormEmail] = useState({
        open: false,
        data: null,
    });

    const [toggleModalFormPassword, setToggleModalFormPassword] = useState({
        open: false,
        data: null,
    });

    const [
        toggleModalUserUploadPictureForm,
        setToggleModalUserUploadPictureForm,
    ] = useState({
        open: false,
        data: null,
    });

    const [fileList, setFileList] = useState({
        imageUrl: defaultProfile,
        loading: false,
        file: null,
    });

    const { data: dataCivilStatuses } = GET(
        `api/ref_civilstatus`,
        "civil_status_select"
    );

    const { data: dataNationalities } = GET(
        `api/ref_nationality`,
        "ref_nationality_select"
    );

    GET(`api/users/${userData().id}`, "users_info", (res) => {
        if (res.data) {
            let data = res.data;

            let username = data.username;
            let email = data.email;
            let school_id = data.profile.school_id;
            let firstname = data.profile.firstname;
            let lastname = data.profile.lastname;

            let gender = "";

            if (
                data.profile &&
                data.profile.profile_gender &&
                data.profile.profile_gender.length > 0
            ) {
                gender = data.profile.profile_gender[0].gender;
            }

            let contact_number = "";

            if (
                data.profile &&
                data.profile.profile_contact_informations &&
                data.profile.profile_contact_informations.length
            ) {
                contact_number =
                    data.profile.profile_contact_informations[0].contact_number;
            }

            let department_id = "";

            if (
                data.profile &&
                data.profile.profile_departments &&
                data.profile.profile_departments.length
            ) {
                department_id =
                    data.profile.profile_departments[0].department_id;
            }

            if (
                data.profile &&
                data.profile.attachments &&
                data.profile.attachments.length > 0
            ) {
                setFileList({
                    imageUrl: apiUrl(data.profile.attachments[0].file_path),
                    loading: false,
                    file: null,
                });
            }

            setSelectedData({
                username,
                email,
                department_id,
                school_id,
                firstname,
                lastname,
                contact_number,
                gender,
                civil_status_id: data.profile.civil_status_id,
                nationality_id: data.profile.nationality_id,
            });
            form.setFieldsValue({
                username,
                email,
                department_id,
                school_id,
                firstname,
                lastname,
                contact_number,
                gender,
                civil_status_id: data.profile.civil_status_id,
                nationality_id: data.profile.nationality_id,
            });
        }
    });

    const { mutate: mutateUpdateInfo } = POST(
        `api/user_profile_info_update`,
        "user_profile_info_update"
    );

    const onFinish = (values) => {
        console.log("onFinish", values);

        let data = {
            ...values,
            contact_number: values.contact_number
                ? values.contact_number.split(" ").join("")
                : "",
        };

        mutateUpdateInfo(data, {
            onSuccess: (res) => {
                if (res.success) {
                    notification.success({
                        message: "User",
                        description: res.message,
                    });
                } else {
                    notification.success({
                        message: "User",
                        description: res.message,
                    });
                }
            },
            onError: (err) => {
                notificationErrors(err);
            },
        });
    };

    const handleInputBlur = (value, field) => {
        console.log("handleInputBlur value, field", value, field);
        console.log("handleInputBlur selectedData", selectedData);
        if (field === "contact_number") {
            if (value !== undefined) {
                let newval = value.split("_").join("");
                newval = newval.split(" ").join("");
                // console.log("newval", newval);
                let oldval = "";
                if (selectedData[field]) {
                    oldval = selectedData[field].split("_").join("");
                    oldval = selectedData[field].split(" ").join("");
                }
                if (oldval !== newval) {
                    form.submit();
                }
            }
        } else {
            if (selectedData[field] !== value) {
                form.submit();
            }
        }
    };

    return (
        <Form form={form} onFinish={onFinish}>
            <Row gutter={[12, 12]}>
                <Col sm={24} md={24} lg={14} xl={14} xxl={14}>
                    <Collapse
                        className="collapse-main-primary"
                        defaultActiveKey={["0", "1"]}
                        size="large"
                        expandIcon={({ isActive }) => (
                            <FontAwesomeIcon
                                icon={isActive ? faAngleUp : faAngleDown}
                            />
                        )}
                        items={[
                            {
                                key: "0",
                                label: "ACCOUNT INFORMATION",
                                children: (
                                    <Row gutter={[12, 0]}>
                                        <Col
                                            xs={24}
                                            sm={24}
                                            md={12}
                                            lg={12}
                                            xl={12}
                                        >
                                            <Form.Item name="username">
                                                <FloatInput
                                                    label="Username"
                                                    placeholder="Username"
                                                    disabled
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col
                                            xs={24}
                                            sm={24}
                                            md={12}
                                            lg={12}
                                            xl={12}
                                        >
                                            <Form.Item name="email">
                                                <FloatInput
                                                    label="Email"
                                                    placeholder="Email"
                                                    disabled
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col
                                            xs={24}
                                            sm={24}
                                            md={24}
                                            lg={24}
                                            xl={24}
                                        >
                                            <Button
                                                type="link"
                                                className="p-0"
                                                onClick={() =>
                                                    setToggleModalFormEmail({
                                                        open: true,
                                                        data: {
                                                            id: userData().id,
                                                        },
                                                    })
                                                }
                                            >
                                                Change Email
                                            </Button>
                                        </Col>

                                        <Col
                                            xs={24}
                                            sm={24}
                                            md={24}
                                            lg={24}
                                            xl={24}
                                        >
                                            <Button
                                                type="link"
                                                className="p-0"
                                                onClick={() =>
                                                    setToggleModalFormPassword({
                                                        open: true,
                                                        data: {
                                                            id: userData().id,
                                                        },
                                                    })
                                                }
                                            >
                                                Change Password
                                            </Button>
                                        </Col>
                                    </Row>
                                ),
                            },
                            {
                                key: "1",
                                label: "PERSONAL INFORMATION",
                                children: (
                                    <Row gutter={[12, 12]}>
                                        <Col
                                            xs={24}
                                            sm={24}
                                            md={24}
                                            lg={12}
                                            xl={12}
                                            xxl={12}
                                        >
                                            <Form.Item name="school_id">
                                                <FloatInput
                                                    label="School ID"
                                                    placeholder="School ID"
                                                    disabled
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col
                                            xs={24}
                                            sm={24}
                                            md={12}
                                            lg={12}
                                            xl={12}
                                        ></Col>

                                        <Col
                                            xs={24}
                                            sm={24}
                                            md={12}
                                            lg={12}
                                            xl={12}
                                        >
                                            <Form.Item
                                                name="firstname"
                                                rules={[validateRules.required]}
                                            >
                                                <FloatInput
                                                    label="First Name"
                                                    placeholder="First Name"
                                                    required
                                                    onBlur={(e) =>
                                                        handleInputBlur(
                                                            e.target.value,
                                                            "firstname"
                                                        )
                                                    }
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col
                                            xs={24}
                                            sm={24}
                                            md={12}
                                            lg={12}
                                            xl={12}
                                        >
                                            <Form.Item
                                                name="lastname"
                                                rules={[validateRules.required]}
                                            >
                                                <FloatInput
                                                    label="Last Name"
                                                    placeholder="Last Name"
                                                    required
                                                    onBlur={(e) =>
                                                        handleInputBlur(
                                                            e.target.value,
                                                            "lastname"
                                                        )
                                                    }
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col
                                            xs={24}
                                            sm={24}
                                            md={24}
                                            lg={12}
                                            xl={12}
                                            xxl={12}
                                        >
                                            <Form.Item
                                                name="contact_number"
                                                rules={[validateRules.phone]}
                                            >
                                                <FloatInputMask
                                                    label="Phone No"
                                                    placeholder="Phone No"
                                                    maskLabel="contact_number"
                                                    maskType="999 999 9999"
                                                    required={true}
                                                    onBlur={(e) =>
                                                        handleInputBlur(
                                                            e.target.value,
                                                            "contact_number"
                                                        )
                                                    }
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col
                                            xs={24}
                                            sm={24}
                                            md={24}
                                            lg={12}
                                            xl={12}
                                            xxl={12}
                                        >
                                            <Form.Item name="gender">
                                                <FloatSelect
                                                    label="Gender"
                                                    placeholder="Gender"
                                                    options={[
                                                        {
                                                            label: "Male",
                                                            value: "Male",
                                                        },
                                                        {
                                                            label: "Female",
                                                            value: "Female",
                                                        },
                                                    ]}
                                                    required={true}
                                                    onChange={(e) =>
                                                        handleInputBlur(
                                                            e,
                                                            "gender"
                                                        )
                                                    }
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col
                                            xs={24}
                                            sm={24}
                                            md={24}
                                            lg={12}
                                            xl={12}
                                            xxl={12}
                                        >
                                            <Form.Item name="civil_status_id">
                                                <FloatSelect
                                                    label="Civil Status"
                                                    placeholder="Civil Status"
                                                    options={
                                                        dataCivilStatuses &&
                                                        dataCivilStatuses.data
                                                            ? dataCivilStatuses.data.map(
                                                                  (item) => ({
                                                                      value: item.id,
                                                                      label: item.civil_status,
                                                                  })
                                                              )
                                                            : []
                                                    }
                                                    onChange={(e) =>
                                                        handleInputBlur(
                                                            e,
                                                            "civil_status_id"
                                                        )
                                                    }
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col
                                            xs={24}
                                            sm={24}
                                            md={24}
                                            lg={12}
                                            xl={12}
                                            xxl={12}
                                        >
                                            <Form.Item name="nationality_id">
                                                <FloatSelect
                                                    label="Citizenship"
                                                    placeholder="Citizenship"
                                                    options={
                                                        dataNationalities &&
                                                        dataNationalities.data
                                                            ? dataNationalities.data.map(
                                                                  (item) => ({
                                                                      value: item.id,
                                                                      label: item.nationality,
                                                                  })
                                                              )
                                                            : []
                                                    }
                                                    onChange={(e) =>
                                                        handleInputBlur(
                                                            e,
                                                            "nationality_id"
                                                        )
                                                    }
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                ),
                            },
                        ]}
                    />
                </Col>

                <Col sm={24} md={24} lg={10} xl={10} xxl={10}>
                    <Collapse
                        className="collapse-main-primary"
                        defaultActiveKey={["0"]}
                        size="large"
                        expandIcon={({ isActive }) => (
                            <FontAwesomeIcon
                                icon={isActive ? faAngleUp : faAngleDown}
                            />
                        )}
                        items={[
                            {
                                key: "0",
                                label: "TAKE PHOTO",
                                children: (
                                    <Row gutter={[12, 12]}>
                                        <Col
                                            xs={24}
                                            sm={24}
                                            md={24}
                                            lg={24}
                                            xl={24}
                                            xxl={24}
                                            className="text-center"
                                        >
                                            <Image
                                                style={{
                                                    left: "38.75%",
                                                    right: "61.25%",
                                                    width: "200px",
                                                    height: "200px",
                                                    borderRadius: "100%",
                                                }}
                                                src={fileList.imageUrl}
                                            />
                                        </Col>
                                    </Row>
                                ),
                            },
                        ]}
                    />
                </Col>
            </Row>

            <ModalFormEmail
                toggleModalFormEmail={toggleModalFormEmail}
                setToggleModalFormEmail={setToggleModalFormEmail}
            />

            <ModalFormPassword
                toggleModalFormPassword={toggleModalFormPassword}
                setToggleModalFormPassword={setToggleModalFormPassword}
            />

            <ModalUserUploadPictureForm
                toggleModalUserUploadPictureForm={
                    toggleModalUserUploadPictureForm
                }
                setToggleModalUserUploadPictureForm={
                    setToggleModalUserUploadPictureForm
                }
            />
        </Form>
    );
}
