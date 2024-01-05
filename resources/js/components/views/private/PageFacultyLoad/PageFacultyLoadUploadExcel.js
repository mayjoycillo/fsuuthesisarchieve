import React from "react";
import { Card, Col, Row, Button, notification, Upload } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/pro-regular-svg-icons";
import { POSTFILE } from "../../../providers/useAxiosQuery";

export default function PageFacultyLoadUploadExcel() {
    const { mutate: mutateFormUpload } = POSTFILE(
        "api/faculty_load_upload",
        "faculty_load_upload"
    );

    const handleCustomRequest = async ({ file, onSuccess, onError }) => {
        console.log("handleCustomRequest file", file);

        if (file) {
            let formData = new FormData();
            formData.append("file", file, file.name);

            mutateFormUpload(formData, {
                onSuccess: (res) => {
                    // console.log("mutateFormUpload res", res);
                    if (res.success) {
                        notification.success({
                            message: "Faculty Load",
                            description: res.message,
                        });

                        onSuccess();
                    } else {
                        notification.error({
                            message: "Faculty Load",
                            description: res.message,
                        });
                    }
                },
                onError: (err) => {
                    notification.error({
                        message: "Faculty Load",
                        description: "Something Went Wrong",
                    });
                },
            });
        }
    };

    const props = {
        name: "file",
        listType: "picture",
        maxCount: 1,
        multiple: false,
        showUploadList: false,
        customRequest: handleCustomRequest,
        beforeUpload: (file) => {
            const isExcel =
                file.type ===
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                file.type === "application/vnd.ms-excel";

            if (!isExcel) {
                notification.error({
                    message: "Faculty Load",
                    description: `Format is not acceptable`,
                });
            }

            return isExcel ? true : Upload.LIST_IGNORE;
        },

        // onChange(info) {
        // 	const { status } = info.file;
        // 	if (status !== "uploading") {
        // 		console.log(info.file, info.fileList);
        // 	}
        // 	if (status === "done") {
        // 		// message.success(`${info.file.name} file uploaded successfully.`);
        // 		notification.error({
        // 			message: "Faculty Load",
        // 			description: "Something Went Wrong",
        // 		});
        // 	} else if (status === "error") {
        // 		message.error(`${info.file.name} file upload failed.`);
        // 	}
        // },
    };

    return (
        <Row gutter={[12, 12]} id="PageFacultyLoadUploadExcel">
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <Button className="upload-faculty-load">
                    <Upload {...props}>
                        <p className="ant-upload-drag-icon">
                            <FontAwesomeIcon icon={faArrowUpFromBracket} />
                        </p>
                        <p className="ant-upload-text">
                            Click or drag file to this area to upload
                        </p>
                        <p className="ant-upload-hint">
                            Support for a single upload. Strictly prohibited
                            from uploading banned files or other file type.
                        </p>
                    </Upload>{" "}
                </Button>
            </Col>
        </Row>
    );
}
