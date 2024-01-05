import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Form, Row, Col, Collapse, Button, notification } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/pro-regular-svg-icons";

import { GET, POST } from "../../../providers/useAxiosQuery";
import EmployeeFormAccountInfo from "./PageEmployeeFormComponent/EmployeeFormAccountInfo";
import EmployeeFormBasicInfo from "./PageEmployeeFormComponent/EmployeeFormBasicInfo";
import EmployeeFormDepartmentInfo from "./PageEmployeeFormComponent/EmployeeFormDepartmentInfo";
import EmployeeFormAddressInfo from "./PageEmployeeFormComponent/EmployeeFormAddressInfo";
import EmployeeFormPhotoInfo from "./PageEmployeeFormComponent/EmployeeFormPhotoInfo";
import EmployeeFormBenificiaryInfo from "./PageEmployeeFormComponent/EmployeeFormBenificiaryInfo";
import EmployeeFormContactInfo from "./PageEmployeeFormComponent/EmployeeFormContactInfo";
import EmployeeFormParentInfo from "./PageEmployeeFormComponent/EmployeeFormParentInfo";
import EmployeeFormSchoolAttendedInfo from "./PageEmployeeFormComponent/EmployeeFormSchoolAttendedInfo";
import EmployeeFormWorkExperienceInfo from "./PageEmployeeFormComponent/EmployeeFormWorkExperienceInfo";
import EmployeeFormTrainingCertificateInfo from "./PageEmployeeFormComponent/EmployeeFormTrainingCertificateInfo";
import EmployeeFormFamilyInfo from "./PageEmployeeFormComponent/EmployeeFormFamilyInfo";
import EmployeeFormOtherQualificationInfo from "./PageEmployeeFormComponent/EmployeeFormOtherQualificationInfo";
import EmployeeFormProjects from "./PageEmployeeFormComponent/EmployeeFormProjects";
import EmployeeFormMembershipInfo from "./PageEmployeeFormComponent/EmployeeFormMembershipInfo";
import EmployeeFormEducationTravelInfo from "./PageEmployeeFormComponent/EmployeeFormEducationTravelInfo";
import EmployeeFormExaminationInfo from "./PageEmployeeFormComponent/EmployeeFormExaminationInfo";

import notificationErrors from "../../../providers/notificationErrors";
import EmployeeFormReferences from "./PageEmployeeFormComponent/EmployeeFormReferences";
import EmployeeFormEmergencyContactInfo from "./PageEmployeeFormComponent/EmployeeFormEmergencyContactInfo";

