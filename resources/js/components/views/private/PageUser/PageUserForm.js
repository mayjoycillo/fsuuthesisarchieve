import { useEffect, useState } from "react";
import {
    Row,
    Col,
    Button,
    Form,
    Collapse,
    Image,
    Space,
    Upload,
    notification,
} from "antd";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faAngleUp,
    faArrowLeft,
} from "@fortawesome/pro-regular-svg-icons";
import FloatInput from "../../../providers/FloatInput";
import FloatSelect from "../../../providers/FloatSelect";
import FloatInputMask from "../../../providers/FloatInputMask";
import FloatInputPassword from "../../../providers/FloatInputPassword";
import ImgCrop from "antd-img-crop";

import { GET, POST } from "../../../providers/useAxiosQuery";

import ModalFormEmail from "./ModalFormEmail";
import ModalFormPassword from "./ModalFormPassword";
import ModalUserUploadPictureForm from "./ModalUserUploadPictureForm";

import validateRules from "../../../providers/validateRules";
import imageFileToBase64 from "../../../providers/imageFileToBase64";
import notificationErrors from "../../../providers/notificationErrors";
import { apiUrl, defaultProfile } from "../../../providers/companyInfo";

// import Webcam from "react-webcam";

export default function PageUserForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    const [form] = Form.useForm();
    const [formDisabled, setFormDisabled] = useState(true);

    const [dataRoles, setDataRoles] = useState([]);

    const { mutate: mutateUserRole } = POST(`api/users`, "users_info");

    const { data: dataUserRoles } = GET(`api/user_role`, "user_role_select");

    const { data: dataUserDepartments } = GET(
        `api/ref_department`,
        "department_select"
    );

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

    GET(
        `api/users/${params.id}`,
        ["users_info", "check_user_permission"],
        (res) => {
            if (res.data) {
                let data = res.data;

                let username = data.username;
                let email = data.email;
                let type = data.user_role.type;
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
                        data.profile.profile_contact_informations[0]
                            .contact_number;
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

                let setDataRolesTemp = dataUserRoles.data
                    .filter((f) => f.type === type)
                    .map((item) => ({
                        value: item.id,
                        label: item.role,
                    }));

                setDataRoles(setDataRolesTemp);

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
                    //  = data.profile.attachments[0].gender;
                }
                form.setFieldsValue({
                    type,
                    user_role_id: data.user_role_id,
                    username,
                    email,
                    department_id,
                    school_id,
                    firstname,
                    lastname,
                    contact_number,
                    gender,
                });
            }
        }
    );

    const onFinish = (values) => {
        console.log("onFinish values", values);

        let data = new FormData();
        data.append("id", params.id ? params.id : "");
        data.append("user_role_id", values.user_role_id);
        data.append("username", values.username);
        data.append("email", values.email);
        if (!params.id) {
            data.append("password", values.password);
        }
        data.append("department_id", values.department_id);
        data.append("school_id", values.school_id);
        data.append("firstname", values.firstname);
        data.append("lastname", values.lastname);
        data.append(
            "contact_number",
            values.contact_number
                ? values.contact_number.split(" ").join("")
                : ""
        );
        data.append("gender", values.gender);

        if (fileList.file) {
            data.append("imagefile", fileList.file);
        }

        mutateUserRole(data, {
            onSuccess: (res) => {
                if (res.success) {
                    if (params.id) {
                        notification.success({
                            message: "User",
                            description: res.message,
                        });
                    } else {
                        notification.success({
                            message: "User",
                            description: res.message,
                        });
                        navigate("/users/current");
                    }
                }
            },
            onError: (err) => {
                notificationErrors(err);
            },
        });
    };

    const onChange = (info) => {
        imageFileToBase64(info.file.originFileObj, (imageUrl) =>
            setFileList({
                imageUrl,
                loading: false,
                file: info.file.originFileObj,
            })
        );
    };

    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setFormDisabled(false);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <Row gutter={[12, 12]}>
            <Col sm={24} md={24} lg={24} xl={24} xxl={24}>
                <Button
                    key={1}
                    className=" btn-main-primary btn-main-invert-outline b-r-none"
                    icon={<FontAwesomeIcon icon={faArrowLeft} />}
                    onClick={() => navigate(-1)}
                    size="large"
                >
                    Back to list
                </Button>
            </Col>

            <Col sm={24} md={24} lg={24} xl={24} xxl={24}>
                <Form form={form} onFinish={onFinish}>
                    <Row gutter={[12, 12]}>
                        <Col sm={24} md={24} lg={14} xl={14} xxl={14}>
                            <Collapse
                                className="collapse-main-primary"
                                defaultActiveKey={["0", "1"]}
                                size="middle"
                                expandIcon={({ isActive }) => (
                                    <FontAwesomeIcon
                                        icon={
                                            isActive ? faAngleUp : faAngleDown
                                        }
                                    />
                                )}
                                items={[
                                    {
                                        key: "0",
                                        label: "ACCOUNT INFORMATION",
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
                                                    <Form.Item
                                                        name="type"
                                                        rules={[
                                                            validateRules.required,
                                                        ]}
                                                    >
                                                        <FloatSelect
                                                            label="Role Type"
                                                            placeholder="Role Type"
                                                            required={true}
                                                            options={[
                                                                {
                                                                    label: "Employee",
                                                                    value: "Employee",
                                                                },
                                                                {
                                                                    label: "Student",
                                                                    value: "Student",
                                                                },
                                                            ]}
                                                            disabled={
                                                                formDisabled
                                                            }
                                                            onChange={(e) => {
                                                                if (e) {
                                                                    let setDataRolesTemp =
                                                                        dataUserRoles.data
                                                                            .filter(
                                                                                (
                                                                                    f
                                                                                ) =>
                                                                                    f.type ===
                                                                                    e
                                                                            )
                                                                            .map(
                                                                                (
                                                                                    item
                                                                                ) => ({
                                                                                    value: item.id,
                                                                                    label: item.role,
                                                                                })
                                                                            );

                                                                    setDataRoles(
                                                                        setDataRolesTemp
                                                                    );
                                                                }

                                                                form.resetFields(
                                                                    [
                                                                        "user_role_id",
                                                                    ]
                                                                );
                                                            }}
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
                                                        name="user_role_id"
                                                        rules={[
                                                            validateRules.required,
                                                        ]}
                                                    >
                                                        <FloatSelect
                                                            label="Role"
                                                            placeholder="Role"
                                                            required
                                                            options={dataRoles}
                                                            disabled={
                                                                formDisabled
                                                            }
                                                            onChange={() => {
                                                                if (params.id) {
                                                                    form.submit();
                                                                }
                                                            }}
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
                                                        name="username"
                                                        rules={[
                                                            validateRules.required,
                                                        ]}
                                                    >
                                                        <FloatInput
                                                            label="Username"
                                                            placeholder="Username"
                                                            required
                                                            disabled={
                                                                params.id
                                                                    ? true
                                                                    : formDisabled
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
                                                        name="email"
                                                        rules={[
                                                            validateRules.required,
                                                            validateRules.email,
                                                        ]}
                                                    >
                                                        <FloatInput
                                                            label="Email"
                                                            placeholder="Email"
                                                            required={true}
                                                            disabled={
                                                                params.id
                                                                    ? true
                                                                    : formDisabled
                                                            }
                                                        />
                                                    </Form.Item>
                                                </Col>

                                                {params.id ? null : (
                                                    <Col
                                                        xs={24}
                                                        sm={24}
                                                        md={24}
                                                        lg={12}
                                                        xl={12}
                                                        xxl={12}
                                                    >
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
                                                                required={true}
                                                                autoComplete="new-password"
                                                                disabled={
                                                                    formDisabled
                                                                }
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                )}

                                                {params.id ? (
                                                    <Col
                                                        xs={24}
                                                        sm={24}
                                                        md={24}
                                                        lg={24}
                                                    >
                                                        <a
                                                            type="link"
                                                            className="color-1"
                                                            onClick={() =>
                                                                setToggleModalFormEmail(
                                                                    {
                                                                        open: true,
                                                                        data: {
                                                                            id: params.id,
                                                                        },
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            Change Email
                                                        </a>
                                                    </Col>
                                                ) : null}

                                                {params.id ? (
                                                    <Col
                                                        xs={24}
                                                        sm={24}
                                                        md={24}
                                                        lg={12}
                                                        xl={12}
                                                        xxl={12}
                                                    >
                                                        <a
                                                            type="link"
                                                            className="color-1"
                                                            onClick={() =>
                                                                setToggleModalFormPassword(
                                                                    {
                                                                        open: true,
                                                                        data: {
                                                                            id: params.id,
                                                                        },
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            Change Password
                                                        </a>
                                                    </Col>
                                                ) : null}
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
                                                    <Form.Item
                                                        name="department_id"
                                                        rules={[
                                                            validateRules.required,
                                                        ]}
                                                    >
                                                        <FloatSelect
                                                            label="Department"
                                                            placeholder="Department"
                                                            required
                                                            disabled={
                                                                formDisabled
                                                            }
                                                            options={
                                                                dataUserDepartments &&
                                                                dataUserDepartments.data
                                                                    ? dataUserDepartments.data.map(
                                                                          (
                                                                              item
                                                                          ) => ({
                                                                              value: item.id,
                                                                              label: item.department_name,
                                                                          })
                                                                      )
                                                                    : []
                                                            }
                                                            onChange={() => {
                                                                if (params.id) {
                                                                    form.submit();
                                                                }
                                                            }}
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
                                                        name="school_id"
                                                        rules={[
                                                            validateRules.required,
                                                        ]}
                                                    >
                                                        <FloatInput
                                                            label="School ID"
                                                            placeholder="School ID"
                                                            required={true}
                                                            disabled={
                                                                formDisabled
                                                            }
                                                            onBlur={() => {
                                                                if (params.id) {
                                                                    form.submit();
                                                                }
                                                            }}
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
                                                        name="firstname"
                                                        rules={[
                                                            validateRules.required,
                                                        ]}
                                                    >
                                                        <FloatInput
                                                            label="First Name"
                                                            placeholder="First Name"
                                                            required={true}
                                                            disabled={
                                                                formDisabled
                                                            }
                                                            onBlur={() => {
                                                                if (params.id) {
                                                                    form.submit();
                                                                }
                                                            }}
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
                                                        name="lastname"
                                                        rules={[
                                                            validateRules.required,
                                                        ]}
                                                    >
                                                        <FloatInput
                                                            label="Last Name"
                                                            placeholder="Last Name"
                                                            required={true}
                                                            disabled={
                                                                formDisabled
                                                            }
                                                            onBlur={() => {
                                                                if (params.id) {
                                                                    form.submit();
                                                                }
                                                            }}
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
                                                        rules={[
                                                            validateRules.phone,
                                                        ]}
                                                    >
                                                        <FloatInputMask
                                                            label="Phone No"
                                                            placeholder="Phone No"
                                                            maskLabel="contact_number"
                                                            maskType="999 999 9999"
                                                            disabled={
                                                                formDisabled
                                                            }
                                                            onBlur={() => {
                                                                if (params.id) {
                                                                    form.submit();
                                                                }
                                                            }}
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
                                                            disabled={
                                                                formDisabled
                                                            }
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
                                                            onChange={() => {
                                                                if (params.id) {
                                                                    form.submit();
                                                                }
                                                            }}
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
                                size="middle"
                                expandIcon={({ isActive }) => (
                                    <FontAwesomeIcon
                                        icon={
                                            isActive ? faAngleUp : faAngleDown
                                        }
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
                                                    className="text-center"
                                                >
                                                    <Space>
                                                        <Button
                                                            key={2}
                                                            type="primary"
                                                            size="large"
                                                            className="btn-main-primary submit-photo"
                                                            onClick={() =>
                                                                setToggleModalUserUploadPictureForm(
                                                                    {
                                                                        open: true,
                                                                        data: null,
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            Take Photo
                                                        </Button>

                                                        <ImgCrop rotationSlider>
                                                            <Upload
                                                                showUploadList={
                                                                    false
                                                                }
                                                                multiple={false}
                                                                maxCount={1}
                                                                onChange={
                                                                    onChange
                                                                }
                                                                onPreview={
                                                                    onPreview
                                                                }
                                                            >
                                                                <Button
                                                                    key={3}
                                                                    type="primary"
                                                                    size="large"
                                                                    className="btn-main-primary submit-photo"
                                                                >
                                                                    Upload
                                                                </Button>
                                                            </Upload>
                                                        </ImgCrop>
                                                    </Space>
                                                </Col>

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
                                                            borderRadius:
                                                                "100%",
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

                        {params.id ? null : (
                            <Col
                                xs={24}
                                sm={24}
                                md={24}
                                lg={24}
                                xl={24}
                                xxl={24}
                            >
                                <Button
                                    key={4}
                                    className="btn-main-primary"
                                    type="primary"
                                    size="large"
                                    onClick={() => form.submit()}
                                >
                                    SUBMIT
                                </Button>
                            </Col>
                        )}
                    </Row>
                </Form>

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
            </Col>
        </Row>
    );
}
