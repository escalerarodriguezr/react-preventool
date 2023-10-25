import {Breadcrumb, BreadcrumbItem, Col, Row} from "reactstrap";
import {Link} from "react-router-dom";

export const Breadcrumbs = () => {
    return(
        <>
            <Row>
                <Col xs="12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-0 font-size-18">{"Item"}</h4>
                        <div className="page-title-right">
                            <Breadcrumb listClassName="m-0">
                                <BreadcrumbItem>
                                    <Link to="#">Titulo</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem active>
                                    <Link to="#">Item</Link>
                                </BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}