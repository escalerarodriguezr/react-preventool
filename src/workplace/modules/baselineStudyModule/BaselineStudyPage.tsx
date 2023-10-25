import {Card, CardBody, CardTitle, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import {
    EditHealthAndSafetyPolicyGeneralData
} from "../../../company/pages/healthAndSafetyPolicyModule/component/EditHealthAndSafetyPolicyGeneralData";
import {useEffect, useState} from "react";
import {useUiStore} from "../../../store/ui/useUiStore";
import {useSessionStore} from "../../../store/session/useSessionStore";
import {useWorkplaceSessionStore} from "../../../store/workplace/useWorkplaceSessionStore";
import {BaselineStudyComplianceResume} from "./component/BaselineStudyComplianceResume";
import {BaselineStudyCategories} from "./component/BaselineStudyCategories";

export const BaselineStudyPage = () => {
    const [activeTab, setActiveTab] = useState("1");
    const {appLoading, appLoaded} = useUiStore();
    const {getSessionAction,sessionState} = useSessionStore();
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
                                    <CardTitle className="h4">Estudio de línea base</CardTitle>
                                    {/*<p className="card-title-desc">*/}
                                    {/*    Editar Política de Seguridad y Salud en el trabajo de {companySessionState.actionCompany?.name}*/}
                                    {/*</p>*/}
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
                                                Cumplimiento
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
                                                Indicadores
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
                                                    {activeTab == '1'
                                                        && sessionState.actionAdmin
                                                        && workplaceSessionState.actionWorkplace?.id
                                                        &&
                                                        <BaselineStudyComplianceResume
                                                            session={sessionState}
                                                            workplaceSession={workplaceSessionState}
                                                        />
                                                    }
                                                </Col>
                                            </Row>
                                        </TabPane>

                                        <TabPane tabId="2">
                                            <Row>
                                                <Col sm="12">
                                                    {activeTab == '2'
                                                        && sessionState.actionAdmin
                                                        && workplaceSessionState.actionWorkplace?.id
                                                        &&
                                                       <BaselineStudyCategories
                                                           session={sessionState}
                                                           workplaceSession={workplaceSessionState}
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