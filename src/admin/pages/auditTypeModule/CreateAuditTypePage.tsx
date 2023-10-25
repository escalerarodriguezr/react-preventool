import {useUiStore} from "../../../store/ui/useUiStore";
import {useSessionStore} from "../../../store/session/useSessionStore";
import {Card, CardBody, CardTitle, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import {useEffect, useState} from "react";
import {CreateAuditTypeForm} from "./comonent/CreateAuditTypeForm";

export const CreateAuditTypePage = () => {

    const [activeTab, setActiveTab] = useState("1");

    const {appLoading, appLoaded} = useUiStore();
    const {sessionState, getSessionAction} = useSessionStore();


    useEffect(()=>{
        appLoading();
        getSessionAction().then(appLoaded);
    }, [])

    return(
        <>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">Crear Tipo de Auditoría</CardTitle>
                                    <p className="card-title-desc">
                                        Crear un nuevo tipo de Auditoría
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
                                                    {
                                                        activeTab === '1' &&
                                                        sessionState?.actionAdmin?.id &&
                                                        <CreateAuditTypeForm sessionState={sessionState}/>
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