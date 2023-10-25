import {SessionState} from "../../../../store/session/sessionSlice";
import {WorkplaceSessionState} from "../../../../store/workplace/workplaceSlice";
import {useEffect, useState} from "react";
import {useUiStore} from "../../../../store/ui/useUiStore";
import {Card, CardBody, CardTitle, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import {BaselineStudyComplianceResume} from "./BaselineStudyComplianceResume";
import {BaselineStudyCategoryIndicators} from "./BaselineStudyCategoryIndicators";
import {
    GetBaselineStudyIndicatorByCategoryService
} from "../hook/getBaselineStudyIndicatotByCategory/GetBaselineStudyIndicatorByCategoryService";

interface BaselineStudyIndicatorsProps{
    session:SessionState,
    workplaceSession:WorkplaceSessionState
}
export const BaselineStudyCategories = (
    {
        session,
        workplaceSession
    }:BaselineStudyIndicatorsProps
) => {

    const [activeTab, setActiveTab] = useState("1");

    return(
        <>
            <Row>
                <Col lg={12}>
                    <Card>
                        <CardBody>

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
                                        Compromiso
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
                                        Política
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        style={{ cursor: "pointer" }}
                                        className={classnames({
                                            active: activeTab === "3",
                                        })}
                                        onClick={() => {
                                            setActiveTab("3");
                                        }}
                                    >
                                        Planeamiento y aplicación
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        style={{ cursor: "pointer" }}
                                        className={classnames({
                                            active: activeTab === "4",
                                        })}
                                        onClick={() => {
                                            setActiveTab("4");
                                        }}
                                    >
                                        Implementación y operación
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        style={{ cursor: "pointer" }}
                                        className={classnames({
                                            active: activeTab === "5",
                                        })}
                                        onClick={() => {
                                            setActiveTab("5");
                                        }}
                                    >
                                        Evaluación normativa
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        style={{ cursor: "pointer" }}
                                        className={classnames({
                                            active: activeTab === "6",
                                        })}
                                        onClick={() => {
                                            setActiveTab("6");
                                        }}
                                    >
                                        Verificación
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        style={{ cursor: "pointer" }}
                                        className={classnames({
                                            active: activeTab === "7",
                                        })}
                                        onClick={() => {
                                            setActiveTab("7");
                                        }}
                                    >
                                        Control de información y documentos
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        style={{ cursor: "pointer" }}
                                        className={classnames({
                                            active: activeTab === "8",
                                        })}
                                        onClick={() => {
                                            setActiveTab("8");
                                        }}
                                    >
                                        Revisión por la dirección
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
                                                && session.actionAdmin
                                                && workplaceSession.actionWorkplace?.id
                                                &&
                                                <BaselineStudyCategoryIndicators
                                                    workplaceSession={workplaceSession}
                                                    category={'compromiso'}
                                                />
                                            }
                                        </Col>
                                    </Row>
                                </TabPane>

                                <TabPane tabId="2">
                                    <Row>
                                        <Col sm="12">
                                            {activeTab == '2'
                                                && session.actionAdmin
                                                && workplaceSession.actionWorkplace?.id
                                                &&
                                                <BaselineStudyCategoryIndicators
                                                    workplaceSession={workplaceSession}
                                                    category={'politica'}
                                                />
                                            }
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="3">
                                    <Row>
                                        <Col sm="12">
                                            {activeTab == '3'
                                                && session.actionAdmin
                                                && workplaceSession.actionWorkplace?.id
                                                &&
                                                <BaselineStudyCategoryIndicators
                                                    workplaceSession={workplaceSession}
                                                    category={'planeamiento'}
                                                />
                                            }
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="4">
                                    <Row>
                                        <Col sm="12">
                                            {activeTab == '4'
                                                && session.actionAdmin
                                                && workplaceSession.actionWorkplace?.id
                                                &&
                                                <BaselineStudyCategoryIndicators
                                                    workplaceSession={workplaceSession}
                                                    category={'implementacion'}
                                                />
                                            }
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="5">
                                    <Row>
                                        <Col sm="12">
                                            {activeTab == '5'
                                                && session.actionAdmin
                                                && workplaceSession.actionWorkplace?.id
                                                &&
                                                <BaselineStudyCategoryIndicators
                                                    workplaceSession={workplaceSession}
                                                    category={'evaluacion'}
                                                />
                                            }
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="6">
                                    <Row>
                                        <Col sm="12">
                                            {activeTab == '6'
                                                && session.actionAdmin
                                                && workplaceSession.actionWorkplace?.id
                                                &&
                                                <BaselineStudyCategoryIndicators
                                                    workplaceSession={workplaceSession}
                                                    category={'verificacion'}
                                                />
                                            }
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="7">
                                    <Row>
                                        <Col sm="12">
                                            {activeTab == '7'
                                                && session.actionAdmin
                                                && workplaceSession.actionWorkplace?.id
                                                &&
                                                <BaselineStudyCategoryIndicators
                                                    workplaceSession={workplaceSession}
                                                    category={'control'}
                                                />
                                            }
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="8">
                                    <Row>
                                        <Col sm="12">
                                            {activeTab == '8'
                                                && session.actionAdmin
                                                && workplaceSession.actionWorkplace?.id
                                                &&
                                                <BaselineStudyCategoryIndicators
                                                    workplaceSession={workplaceSession}
                                                    category={'revision'}
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
        </>
    )
}