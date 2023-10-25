import {
    Card,
    CardBody, CardText,
    CardTitle,
    Col,
    Container,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent, TabPane
} from "reactstrap";
import {useParams} from "react-router-dom";
import {useSessionStore} from "../../../store/session/useSessionStore";
import {useEffect, useState} from "react";
import classnames from "classnames";
import {EditAdminGeneralData} from "./component/EditAdminGeneralData";
import {EditAdminPassword} from "./component/EditAdminPassword";


export const EditAdminPage = () => {

    const {id} = useParams();
    const [activeTab, setActiveTab] = useState("1");

    const {getSessionAction, sessionState} = useSessionStore();

    useEffect(()=>{
        getSessionAction();
    },[]);


    return(
        <>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">Perfil de usuario</CardTitle>
                                    <p className="card-title-desc">
                                        Editar usuarios administradores
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
                                                Credenciales
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
                                                    {activeTab == '1' && <EditAdminGeneralData
                                                        id={id}
                                                        sessionState={sessionState}
                                                        fromProfile={false}
                                                    />}
                                                </Col>
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId="2">
                                            <Row>
                                                <Col sm="12">
                                                    {activeTab == '2' && <EditAdminPassword
                                                        id={id}
                                                        sessionState={sessionState}
                                                        fromProfile={false}
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