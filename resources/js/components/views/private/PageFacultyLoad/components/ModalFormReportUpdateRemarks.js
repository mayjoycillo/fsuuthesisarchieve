import { Modal, Form, Button, notification } from "antd";
import FloatTextArea from "../../../../providers/FloatTextArea";
import { POST } from "../../../../providers/useAxiosQuery";
import { useEffect } from "react";

export default function ModalFormReportUpdateRemarks(props) {
    const { toggleModalFormUpdateRemarks, setToggleModalFormUpdateRemarks } =
        props;

    const [form] = Form.useForm();

    const {
        mutate: mutateReportUpdateRemarks,
        loading: isLoadingReportUpdateRemarks,
    } = POST(
        `api/faculty_load_monitoring_remarks`,
        "faculty_load_monitoring_list"
    );

    const onFinish = (values) => {
        console.log("onFinish", values);

        let data = {
            ...values,
            id:
                toggleModalFormUpdateRemarks.data &&
                toggleModalFormUpdateRemarks.data.id
                    ? toggleModalFormUpdateRemarks.data.id
                    : "",
        };

        mutateReportUpdateRemarks(data, {
            onSuccess: (res) => {
                // console.log("mutateFormUpload res", res);
                if (res.success) {
                    notification.success({
                        message: "Faculty Monitoring",
                        description: res.message,
                    });

                    setToggleModalFormUpdateRemarks({
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
    };

    useEffect(() => {
        if (toggleModalFormUpdateRemarks.open) {
            form.setFieldsValue({
                ...toggleModalFormUpdateRemarks.data,
            });
        }

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toggleModalFormUpdateRemarks]);

    return (
        <Modal
            title={
                <>
                    <b>
                        {toggleModalFormUpdateRemarks.data &&
                            toggleModalFormUpdateRemarks.data.fullname}
                    </b>
                </>
            }
            open={toggleModalFormUpdateRemarks.open}
            onCancel={() => {
                setToggleModalFormUpdateRemarks({ open: false, data: null });
            }}
            footer={[
                <Button
                    className="btn-main-primary outlined"
                    onClick={() => {
                        setToggleModalFormUpdateRemarks({
                            open: false,
                            data: null,
                        });
                    }}
                    key={1}
                >
                    CANCEL
                </Button>,
                <Button
                    type="primary"
                    className="btn-main-primary"
                    onClick={() => {
                        form.submit();
                    }}
                    key={2}
                    loading={isLoadingReportUpdateRemarks}
                >
                    SUBMIT
                </Button>,
            ]}
        >
            <Form form={form} onFinish={onFinish}>
                <Form.Item name="remarks">
                    <FloatTextArea label="Remarks" placeholder="Remarks" />
                </Form.Item>
            </Form>
        </Modal>
    );
}
