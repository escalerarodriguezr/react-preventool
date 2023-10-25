import {Card, CardBody, CardTitle, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import {useEffect, useState} from "react";
import classnames from "classnames";
import {CreateCompanyGeneralData} from "./component/CreateCompanyGeneralData";
import {useSessionStore} from "../../../store/session/useSessionStore";

export const CreateCompanyPage = () => {

    const [activeTab, setActiveTab] = useState("1");

    const {getSessionAction, sessionState} = useSessionStore();

    useEffect(()=>{
        getSessionAction();
    },[]);

    return(
        <>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">Crear empresa</CardTitle>
                                    <p className="card-title-desc">
                                        Registrar una nueva empresa en el sistema
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
                                                    {activeTab == '1' && <CreateCompanyGeneralData
                                                        sessionState={sessionState}
                                                    />}
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