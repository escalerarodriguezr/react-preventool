import {Col, Row} from "reactstrap";
import {useCompanySessionStore} from "../../../store/compnay/useCompanySessionStore";

export const Footer = () => {
    const {companySessionState} = useCompanySessionStore();

    return(
        <>
            <footer className="footer">
                <div className="container-fluid">
                    <Row>
                        <Col sm={6}>{new Date().getFullYear()} © Preventool.</Col>
                        <Col sm={6}>
                            <div className="text-sm-end d-none d-sm-block">
                                {companySessionState.actionCompany?.name}
                            </div>
                        </Col>
                    </Row>
                </div>
            </footer>
        </>
    )
}