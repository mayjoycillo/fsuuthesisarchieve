import { useState } from "react";
import { Button, Col, Form, Row, Popconfirm, Checkbox } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/pro-regular-svg-icons";

import FloatTextArea from "../../../../providers/FloatTextArea";
import FloatSelect from "../../../../providers/FloatSelect";
import validateRules from "../../../../providers/validateRules";

export default function EmployeeFormAddressInfo(props) {
    const {
        formDisabled,
        form,
        dataRegions,
        dataProvinces,
        dataMunicipalities,
    } = props;

    const RenderInput = (props) => {
        const {
            formDisabled,
            form,
            name,
            restField,
            fields,
            remove,
            dataRegions,
            dataProvinces,
            dataMunicipalities,
        } = props;

        const [provinceList, setProvinceList] = useState([]);
        const [municipalityList, setMunicipalityList] = useState([]);

        const handleChangeHomeAddress = (e) => {
            const { checked, value } = e.target;
            let formTemp = form.getFieldValue("address_list");
            let thisval = formTemp[name];
            formTemp = formTemp.map((item) => ({
                ...item,
                is_home_address: null,
            }));
            formTemp[name] = { ...thisval };
            form.setFieldsValue({
                address_list: formTemp,
            });
        };
        const handleChangeCurrentAddress = (e) => {
            const { checked, value } = e.target;
            let formTemp = form.getFieldValue("address_list");
            let thisval = formTemp[name];
            formTemp = formTemp.map((item) => ({
                ...item,
                is_current_address: null,
            }));
            formTemp[name] = { ...thisval };
            form.setFieldsValue({
                address_list: formTemp,
            });
        };

        return (
            <Row gutter={[12, 0]}>
                <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                    <Form.Item
                        {...restField}
                        name={[name, "region_id"]}
                        rules={[validateRules.required]}
                    >
                        <FloatSelect
                            label="Region"
                            placeholder="Region"
                            allowClear
                            required={true}
                            options={dataRegions.map((item) => ({
                                value: item.id,
                                label: item.region,
                            }))}
                            onChange={(e) => {
                                if (e) {
                                    let provincesTemp = dataProvinces.filter(
                                        (f) => f.region_id === e
                                    );
                                    setProvinceList(provincesTemp);
                                    setMunicipalityList([]);
                                } else {
                                    setProvinceList([]);
                                    setMunicipalityList([]);
                                }

                                let formTemp =
                                    form.getFieldValue("address_list");

                                formTemp[name] = {
                                    ...formTemp[name],
                                    province_id: null,
                                    municipality_id: null,
                                };
                                form.setFieldsValue({
                                    address_list: formTemp,
                                });

                                // form.r
                            }}
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                    <Form.Item
                        {...restField}
                        name={[name, "province_id"]}
                        rules={[validateRules.required]}
                    >
                        <FloatSelect
                            label="Province"
                            placeholder="Province"
                            allowClear
                            required={true}
                            options={provinceList.map((item) => ({
                                value: item.id,
                                label: item.province,
                            }))}
                            onChange={(e) => {
                                if (e) {
                                    let municipalityTemp =
                                        dataMunicipalities.filter(
                                            (f) => f.province_id === e
                                        );
                                    setMunicipalityList(municipalityTemp);
                                } else {
                                    setMunicipalityList([]);
                                }
                                let formTemp =
                                    form.getFieldValue("address_list");

                                formTemp[name] = {
                                    ...formTemp[name],
                                    municipality_id: null,
                                };
                                form.setFieldsValue({
                                    address_list: formTemp,
                                });
                            }}
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                    <Form.Item
                        {...restField}
                        name={[name, "municipality_id"]}
                        rules={[validateRules.required]}
                    >
                        <FloatSelect
                            label="Municipality"
                            placeholder="Municipality"
                            allowClear
                            required={true}
                            options={municipalityList.map((item) => ({
                                value: item.id,
                                label: item.municipality,
                            }))}
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                    <div className="action">
                        <div className="checkbox-group">
                            <Form.Item
                                {...restField}
                                name={[name, "is_home_address"]}
                                noStyle
                                valuePropName="checked"
                            >
                                <Checkbox
                                    value={1}
                                    onChange={handleChangeHomeAddress}
                                >
                                    Home Address
                                </Checkbox>
                            </Form.Item>

                            <Form.Item
                                {...restField}
                                name={[name, "is_current_address"]}
                                noStyle
                                valuePropName="checked"
                            >
                                <Checkbox
                                    value={2}
                                    onChange={handleChangeCurrentAddress}
                                >
                                    Current Address
                                </Checkbox>
                            </Form.Item>
                        </div>
                        {fields.length > 1 ? (
                            <Popconfirm
                                title="Are you sure to delete this address?"
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
                                    className="form-list-remove-button p-0"
                                >
                                    <FontAwesomeIcon
                                        icon={faTrashAlt}
                                        className="fa-lg"
                                    />
                                </Button>
                            </Popconfirm>
                        ) : null}
                    </div>
                </Col>

                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item
                        {...restField}
                        name={[name, "address"]}
                        rules={[validateRules.required]}
                    >
                        <FloatTextArea
                            label="Address"
                            placeholder="Address"
                            required={true}
                            disabled={formDisabled}
                        />
                    </Form.Item>
                </Col>
            </Row>
        );
    };

    return (
        <Row gutter={[12, 12]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.List name="address_list">
                    {(fields, { add, remove }) => (
                        <Row gutter={[12, 0]}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                {fields.map(
                                    ({ key, name, ...restField }, index) => (
                                        <div
                                            key={key}
                                            className={`${
                                                index !== 0 ? "mt-25" : ""
                                            }`}
                                        >
                                            <RenderInput
                                                formDisabled={formDisabled}
                                                form={form}
                                                dataRegions={dataRegions}
                                                dataProvinces={dataProvinces}
                                                dataMunicipalities={
                                                    dataMunicipalities
                                                }
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
                                    Add Another Address
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form.List>
            </Col>
        </Row>
    );
}
