import { useEffect } from "react";
import { Modal, Form, Button, notification } from "antd";
import { GET, POST } from "../../../../providers/useAxiosQuery";
import FloatSelect from "../../../../providers/FloatSelect";
import FloatInput from "../../../../providers/FloatInput";

export default function ModalFormDeduction(props) {
    const { toggleModalFormDeduction, setToggleModalFormDeduction } = props;
    const [form] = Form.useForm();

    const { data: dataRates } = GET(`api/ref_rate`, "rate_select");

    const {
        mutate: mutateFacultyLoadDeduction,
        loading: isLoadingFacultyLoadDeduction,
    } = POST(`api/faculty_load_deduction`, "faculty_load_deduction_list");

    const onFinish = (values) => {
        console.log("onFinish", values);

        let rate = "";
        if (dataRates && dataRates.data.length) {
            rate = dataRates.data.find((f) => f.id === values.rate_id).rate;
        }

        let data = {
            ...values,
            rate,
            id:
                toggleModalFormDeduction.data &&
                toggleModalFormDeduction.data.id
                    ? toggleModalFormDeduction.data.id
                    : "",
        };

        if (toggleModalFormDeduction.data && toggleModalFormDeduction.data.id) {
            mutateFacultyLoadDeduction(data, {
                onSuccess: (res) => {
                    // console.log("mutateFormUpload res", res);
                    if (res.success) {
                        notification.success({
                            message: "Faculty Monitoring",
                            description: res.message,
                        });

                        setToggleModalFormDeduction({
                            open: false,
                            data: null,
                        });

                        form.resetFields();
                    } else {
                        notification.error({
                            message: "Faculty Monitoring",
                            description: res.message,
                        });
                    }
                },
                onError: (err) => {
                    notification.error({
                        message: "Faculty Monitoring",
                        description: "Something Went Wrong",
                    });
                },
            });
        } else {
            notification.error({
                message: "Faculty Monitoring",
                description: "Something Went Wrong",
            });
        }
    };

    useEffect(() => {
        if (toggleModalFormDeduction.open) {
            form.setFieldsValue({
                ...toggleModalFormDeduction.data,
            });
        }

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toggleModalFormDeduction]);

    return (
        <Modal
            title="Deduction Form"
            open={toggleModalFormDeduction.open}
            onCancel={() => {
                setToggleModalFormDeduction({ open: false, data: null });
            }}
            footer={[
                <Button
                    className="btn-main-primary outlined"
                    size="large"
                    key={1}
                    onClick={() => {
                        setToggleModalFormDeduction({
                            open: false,
                            data: null,
                        });
                    }}
                >
                    CANCEL
                </Button>,
                <Button
                    type="primary"
                    className="btn-main-primary"
                    size="large"
                    key={2}
                    onClick={() => {
                        form.submit();
                    }}
                    loading={isLoadingFacultyLoadDeduction}
                >
                    SUBMIT
                </Button>,
            ]}
        >
            <Form form={form} onFinish={onFinish}>
                <Form.Item name="rate_id">
                    <FloatSelect
                        label="Rate"
                        placeholder="Rate"
                        options={
                            dataRates && dataRates.data
                                ? dataRates.data.map((item) => ({
                                      value: item.id,
                                      label: item.name,
                                  }))
                                : []
                        }
                        onChange={(e) => {
                            console.log("e", e);

                            let amount =
                                dataRates &&
                                dataRates.data.find((f) => f.id === e);

                            form.setFieldValue("amount", amount.rate);
                        }}
                    />
                </Form.Item>
                <Form.Item name="amount">
                    <FloatInput label="Amount" placeholder="Amount" disabled />
                </Form.Item>
            </Form>
        </Modal>
    );
}
