import {useEffect, useState} from "react";
import {useSessionStore} from "../../../store/session/useSessionStore";
import {Card, CardBody, CardTitle, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import {SearchAuditTypeTable} from "./comonent/SearchAuditTypeTable";

export const SearchAuditTypePage = () => {
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
                                    <CardTitle className="h4">Auditorías</CardTitle>
                                    <p className="card-title-desc">
                                        Gestionar Tipos de Auditorías del sistema
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
                                                Listado
                                            </NavLink>
                                        </NavItem>
                                    </Nav>

                                    <TabContent
                                        activeTab={activeTab}
                                        className="p-3 text-muted"
                                    >
                                        <TabPane tabId="1">
                                            <Row>
                                                {/*<h2>Tabla de auditorias</h2>*/}
                                                <Col sm="12">
                                                    {
                                                        activeTab == '1'
                                                        && sessionState.actionAdmin?.id
                                                        && <SearchAuditTypeTable sessionState={sessionState}/>
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