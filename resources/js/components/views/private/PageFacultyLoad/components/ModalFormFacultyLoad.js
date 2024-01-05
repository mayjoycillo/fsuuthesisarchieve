import { Modal, Form, Button, notification } from "antd";
import { POST, GET } from "../../../../providers/useAxiosQuery";
import { useEffect } from "react";
import FloatInput from "../../../../providers/FloatInput";
import FloatSelect from "../../../../providers/FloatSelect";

export default function ModalFormFacultyLoad(props) {
    const { toggleModalFormFacultyLoad, setToggleModalFormFacultyLoad } = props;
    const [form] = Form.useForm();

    const { data: dataRooms } = GET(
        `api/ref_room`,
        "room_selectss",
        (res) => {},
        false
    );

    const { mutate: mutateFacultyLoad, loading: isLoadingFacultyLoad } = POST(
        `api/faculty_load_update_room`,
        "faculty_load_list"
    );

    const onFinish = (values) => {
        console.log("onFinish", values);

        let data = {
            ...values,
            // faculty_load_id: toggleModalFormFacultyLoad.data.id,
            id:
                toggleModalFormFacultyLoad.data &&
                toggleModalFormFacultyLoad.data.id
                    ? toggleModalFormFacultyLoad.data.id
                    : "",
        };

        mutateFacultyLoad(data, {
            onSuccess: (res) => {
                // console.log("mutateFormUpload res", res);
                if (res.success) {
                    notification.success({
                        message: "Faculty Monitoring",
                        description: res.message,
                    });

                    setToggleModalFormFacultyLoad({ open: false, data: null });

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
        if (toggleModalFormFacultyLoad.open) {
            form.setFieldsValue({
                ...toggleModalFormFacultyLoad.data,
            });
        }

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toggleModalFormFacultyLoad]);

    return (
        <Modal
            title={
                <>
                    <b>
                        {toggleModalFormFacultyLoad.data &&
                            toggleModalFormFacultyLoad.data.fullname}
                    </b>
                </>
            }
            open={toggleModalFormFacultyLoad.open}
            onCancel={() => {
                setToggleModalFormFacultyLoad({ open: false, data: null });
            }}
            footer={[
                <Button
                    className="btn-main-primary outlined"
                    size="large"
                    key={1}
                    onClick={() => {
                        setToggleModalFormFacultyLoad({
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
                    loading={isLoadingFacultyLoad}
                >
                    SUBMIT
                </Button>,
            ]}
        >
            <Form form={form} onFinish={onFinish}>
                <p>From:</p>
                <Form.Item name="room_code">
                    <FloatInput label="Room" placeholder="Room" disabled />
                </Form.Item>

                <p>To:</p>
                <Form.Item name="room_id">
                    <FloatSelect
                        label="Room"
                        placeholder="Room"
                        allowClear
                        options={
                            dataRooms
                                ? dataRooms.data.map((item) => {
                                      return {
                                          label: item.room_code,
                                          value: item.id,
                                      };
                                  })
                                : []
                        }
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}
