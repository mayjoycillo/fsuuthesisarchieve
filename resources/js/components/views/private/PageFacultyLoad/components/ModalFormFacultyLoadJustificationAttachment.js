import { useEffect } from "react";
import { Modal, Button, Image, Empty } from "antd";
import { apiUrl } from "../../../../providers/companyInfo";

export default function ModalFormFacultyLoadJustificationAttachment(props) {
    const {
        toggleModalFormJustificationAttachment,
        setToggleModalFormJustificationAttachment,
    } = props;

    return (
        <Modal
            title="Attachment Preview"
            open={toggleModalFormJustificationAttachment.open}
            className="modal-justification-attachment-preview"
            onCancel={() => {
                setToggleModalFormJustificationAttachment({
                    open: false,
                    data: null,
                });
            }}
            footer={[
                <Button
                    className="btn-main-primary outlined"
                    size="large"
                    onClick={() => {
                        setToggleModalFormJustificationAttachment({
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
                {toggleModalFormJustificationAttachment.data &&
                toggleModalFormJustificationAttachment.data.length ? (
                    toggleModalFormJustificationAttachment.data.map(
                        (item, index) => {
                            return (
                                <Image
                                    key={index}
                                    src={apiUrl(item.file_path)}
                                />
                            );
                        }
                    )
                ) : (
                    <div className="text-center w-100">
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </div>
                )}
            </Image.PreviewGroup>
        </Modal>
    );
}
