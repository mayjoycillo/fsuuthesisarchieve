import { useEffect } from "react";
import { Modal, Form, Button, notification, Upload } from "antd";
import FloatTextArea from "../../../../providers/FloatTextArea";
import { POST } from "../../../../providers/useAxiosQuery";
import notificationErrors from "../../../../providers/notificationErrors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowUp } from "@fortawesome/pro-regular-svg-icons";

export default function ModalFormFacultyLoadEndorseForApproval(props) {
    const {
        toggleModalFormIndorseForApproval,
        setToggleModalFormIndorseForApproval,
    } = props;

    const [form] = Form.useForm();

    const {
        mutate: mutateReportEndorseForApproval,
        loading: isLoadingReportEndorseForApproval,
    } = POST(`api/flm_endorse_for_approval`, "faculty_load_monitoring_list");

    const onFinish = (values) => {
        let data = new FormData();

        data.append(
            "id",
            toggleModalFormIndorseForApproval.data &&
                toggleModalFormIndorseForApproval.data.id
                ? toggleModalFormIndorseForApproval.data.id
                : ""
        );
        data.append(
            "faculty_load_monitoring_id",
            toggleModalFormIndorseForApproval.data &&
                toggleModalFormIndorseForApproval.data
                    .faculty_load_monitoring_id
                ? toggleModalFormIndorseForApproval.data
                      .faculty_load_monitoring_id
                : ""
        );
        data.append("remarks", values.remarks);

        let fileCounter = 0;
        if (values.file.length > 0) {
            for (let x = 0; x < values.file.length; x++) {
                const elem = values.file[x];

                if (elem.originFileObj) {
                    fileCounter++;
                    data.append(`file_${x}`, elem.originFileObj, elem.name);
                }
            }
        }
        data.append("fileCounter", fileCounter);

        mutateReportEndorseForApproval(data, {
            onSuccess: (res) => {
                // console.log("mutateFormUpload res", res);
                if (res.success) {
                    notification.success({
                        message: "Faculty Monitoring Justification",
                        description: res.message,
                    });

                    setToggleModalFormIndorseForApproval({
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
        if (toggleModalFormIndorseForApproval.open) {
            form.setFieldsValue({
                ...toggleModalFormIndorseForApproval.data,
            });
        }

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toggleModalFormIndorseForApproval]);

    return (
        <Modal
            title="Endorse For Approval Form"
            open={toggleModalFormIndorseForApproval.open}
            className="modal-endorse-for-approval-form"
            forceRender
            onCancel={() => {
                setToggleModalFormIndorseForApproval({
                    open: false,
                    data: null,
                });
            }}
            footer={[
                <Button
                    className="btn-main-primary outlined"
                    onClick={() => {
                        setToggleModalFormIndorseForApproval({
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
                    loading={isLoadingReportEndorseForApproval}
                >
                    SUBMIT
                </Button>,
            ]}
        >
            <Form form={form} onFinish={onFinish} initialValues={{ file: [] }}>
                <Form.Item
                    name="file"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => {
                        if (Array.isArray(e)) {
                            return e;
                        }

                        return e?.fileList;
                    }}
                >
                    <Upload.Dragger
                        className="upload-w-100 upload-hide-remove-icon"
                        accept="image/png,image/jpg,image/jpeg"
                        multiple
                        beforeUpload={(file) => {
                            let error = false;
                            const isLt2M = file.size / 102400 / 102400 < 5;
                            if (!isLt2M) {
                                message.error("Audio must smaller than 5MB!");
                                notification.error({
                                    message: "Faculty Monitoring Justification",
                                    description: "Image must smaller than 5MB!",
                                });
                                error = Upload.LIST_IGNORE;
                            }
                            return error;
                        }}
                    >
                        <p className="ant-upload-drag-icon">
                            <FontAwesomeIcon
                                icon={faFileArrowUp}
                                className="m-r-xs"
                            />
                        </p>
                        <p className="ant-upload-text">
                            Click or drag file to this area to upload
                        </p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload
                        </p>
                    </Upload.Dragger>
                </Form.Item>
                <Form.Item name="remarks">
                    <FloatTextArea label="Remarks" placeholder="Remarks" />
                </Form.Item>
            </Form>
        </Modal>
    );
}
