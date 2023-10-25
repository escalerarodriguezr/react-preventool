import {useEffect, useState} from "react";
import {useSessionStore} from "../../../store/session/useSessionStore";
import {Card, CardBody, CardTitle, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import {useWorkplaceSessionStore} from "../../../store/workplace/useWorkplaceSessionStore";
import {useUiStore} from "../../../store/ui/useUiStore";
import {CreateProcessGeneralData} from "./component/CreateProcessGeneralData";

export const CreateProcessPage = () => {

    const [activeTab, setActiveTab] = useState("1");
    const {appLoading, appLoaded} = useUiStore()

    const {getSessionAction, sessionState} = useSessionStore();
    const {getWorkplaceSessionAction, workplaceSessionState} = useWorkplaceSessionStore();

    useEffect(()=>{
        appLoading();
        getSessionAction().then(appLoaded);

    },[])
    return(
        <>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">Crear Proceso</CardTitle>
                                    <p className="card-title-desc">
                                        Registrar un nuevo proceso para el Centro de Trabajo
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
                                                        sessionState.actionAdmin &&
                                                        workplaceSessionState.actionWorkplace &&
                                                        <CreateProcessGeneralData
                                                            session={sessionState}
                                                            workplace={workplaceSessionState}
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