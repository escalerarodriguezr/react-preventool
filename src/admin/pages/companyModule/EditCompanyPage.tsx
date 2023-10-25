import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSessionStore} from "../../../store/session/useSessionStore";
import {Card, CardBody, CardTitle, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import {EditCompanyGeneralData} from "./component/EditCompanyGeneralData";

export const EditCompanyPage = () => {

    const {id} = useParams();
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
                                    <CardTitle className="h4">Empresa</CardTitle>
                                    <p className="card-title-desc">
                                        Editar empresa
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
                                                    {activeTab == '1' && <EditCompanyGeneralData
                                                        id={id}
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