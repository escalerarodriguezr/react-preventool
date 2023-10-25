import {useEffect, useState} from "react";
import {useSessionStore} from "../../../store/session/useSessionStore";
import {Card, CardBody, CardTitle, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import {useCompanySessionStore} from "../../../store/compnay/useCompanySessionStore";
import {SearchWorkplaceTable} from "./component/SearchWorkplaceTable";
import {useUiStore} from "../../../store/ui/useUiStore";


export const SearchWorkplacePage = () => {
    const [activeTab, setActiveTab] = useState("1");

    const {getSessionAction, sessionState} = useSessionStore();
    const {getCompanySessionAction,companySessionState} = useCompanySessionStore();

    const {
        appLoading,
        appLoaded
    } = useUiStore();

    useEffect(()=>{
        appLoading();
        getSessionAction();
        getCompanySessionAction();
        appLoaded();

    },[]);


    return(
        <>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">Centros de trabajo</CardTitle>
                                    <p className="card-title-desc">
                                        Gestionar Centros de Trabajo registrados en el sistema
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
                                                    {activeTab == '1' && <SearchWorkplaceTable
                                                        sessionState={sessionState}
                                                        companySessionState={companySessionState}
                                                    />}
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