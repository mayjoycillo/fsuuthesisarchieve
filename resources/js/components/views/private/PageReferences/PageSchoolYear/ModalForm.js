import { Modal, Button, Form, notification } from "antd";
import FloatInput from "../../../../providers/FloatInput";
import validateRules from "../../../../providers/validateRules";
import { POST } from "../../../../providers/useAxiosQuery";
import { useEffect } from "react";

export default function ModalForm(props) {
    const { toggleModalForm, setToggleModalForm } = props;

    const [form] = Form.useForm();

    const { mutate: mutateSchoolYear, loading: loadingSchoolYear } = POST(
        `api/ref_school_year`,
        "school_year_list"
    );

    const onFinish = (values) => {
        console.log("onFinish", values);

        let data = {
            ...values,
            id:
                toggleModalForm.data && toggleModalForm.data.id
                    ? toggleModalForm.data.id
                    : "",
        };

        mutateSchoolYear(data, {
            onSuccess: (res) => {
                console.log("res", res);
                if (res.success) {
                    setToggleModalForm({
                        open: false,
                        data: null,
                    });
                    form.resetFields();
                    notification.success({
                        message: "School Year",
                        description: res.message,
                    });
                } else {
                    notification.error({
                        message: "School Year",
                        description: res.message,
                    });
                }
            },
            onError: (err) => {
                notificationErrors(err);
            },
        });
    };

    useEffect(() => {
        if (toggleModalForm.open) {
            form.setFieldsValue({
                ...toggleModalForm.data,
            });
        }

        return () => {};
    }, [toggleModalForm]);

    return (
        <Modal
            title="FORM School Year"
            open={toggleModalForm.open}
            onCancel={() => {
                setToggleModalForm({
                    open: false,
                    data: null,
                });
                form.resetFields();
            }}
            forceRender
            footer={[
                <Button
                    className="btn-main-primary outlined"
                    size="large"
                    key={1}
                    onClick={() => {
                        setToggleModalForm({
                            open: false,
                            data: null,
                        });
                        form.resetFields();
                    }}
                >
                    CANCEL
                </Button>,
                <Button
                    className="btn-main-primary"
                    type="primary"
                    size="large"
                    key={2}
                    onClick={() => form.submit()}
                    loading={loadingSchoolYear}
                >
                    SUBMIT
                </Button>,
            ]}
        >
            <Form form={form} onFinish={onFinish}>
                <Form.Item
                    name="sy_from"
                    rules={[
                        {
                            required: true,
                            validator: (_, value) => {
                                const year = parseInt(value);
                                if (isNaN(year) || year < 1900 || year > 2100) {
                                    return Promise.reject("Invalid Input");
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                >
                    <FloatInput
                        label="Year From"
                        placeholder="Year From"
                        required={true}
                    />
                </Form.Item>

                <Form.Item
                    name="sy_to"
                    rules={[
                        {
                            required: true,
                            validator: (_, value) => {
                                const year = parseInt(value);
                                if (isNaN(year) || year < 1900 || year > 2100) {
                                    return Promise.reject("Invalid Input");
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                >
                    <FloatInput
                        label="Year To"
                        placeholder="Year To"
                        required={true}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}
