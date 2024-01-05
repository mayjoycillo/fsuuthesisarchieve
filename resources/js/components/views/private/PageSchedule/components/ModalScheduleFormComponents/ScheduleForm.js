import { Button, Col, Form, Row, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/pro-regular-svg-icons";

import FloatSelect from "../../../../../providers/FloatSelect";
import { GET } from "../../../../../providers/useAxiosQuery";

export default function ScheduleForm(props) {
    const { formDisabled } = props;

    const { data: dataSubjects } = GET(
        `api/ref_subject`,
        "subject_select",
        (res) => {},
        false
    );

    const { data: dataRooms } = GET(
        `api/ref_room`,
        "room_select",
        (res) => {},
        false
    );

    const { data: dataSemesters } = GET(
        `api/ref_semester`,
        "semester_select",
        (res) => {},
        false
    );

    const { data: dataSchoolYears } = GET(
        `api/ref_school_year`,
        "school_years_select",
        (res) => {},
        false
    );

    const RenderInput = (props) => {
        const { formDisabled, name, restField, fields, remove } = props;

        return (
            <>
                <Row gutter={[12, 0]} className="schedule-wrapper">
                    <Col xs={24} sm={24} md={24} lg={11} xl={11}>
                        <Form.Item {...restField} name={[name, "subject_id"]}>
                            <FloatSelect
                                label="Subject"
                                placeholder="Subject"
                                allowClear
                                required={true}
                                options={
                                    dataSubjects
                                        ? dataSubjects.data.map((item) => {
                                              return {
                                                  label: item.code,
                                                  value: item.id,
                                              };
                                          })
                                        : []
                                }
                            />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={11} xl={11}>
                        <Form.Item {...restField} name={[name, "room_id"]}>
                            <FloatSelect
                                label="Room"
                                placeholder="Room"
                                allowClear
                                required={true}
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
                    </Col>

                    <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                        <div className="action">
                            <div />
                            {fields.length > 1 ? (
                                <Popconfirm
                                    title="Are you sure to delete this schedule?"
                                    onConfirm={() => {
                                        // handleDeleteQuestion(name);
                                        remove(name);
                                    }}
                                    onCancel={() => {}}
                                    okText="Yes"
                                    cancelText="No"
                                    placement="topRight"
                                    okButtonProps={{
                                        className: "btn-main-invert",
                                    }}
                                >
                                    <Button
                                        type="link"
                                        className="form-list-remove-button p-0 btn-delete"
                                    >
                                        <FontAwesomeIcon
                                            icon={faTrashCan}
                                            className="fa-lg"
                                        />
                                    </Button>
                                </Popconfirm>
                            ) : null}
                        </div>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={11} xl={11}>
                        <Form.Item {...restField} name={[name, "semester_id"]}>
                            <FloatSelect
                                label="Semester"
                                placeholder="Semester"
                                allowClear
                                required={true}
                                options={
                                    dataSemesters
                                        ? dataSemesters.data.map((item) => {
                                              return {
                                                  label: item.semester,
                                                  value: item.id,
                                              };
                                          })
                                        : []
                                }
                            />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={11} xl={11}>
                        <Form.Item
                            {...restField}
                            name={[name, "school_year_id"]}
                        >
                            <FloatSelect
                                label="School Year"
                                placeholder="School Year"
                                allowClear
                                required={true}
                                options={
                                    dataSchoolYears
                                        ? dataSchoolYears.data.map((item) => {
                                              const label = `${item.sy_from} - ${item.sy_to}`;
                                              return {
                                                  label: label,
                                                  value: item.id,
                                              };
                                          })
                                        : []
                                }
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </>
        );
    };

    return (
        <Row gutter={[12, 0]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.List name="schedule_list">
                    {(fields, { add, remove }) => (
                        <Row gutter={[12, 0]}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                {fields.map(
                                    ({ key, name, ...restField }, index) => (
                                        <div
                                            key={key}
                                            className={`${
                                                index !== 0 ? "" : ""
                                            }`}
                                        >
                                            <RenderInput
                                                formDisabled={formDisabled}
                                                name={name}
                                                restField={restField}
                                                fields={fields}
                                                remove={remove}
                                            />
                                        </div>
                                    )
                                )}
                            </Col>

                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Button
                                    type="link"
                                    className="btn-main-primary p-0"
                                    icon={<FontAwesomeIcon icon={faPlus} />}
                                    onClick={() => add()}
                                >
                                    Add Another Schedule
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form.List>
            </Col>
        </Row>
    );
}
