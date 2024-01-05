import { useEffect } from "react";
import { Modal, Button, Image } from "antd";
import { apiUrl } from "../../../../providers/companyInfo";

export default function ModalFormFacultyLoadReportAttachment(props) {
    const {
        toggleModalFormFacultyLoadReportAttachment,
        setToggleModalFormFacultyLoadReportAttachment,
    } = props;

    return (
        <Modal
            title="Attachment Preview"
            open={toggleModalFormFacultyLoadReportAttachment.open}
            className="modal-justification-attachment-preview"
            onCancel={() => {
                setToggleModalFormFacultyLoadReportAttachment({
                    open: false,
                    data: null,
                });
            }}
            footer={[
                <Button
                    className="btn-main-primary outlined"
                    size="large"
                    onClick={() => {
                        setToggleModalFormFacultyLoadReportAttachment({
                            open: false,
                            data: null,
                        });
                    }}
                    key={1}
                >
                    CLOSE
                </Button>,
            ]}
        >
            <Image.PreviewGroup>
                {toggleModalFormFacultyLoadReportAttachment.data &&
                toggleModalFormFacultyLoadReportAttachment.data.length
                    ? toggleModalFormFacultyLoadReportAttachment.data.map(
                          (item, index) => {
                              return (
                                  <Image
                                      key={index}
                                      src={apiUrl(item.file_path)}
                                  />
                              );
                          }
                      )
                    : null}
            </Image.PreviewGroup>
        </Modal>
    );
}
