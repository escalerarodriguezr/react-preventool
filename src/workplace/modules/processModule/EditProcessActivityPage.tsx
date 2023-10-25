import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Card, CardBody, CardTitle, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import {CreateProcessActivityGeneralData} from "./component/CreateProcessActivityGeneralData";
import {useUiStore} from "../../../store/ui/useUiStore";
import {useSessionStore} from "../../../store/session/useSessionStore";
import {useWorkplaceSessionStore} from "../../../store/workplace/useWorkplaceSessionStore";
import {EditProcessActivityGeneralData} from "./component/EditProcessActivityGeneralData";

export const EditProcessActivityPage = () => {

    const {activityId} = useParams();
    const [activeTab, setActiveTab] = useState("1");

    const {appLoading, appLoaded} = useUiStore()

    const {getSessionAction, sessionState} = useSessionStore();
    const {workplaceSessionState} = useWorkplaceSessionStore();

    useEffect(()=>{
        appLoading();
        getSessionAction().then(appLoaded);

    },[]);

    return(
        <>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">Editar Actividad</CardTitle>
                                    <p className="card-title-desc">
                                        Editar información de la actividad
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
                                                        activityId &&
                                                        <EditProcessActivityGeneralData
                                                            session={sessionState}
                                                            activityId={activityId}
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