export default function PageEmployeeForm() {
    const location = useLocation();
    const [form] = Form.useForm();

    console.log("location", location);

    const [formDisabled, setFormDisabled] = useState(false);

    const { data: dataRegions } = GET(`api/ref_region`, "ref_region");
    const { data: dataProvinces } = GET(`api/ref_province`, "ref_province");
    const { data: dataMunicipalities } = GET(
        `api/ref_municipality`,
        "ref_municipality"
    );
    const { data: dataDepartments } = GET(
        `api/ref_department`,
        "ref_department"
    );
    const { data: dataReligion } = GET(`api/ref_religion`, "ref_religion");
    const { data: dataLanguage } = GET(`api/ref_language`, "ref_language");
    const { data: dataNationalities } = GET(
        `api/ref_nationality`,
        "ref_nationality"
    );
    const { data: dataCivilStatus } = GET(
        `api/ref_civilstatus`,
        "ref_civilstatus"
    );
    const { data: dataSchoolLevel } = GET(
        `api/ref_school_level`,
        "ref_school_level"
    );
    const { data: dataPosition } = GET(
        `api/ref_position`,
        "ref_position_select"
    );

    const { mutate: mutateProfile, loading: loadingProfile } = POST(
        `api/create_profile`,
        "profile_list"
    );

    // const { data: dataUpdate } = GET(`api/update_profile`, "profile_list");

    const onFinish = (values) => {
        console.log("onFinish", values);

        let pathname = location.pathname;

        console.log("pathcheck", pathname);

        let employment_type = "Full-Time";

        if (pathname == "/employees/full-time/add") {
            employment_type = "Full-Time";
        } else if (pathname == "/employees/part-time/add") {
            employment_type = "Part-Time";
        }

        let address_list =
            values.address_list && values.address_list.length > 0
                ? values.address_list.map((item) => ({
                      ...item,
                      is_current_address: item.is_current_address
                          ? item.is_current_address
                          : false,
                      is_home_address: item.is_home_address
                          ? item.is_home_address
                          : false,
                  }))
                : [];

        let school_attended_list =
            values.school_attended_list &&
            values.school_attended_list.length > 0
                ? values.school_attended_list.map((item) => ({
                      ...item,
                      year_graduated: item.year_graduated
                          ? item.year_graduated.format("YYYY")
                          : null,
                  }))
                : [];

        let spouse_list =
            values.spouse_list && values.spouse_list.length > 0
                ? values.spouse_list.map((item) => ({
                      ...item,

                      children_list:
                          item.children_list && item.children_list.length > 0
                              ? item.children_list.map((item2) => ({
                                    ...item2,
                                    birthdate: item2.birthdate
                                        ? item2.birthdate.format("YYYY-MM-DD")
                                        : null,
                                }))
                              : [],
                  }))
                : [];

        let profile_other1 =
            values.profile_other1 && values.profile_other1.length > 0
                ? values.profile_other1.map((item) => ({
                      ...item,
                      year: item.year
                          ? item.year.format("YYYY") + "-01-01"
                          : null,
                  }))
                : [];
        let profile_other2 =
            values.profile_other2 && values.profile_other2.length > 0
                ? values.profile_other2
                : [];
        let profile_other3 =
            values.profile_other3 && values.profile_other3.length > 0
                ? values.profile_other3.map((item) => ({
                      ...item,
                      year: item.year
                          ? item.year.format("YYYY") + "-01-01"
                          : null,
                  }))
                : [];
        let profile_other4 =
            values.profile_other4 && values.profile_other4.length > 0
                ? values.profile_other4.map((item) => ({
                      ...item,
                      year: item.year
                          ? item.year.format("YYYY") + "-01-01"
                          : null,
                  }))
                : [];
        let profile_other5 =
            values.profile_other5 && values.profile_other5.length > 0
                ? values.profile_other5.map((item) => ({
                      ...item,
                      year: item.year
                          ? item.year.format("YYYY") + "-01-01"
                          : null,
                  }))
                : [];
        let profile_other6 =
            values.profile_other6 && values.profile_other6.length > 0
                ? values.profile_other6
                : [];

        let data = {
            ...values,
            address_list,
            school_attended_list,
            spouse_list,
            profile_other1,
            profile_other2,
            profile_other3,
            profile_other4,
            profile_other5,
            profile_other6,
            employment_type: employment_type,
        };

        mutateProfile(data, {
            onSuccess: (res) => {
                console.log("res", res);
                if (res.success) {
                    setToggleModalForm({
                        open: false,
                        data: null,
                    });
                    form.resetFields();
                    notification.success({
                        message: "Employee",
                        description: res.message,
                    });
                } else {
                    notification.error({
                        message: "Employee",
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
        const timer = setTimeout(() => {
            setFormDisabled(false);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <Form
            form={form}
            onFinish={onFinish}
            initialValues={{
                address_list: [""],
                benificiary_list: [""],
                contact_list: [""],
                spouse_list: [""],
                parent_list: [""],
                school_attended_list: [""],
                emergency_contact_list: [""],
                work_experience_list: [""],
                training_certificate_list: [""],
                children_list: [""],
            }}
        >
            <Row gutter={[12, 12]}>
                <Col xs={24} sm={24} md={24} lg={24} xl={16}>
                    <Collapse
                        className="collapse-main-primary"
                        defaultActiveKey={[
                            "0",
                            "1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7",
                            "8",
                            "9",
                            "10",
                            "11",
                            "12",
                            "13",
                            "14",
                            "15",
                            "16",
                            "17",
                        ]}
                        size="middle"
                        expandIcon={({ isActive }) => (
                            <FontAwesomeIcon
                                icon={isActive ? faAngleUp : faAngleDown}
                            />
                        )}
                        items={[
                            {
                                key: "0",
                                label: "ACCOUNT INFORMATION",
                                className: "collapse-item-account-info",
                                children: (
                                    <EmployeeFormAccountInfo
                                        formDisabled={formDisabled}
                                        location={location}
                                    />
                                ),
                            },
                            {
                                key: "1",
                                label: "DEPARTMENT INFORMATION",
                                className: "collapse-item-department-info",
                                children: (
                                    <EmployeeFormDepartmentInfo
                                        formDisabled={formDisabled}
                                        location={location}
                                        dataDepartments={
                                            dataDepartments
                                                ? dataDepartments.data
                                                : []
                                        }
                                    />
                                ),
                            },
                            {
                                key: "2",
                                label: "PERSONAL INFORMATION",
                                className: "collapse-item-personal-info",
                                children: (
                                    <EmployeeFormBasicInfo
                                        formDisabled={formDisabled}
                                        location={location}
                                        dataReligion={
                                            dataReligion
                                                ? dataReligion.data
                                                : []
                                        }
                                        dataLanguage={
                                            dataLanguage
                                                ? dataLanguage.data
                                                : []
                                        }
                                        dataNationalities={
                                            dataNationalities
                                                ? dataNationalities.data
                                                : []
                                        }
                                    />
                                ),
                            },
                            {
                                key: "3",
                                label: "ADDRESS INFORMATION",
                                className: "collapse-item-address-info",
                                children: (
                                    <EmployeeFormAddressInfo
                                        formDisabled={formDisabled}
                                        location={location}
                                        form={form}
                                        dataRegions={
                                            dataRegions && dataRegions.data
                                                ? dataRegions.data
                                                : []
                                        }
                                        dataProvinces={
                                            dataProvinces && dataProvinces.data
                                                ? dataProvinces.data
                                                : []
                                        }
                                        dataMunicipalities={
                                            dataMunicipalities &&
                                            dataMunicipalities.data
                                                ? dataMunicipalities.data
                                                : []
                                        }
                                    />
                                ),
                            },
                            {
                                key: "4",
                                label: "CONTACT INFORMATION",
                                className: "collapse-item-contact-info",
                                children: (
                                    <EmployeeFormContactInfo
                                        formDisabled={formDisabled}
                                        location={location}
                                    />
                                ),
                            },
                            {
                                key: "5",
                                label: "FAMILY INFORMATION",
                                className: "collapse-item-family-info",
                                children: (
                                    <EmployeeFormFamilyInfo
                                        formDisabled={formDisabled}
                                        location={location}
                                        form={form}
                                        dataCivilStatus={
                                            dataCivilStatus &&
                                            dataCivilStatus.data
                                                ? dataCivilStatus.data
                                                : []
                                        }
                                    />
                                ),
                            },
                            {
                                key: "8",
                                label: "SCHOOL ATTENDED INFORMATION",
                                className: "collapse-item-school-attended-info",
                                children: (
                                    <EmployeeFormSchoolAttendedInfo
                                        formDisabled={formDisabled}
                                        location={location}
                                        dataSchoolLevel={
                                            dataSchoolLevel
                                                ? dataSchoolLevel.data
                                                : []
                                        }
                                    />
                                ),
                            },
                            {
                                key: "11",
                                label: "OTHER QUALIFICATION ( PROFICIENCY, VOCATIONAL, TECHNICAL, ETC.) INFORMATION",
                                className:
                                    "collapse-item-other-qualification-info",
                                children: (
                                    <EmployeeFormOtherQualificationInfo
                                        formDisabled={formDisabled}
                                        location={location}
                                    />
                                ),
                            },
                            {
                                key: "12",
                                label: "EXAMINATIONS TAKEN INFORMATION",
                                className: "collapse-item-examination-info",
                                children: (
                                    <EmployeeFormExaminationInfo
                                        formDisabled={formDisabled}
                                        location={location}
                                    />
                                ),
                            },
                            {
                                key: "13",
                                label: "ARTICLES, RESEARCHES, BOOKS, ETC. WRITTEN INFORMATION",
                                className: "collapse-item-project-info",
                                children: (
                                    <EmployeeFormProjects
                                        formDisabled={formDisabled}
                                        location={location}
                                    />
                                ),
                            },
                            {
                                key: "14",
                                label: "MEMBERSHIP IN PROFESSIONAL, CULTURAL AND OTHER ORGANIZATION INFORMATION",
                                className:
                                    "collapse-item-other-membership-info",
                                children: (
                                    <EmployeeFormMembershipInfo
                                        formDisabled={formDisabled}
                                        location={location}
                                    />
                                ),
                            },
                            {
                                key: "15",
                                label: "EDUCATIONAL TRAVEL INFORMATION",
                                className:
                                    "collapse-item-educational-travel-info",
                                children: (
                                    <EmployeeFormEducationTravelInfo
                                        formDisabled={formDisabled}
                                        location={location}
                                    />
                                ),
                            },
                            {
                                key: "16",
                                label: "REFERENCES AND THEIR ADDRESSES (At least three)",
                                className: "collapse-item-references-info",
                                children: (
                                    <EmployeeFormReferences
                                        formDisabled={formDisabled}
                                        location={location}
                                    />
                                ),
                            },
                            {
                                key: "17",
                                label: "WHOM TO INFORM IN CASE OF EMERGENCY",
                                className: "collapse-item-emergency-info",
                                children: (
                                    <EmployeeFormEmergencyContactInfo
                                        formDisabled={formDisabled}
                                        location={location}
                                    />
                                ),
                            },
                            {
                                key: "6",
                                label: "BENIFICIARY INFORMATION",
                                className: "collapse-item-benificiary-info",
                                children: (
                                    <EmployeeFormBenificiaryInfo
                                        formDisabled={formDisabled}
                                        location={location}
                                    />
                                ),
                            },
                            {
                                key: "7",
                                label: "PARENT INFORMATION",
                                className: "collapse-item-parent-info",
                                children: (
                                    <EmployeeFormParentInfo
                                        formDisabled={formDisabled}
                                        location={location}
                                    />
                                ),
                            },

                            {
                                key: "9",
                                label: "WORK EXPERIENCE INFORMATION",
                                className: "collapse-item-work-experience-info",
                                children: (
                                    <EmployeeFormWorkExperienceInfo
                                        formDisabled={formDisabled}
                                        location={location}
                                        dataPosition={
                                            dataPosition
                                                ? dataPosition.data
                                                : []
                                        }
                                    />
                                ),
                            },
                            {
                                key: "10",
                                label: "TRAINING CERTIFICATE INFORMATION",
                                className:
                                    "collapse-item-training-certificate-info",
                                children: (
                                    <EmployeeFormTrainingCertificateInfo
                                        formDisabled={formDisabled}
                                        location={location}
                                    />
                                ),
                            },
                        ]}
                    />
                </Col>

                <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                    <Collapse
                        className="collapse-main-primary"
                        defaultActiveKey={["0", "1"]}
                        size="middle"
                        expandIcon={({ isActive }) => (
                            <FontAwesomeIcon
                                icon={isActive ? faAngleUp : faAngleDown}
                            />
                        )}
                        items={[
                            {
                                key: "0",
                                label: "PHOTO",
                                children: (
                                    <EmployeeFormPhotoInfo
                                        formDisabled={formDisabled}
                                        location={location}
                                    />
                                ),
                            },
                        ]}
                    />
                </Col>
            </Row>

            <Row gutter={[12, 12]}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Button
                        className="btn-main-primary btn-main-invert-outline b-r-none mt-20"
                        type="primary"
                        size="large"
                        onClick={() => form.submit()}
                        loading={loadingProfile}
                    >
                        Submit Form
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}
