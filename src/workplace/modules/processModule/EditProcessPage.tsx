import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useSessionStore} from "../../../store/session/useSessionStore";
import {useCompanySessionStore} from "../../../store/compnay/useCompanySessionStore";
import {useUiStore} from "../../../store/ui/useUiStore";
import {useWorkplaceSessionStore} from "../../../store/workplace/useWorkplaceSessionStore";
import {Card, CardBody, CardTitle, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import {EditWorkplaceGeneralData} from "../../../company/pages/workplaceModule/component/EditWorkplaceGeneralData";
import {EditProcessGeneralData} from "./component/EditProcessGeneralData";

export const EditProcessPage = () => {
    const {id} = useParams();
    const [activeTab, setActiveTab] = useState("1");

    const navigate = useNavigate()

    const {getSessionAction, sessionState} = useSessionStore();
    const {workplaceSessionState} = useWorkplaceSessionStore();

    const {
        appLoading,
        appLoaded
    } = useUiStore();


    useEffect(()=>{
        appLoading();
        getSessionAction().then(appLoaded);

    },[]);

    const handleNavigateToSearchProcessPage = () => {
        navigate('/centro-trabajo/procesos');
    }

    return(
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="d-flex justify-content-end mb-3">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleNavigateToSearchProcessPage}
                        >
                            Listado de Procesos
                        </button>
                    </div>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">Editar Procesos</CardTitle>
                                    <p className="card-title-desc">
                                        Editar Proceso del Centro de Trabajo
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
                                                        id &&
                                                        sessionState.actionAdmin?.id &&
                                                        workplaceSessionState.actionWorkplace?.id &&

                                                        <EditProcessGeneralData
                                                            id={id}
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