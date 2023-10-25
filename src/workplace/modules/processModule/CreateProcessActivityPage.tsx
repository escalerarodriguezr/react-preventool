import React, {useEffect, useState} from "react";
import {useSessionStore} from "../../../store/session/useSessionStore";
import {Card, CardBody, CardTitle, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import {useWorkplaceSessionStore} from "../../../store/workplace/useWorkplaceSessionStore";
import {useUiStore} from "../../../store/ui/useUiStore";
import {CreateProcessGeneralData} from "./component/CreateProcessGeneralData";
import {useParams} from "react-router-dom";
import {CreateProcessActivityGeneralData} from "./component/CreateProcessActivityGeneralData";
import {GetWorkplaceProcessByIdService} from "./service/getWorkplaceProcessByIdService/GetWorkplaceProcessByIdService";

export const CreateProcessActivityPage = () => {

    const {processId} = useParams();

    const [activeTab, setActiveTab] = useState("1");
    const {appLoading, appLoaded} = useUiStore()

    const {getSessionAction, sessionState} = useSessionStore();
    const {getWorkplaceSessionAction, workplaceSessionState} = useWorkplaceSessionStore();
    const {getWorkplaceProcessByIdAction,process} = GetWorkplaceProcessByIdService();

    useEffect(()=>{
        appLoading();
        getSessionAction().then(appLoaded);

    },[])

    useEffect(()=>{
        if(processId && sessionState.actionAdmin?.id && workplaceSessionState.actionWorkplace?.id ){
            appLoading();
            getWorkplaceProcessByIdAction(
                workplaceSessionState.actionWorkplace.id,
                processId
            ).then(appLoaded);
        }

    },[sessionState]);

    return(
        <>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">Crear Actividad</CardTitle>
                                    <p className="card-title-desc">
                                        Regisrar Actividad para el proceso <b>{(process?.name)?.toUpperCase()}</b>
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
                                                        processId &&
                                                        <CreateProcessActivityGeneralData
                                                            session={sessionState}
                                                            workplace={workplaceSessionState}
                                                            processId={processId}
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