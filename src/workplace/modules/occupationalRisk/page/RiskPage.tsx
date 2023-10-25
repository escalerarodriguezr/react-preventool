import React, {useEffect, useState} from "react";
import {useUiStore} from "../../../../store/ui/useUiStore";
import {useSessionStore} from "../../../../store/session/useSessionStore";
import {useWorkplaceSessionStore} from "../../../../store/workplace/useWorkplaceSessionStore";
import {useNavigate, useParams} from "react-router-dom";
import {Card, CardBody, CardTitle, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import {HazardsTable} from "../../processModule/component/taskPage/HazardsTable";
import {ContentDescription} from "../../../../shared/component/ContentDescription";
import {AddHazardTable} from "../../processModule/component/taskPage/AddHazardTable";
import {UpdateRisk} from "../component/UpdateRisk";
import {GetTaskRiskByIdService} from "../service/getTaskRiskById/GetTaskRiskByIdService";
import {RiskAssessment} from "../component/RiskAssessment";

export const RiskPage = () => {
    const {id}  =useParams();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("1");
    const {appLoading,appLoaded} = useUiStore();
    const {sessionState,getSessionAction} = useSessionStore();
    const {taskRisk,getTaskRiskAction} = GetTaskRiskByIdService();

    useEffect(()=>{
        if(id){
            appLoading()
            Promise.all([
                getSessionAction(),
                getTaskRiskAction(id)
            ]).then(appLoaded);
        }
    },[]);

    const handleNavigateToTask = (taskId:string|undefined) => {

        if(taskId){
            navigate(`/centro-trabajo/tarea/${taskId}`)
        }
    }


    // @ts-ignore
    return(
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="d-flex justify-content-sm-end mb-3">
                        <div>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={()=>handleNavigateToTask(taskRisk?.taskId)}
                            >
                                Volver a la Tarea
                            </button>
                        </div>
                    </div>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">Gestionar Riesgo</CardTitle>
                                    <p className="card-title-desc">
                                        Gestionar riesgo <b>{(taskRisk?.name)?.toUpperCase()}</b>
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
                                                Riesgo
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                style={{ cursor: "pointer" }}
                                                className={classnames({
                                                    active: activeTab === "2",
                                                })}
                                                onClick={() => {
                                                    setActiveTab("2");
                                                }}
                                            >
                                                Evaluación IPERC
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
                                                        id &&
                                                        sessionState.actionAdmin?.id &&
                                                        taskRisk?.id &&
                                                        <UpdateRisk taskRiskId={id}/>
                                                    }
                                                </Col>
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId="2">
                                            <Row>
                                                <Col sm="12">
                                                    {activeTab == '2' &&
                                                        id &&
                                                        sessionState.actionAdmin?.id &&
                                                        taskRisk?.id &&
                                                        <RiskAssessment taskRiskId={taskRisk.id}/>
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