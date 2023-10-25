import {useEffect, useState} from "react";
import {useUiStore} from "../../../store/ui/useUiStore";
import {useSessionStore} from "../../../store/session/useSessionStore";
import {useWorkplaceSessionStore} from "../../../store/workplace/useWorkplaceSessionStore";
import {Card, CardBody, CardTitle, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import {SearchWorkplaceTable} from "../../../company/pages/workplaceModule/component/SearchWorkplaceTable";
import {SearchProcessTable} from "./component/SearchProcessTable";

export const SearchProcessPage = () => {
    const [activeTab, setActiveTab] = useState("1");
    const {appLoading, appLoaded} = useUiStore();
    const {getSessionAction,sessionState} = useSessionStore();
    const {getWorkplaceSessionAction, workplaceSessionState} = useWorkplaceSessionStore();

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
                                    <CardTitle className="h4">Procesos</CardTitle>
                                    <p className="card-title-desc">
                                        Gestionar Procesos del Centro de Trabajo
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
                                                Listado
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
                                                        sessionState.actionAdmin?.id &&
                                                        workplaceSessionState.actionWorkplace?.id &&
                                                        <SearchProcessTable session={sessionState} workplace={workplaceSessionState}/>
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