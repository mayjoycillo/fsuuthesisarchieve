import { Form } from "antd";
import FloatSelect from "../../../../providers/FloatSelect";

export default function EmployeeFormDepartmentInfo(props) {
    const { formDisabled, dataDepartments } = props;

    return (
        <Form.Item name="department_id">
            <FloatSelect
                label="Department"
                placeholder="Department"
                // multi="multiple"
                allowClear
                options={dataDepartments.map((item) => ({
                    value: item.id,
                    label: item.department_name,
                }))}
                disabled={formDisabled}
            />
        </Form.Item>
    );
}
