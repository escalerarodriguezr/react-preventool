import {Card, CardBody, CardTitle, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useUiStore} from "../../../store/ui/useUiStore";
import {useSessionStore} from "../../../store/session/useSessionStore";
import {
    EditProcessActivityTaskGeneralData
} from "./component/activityPage/component/EditProcessActivityTaskGeneralData";
import {GetProcessActivityByIdService} from "./service/getProcessActivityByIdService/GetProcessActivityByIdService";

export const EditProcessActivityTaskPage = () => {
    const {activityId} = useParams();
    const [activeTab, setActiveTab] = useState("1");
    const {taskId} = useParams();
    const navigate = useNavigate();

    const {appLoading,appLoaded} = useUiStore()
    const {sessionState,getSessionAction} = useSessionStore();

    const {getAction,activity} = GetProcessActivityByIdService();


    useEffect(()=>{
        appLoading()
        getSessionAction().then(appLoaded)

    },[]);

    useEffect(()=>{
        if( activityId  ){
            appLoading()
            getAction(activityId).then(appLoaded);
        }
    },[sessionState.actionAdmin?.id]);

    const navigateToActivityPage = () => {
        navigate('/centro-trabajo/actividad/'+activityId)
    }

    return(
        <>
            <div className="page-content">
                <Container fluid>

                    <div className="d-flex justify-content-end">
                        <button type="button" className="btn btn-primary mb-3"
                                onClick={navigateToActivityPage}
                        >
                            Volver a Actividad
                        </button>
                    </div>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">Editar Tarea</CardTitle>
                                    <p className="card-title-desc">
                                        Editar Tarea de la actividad <b>{(activity?.name)?.toUpperCase()}</b>
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
                                                        taskId &&
                                                        <EditProcessActivityTaskGeneralData taskId={taskId} />
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