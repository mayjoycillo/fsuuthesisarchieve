import { useEffect } from "react";
import { Modal, Form, Button, notification, DatePicker } from "antd";
import dayjs from "dayjs";
import validateRules from "../../../../providers/validateRules";
import { apiUrl } from "../../../../providers/companyInfo";

export default function ModalFormExcelPrint(props) {
    const { toggleModalExcelPrint, setToggleModalExcelPrint, from } = props;
    const [form] = Form.useForm();

    const onFinish = (values) => {
        let data = {
            date_start: dayjs(values.date_range[0]).format("YYYY-MM-DD"),
            date_end: dayjs(values.date_range[1]).format("YYYY-MM-DD"),
            from: from,
        };
        window.open(
            apiUrl(`api/faculty_load_report_print?${new URLSearchParams(data)}`)
        );
    };

    useEffect(() => {
        if (!toggleModalExcelPrint) {
            form.resetFields();
        }

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toggleModalExcelPrint]);

    return (
        <Modal
            title="Excel Print"
            open={toggleModalExcelPrint}
            onCancel={() => {
                setToggleModalExcelPrint(false);
            }}
            footer={[
                <Button
                    className="btn-main-primary outlined"
                    size="large"
                    key={1}
                    onClick={() => {
                        setToggleModalExcelPrint(false);
                    }}
                >
                    CLOSE
                </Button>,
                ,
            ]}
        >
            <Form form={form} onFinish={onFinish}>
                <Form.Item name="date_range" rules={[validateRules.required]}>
                    <DatePicker.RangePicker
                        size="large"
                        className="w-100"
                        format={["MM/DD/YYYY", "MM/DD/YYYY"]}
                    />
                </Form.Item>

                <div className="text-center">
                    <Button
                        type="primary"
                        className="btn-main-primary"
                        size="large"
                        htmlType="submit"
                        // loading={isLoadingFacultyLoadReportPrint}
                    >
                        SUBMIT
                    </Button>
                </div>
            </Form>
        </Modal>
    );
}
