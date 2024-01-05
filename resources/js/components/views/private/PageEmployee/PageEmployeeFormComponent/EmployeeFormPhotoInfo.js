import { Col, Row, Image } from "antd";
import { defaultProfile } from "../../../../providers/companyInfo";

export default function EmployeeFormPhotoInfo() {
    return (
        <Row>
            <Col
                xs={24}
                sm={24}
                md={24}
                lg={24}
                xl={24}
                className="text-center"
            >
                <Image
                    style={{
                        left: "38.75%",
                        right: "61.25%",
                        width: "200px",
                        height: "200px",
                        borderRadius: "100%",
                    }}
                    src={defaultProfile}
                />
            </Col>
        </Row>
    );
}
