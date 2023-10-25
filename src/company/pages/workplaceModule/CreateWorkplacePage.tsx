import {Card, CardBody, CardTitle, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import {useEffect, useState} from "react";
import {useSessionStore} from "../../../store/session/useSessionStore";
import {useCompanySessionStore} from "../../../store/compnay/useCompanySessionStore";
import classnames from "classnames";
import {CreateCompanyGeneralData} from "../../../admin/pages/companyModule/component/CreateCompanyGeneralData";
import {CreateWorkplaceGeneralData} from "./component/CreateWorkplaceGeneralData";


export const CreateWorkplacePage = () => {

    const [activeTab, setActiveTab] = useState("1");

    const {getSessionAction, sessionState} = useSessionStore();
    const {getCompanySessionAction, companySessionState} = useCompanySessionStore();

    useEffect(()=>{
        getSessionAction();
        // getCompanySessionAction();
    },[]);
    return(
        <>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">Crear Centro de trabajo</CardTitle>
                                    <p className="card-title-desc">
                                        Registrar un Centro de trabajo para la empresa {companySessionState.actionCompany?.name}
                                    </p>
                                    <Nav tabs>
                                        <NavItem>
                                            <NavLink
                                                style={{ cursor: "pointer" }}
                                                className={classnames({
                                                    active: activeTab === "1",
                                                })}
                                                onClick={() => {
                                                    setActiveTab("1");
                                                }}
                                            >
                                                Datos generales
                                            </NavLink>
                                        </NavItem>
                                    </Nav>

                                    <TabContent
                                        activeTab={activeTab}
                                        className="p-3 text-muted"
                                    >
                                        <TabPane tabId="1">
                                            <Row>
                                                <Col sm="12">
                                                    {activeTab == '1' &&
                                                        <CreateWorkplaceGeneralData
                                                            sessionState={sessionState}
                                                            companySessionState={companySessionState}
                                                        />
                                                    }
                                                </Col>
                                            </Row>
                                        </TabPane>
                                    </TabContent>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}