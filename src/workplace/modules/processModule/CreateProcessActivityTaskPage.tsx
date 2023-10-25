import {Card, CardBody, CardTitle, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import {CreateProcessActivityGeneralData} from "./component/CreateProcessActivityGeneralData";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {CreateActivityTaskGeneralData} from "./component/activityPage/component/CreateActivityTaskGeneralData";
import {useUiStore} from "../../../store/ui/useUiStore";
import {useSessionStore} from "../../../store/session/useSessionStore";
import {GetProcessActivityByIdService} from "./service/getProcessActivityByIdService/GetProcessActivityByIdService";

export const CreateProcessActivityTaskPage = () => {
    const {activityId} = useParams();
    const [activeTab, setActiveTab] = useState("1");

    const navigate = useNavigate();

    const {appLoading,appLoaded} = useUiStore()

    const navigateToActivityPage = () => {
        navigate('/centro-trabajo/actividad/'+activityId)
    }

    const {getAction,activity} = GetProcessActivityByIdService();

    useEffect(()=>{
        if( activityId  ){
            getAction(activityId).then(appLoaded);
        }
    },[]);


    return(
        <>
            <div className="page-content">
                <Container fluid>

                    <div className="d-flex justify-content-end">
                        <button type="button" className="btn btn-primary mb-3"
                                onClick={navigateToActivityPage}
                        >
                            Volver Actividad
                        </button>
                    </div>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">Crear Tarea</CardTitle>
                                    <p className="card-title-desc">
                                        Registrar Tarea para la actividad <b>{(activity?.name)?.toUpperCase()}</b>
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
                                                        activityId &&
                                                        <CreateActivityTaskGeneralData activityId={activityId}/>
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