import { Modal, Button, Form, notification } from "antd";
import FloatInput from "../../../../providers/FloatInput";
import validateRules from "../../../../providers/validateRules";
import { POST } from "../../../../providers/useAxiosQuery";
import { useEffect } from "react";
import FloatSelect from "../../../../providers/FloatSelect";
import moment from "moment";

export default function ModalForm(props) {
    const { toggleModalForm, setToggleModalForm } = props;
    const [form] = Form.useForm();

    const { mutate: mutateTimeSchedule, loading: loadingTimeSchedule } = POST(
        `api/ref_time_schedule`,
        "time_schedule_list"
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

        mutateTimeSchedule(data, {
            onSuccess: (res) => {
                console.log("res", res);
                if (res.success) {
                    setToggleModalForm({
                        open: false,
                        data: null,
                    });
                    form.resetFields();
                    notification.success({
                        message: "Time Schedule",
                        description: res.message,
                    });
                } else {
                    notification.error({
                        message: "Time Schedule",
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

    const formatTime = (time) => {
        return moment(time, "HH:mm").format("hh:mm");
    };

    const parseTime = (formattedTime) => {
        const time = formattedTime.toString().padStart(4, "0");
        return moment(time, "hhmm").format("HH:mm");
    };

    return (
        <Modal
            title="FORM Time Schedule"
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
                    loading={loadingTimeSchedule}
                >
                    SUBMIT
                </Button>,
            ]}
        >
            <Form form={form} onFinish={onFinish}>
                <Form.Item
                    name="time_in"
                    rules={[validateRules.required]}
                    initialValue={
                        toggleModalForm.data
                            ? formatTime(toggleModalForm.data.time_in)
                            : undefined
                    }
                >
                    <FloatInput
                        label="Time In"
                        placeholder="Time In"
                        required={true}
                        onBlur={(e) => {
                            const inputValue = e.target.value;
                            const parsedTime = parseTime(inputValue);
                            const formattedTime = formatTime(parsedTime);
                            form.setFieldsValue({
                                time_in: formattedTime,
                            });
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name="time_out"
                    rules={[validateRules.required]}
                    initialValue={
                        toggleModalForm.data
                            ? formatTime(toggleModalForm.data.time_out)
                            : undefined
                    }
                >
                    <FloatInput
                        label="Time Out"
                        placeholder="Time Out"
                        required={true}
                        onBlur={(e) => {
                            const inputValue = e.target.value;
                            const parsedTime = parseTime(inputValue);
                            const formattedTime = formatTime(parsedTime);
                            form.setFieldsValue({
                                time_out: formattedTime,
                            });
                        }}
                    />
                </Form.Item>
                <Form.Item name="meridiem" rules={[validateRules.required]}>
                    <FloatSelect
                        label="Meridiem"
                        placeholder="Meridiem"
                        required={true}
                        options={[
                            {
                                label: "AM",
                                value: "AM",
                            },
                            {
                                label: "PM",
                                value: "PM",
                            },
                        ]}
                    ></FloatSelect>
                </Form.Item>
            </Form>
        </Modal>
    );
}
