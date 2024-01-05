import { useEffect } from "react";
import { Modal, Form, Button, notification } from "antd";
import FloatTextArea from "../../../../providers/FloatTextArea";
import { GET, POST } from "../../../../providers/useAxiosQuery";
import notificationErrors from "../../../../providers/notificationErrors";
import FloatSelect from "../../../../providers/FloatSelect";

export default function ModalFormFacultyLoadJustification(props) {
    const { toggleModalFormJustification, setToggleModalFormJustification } =
        props;

    const [form] = Form.useForm();

    const { data: dataStatus } = GET(
        `api/ref_status?status_category_code=SC-02&from=PageFacultyLoadMonitoring`,
        "room_selectss",
        (res) => {},
        false
    );

    const {
        mutate: mutateUpdateJustification,
        loading: isLoadingUpdateJustification,
    } = POST(`api/flm_justification_update_status`, "flm_justification_list");

    const onFinish = (values) => {
        let data = {
            ...values,
            id: toggleModalFormJustification.data
                ? toggleModalFormJustification.data.id
                : "",
            faculty_load_monitoring_id:
                toggleModalFormJustification.data &&
                toggleModalFormJustification.data.faculty_load_monitoring_id
                    ? toggleModalFormJustification.data
                          .faculty_load_monitoring_id
                    : "",
        };

        mutateUpdateJustification(data, {
            onSuccess: (res) => {
                // console.log("mutateFormUpload res", res);
                if (res.success) {
                    notification.success({
                        message: "Faculty Monitoring Justification",
                        description: res.message,
                    });

                    setToggleModalFormJustification({
                        open: false,
                        data: null,
                    });

                    form.resetFields();
                } else {
                    notification.error({
                        message: "Faculty Monitoring Justification",
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
        if (toggleModalFormJustification.open) {
            form.setFieldsValue({
                ...toggleModalFormJustification.data,
            });
        }

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toggleModalFormJustification]);

    return (
        <Modal
            title="Endorse For Approval Form"
            open={toggleModalFormJustification.open}
            onCancel={() => {
                setToggleModalFormJustification({
                    open: false,
                    data: null,
                });
            }}
            footer={[
                <Button
                    className="btn-main-primary outlined"
                    onClick={() => {
                        setToggleModalFormJustification({
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
                    loading={isLoadingUpdateJustification}
                >
                    SUBMIT
                </Button>,
            ]}
        >
            <Form form={form} onFinish={onFinish}>
                <Form.Item name="status_id">
                    <FloatSelect
                        label="Status"
                        placeholder="Status"
                        allowClear
                        options={
                            dataStatus
                                ? dataStatus.data.map((item) => {
                                      return {
                                          label: item.status,
                                          value: item.id,
                                      };
                                  })
                                : []
                        }
                    />
                </Form.Item>

                <Form.Item name="remarks2">
                    <FloatTextArea label="Remarks" placeholder="Remarks" />
                </Form.Item>
            </Form>
        </Modal>
    );
}
