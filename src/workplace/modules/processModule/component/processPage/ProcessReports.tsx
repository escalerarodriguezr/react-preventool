import {SessionState} from "../../../../../store/session/sessionSlice";
import {WorkplaceSessionState} from "../../../../../store/workplace/workplaceSlice";
import {
    GetWorkplaceProcessByIdResponse
} from "../../service/getWorkplaceProcessByIdService/GetWorkplaceProcessByIdResponse";
import {Card, CardBody, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import React, {useState} from "react";
import {useUiStore} from "../../../../../store/ui/useUiStore";
import {GetProcessReportService} from "../../service/getProcessReport/GetProcessReportService";
import {ShowReportByType} from "./processReportComponents/ShowReportByType";

interface Props{
    process:GetWorkplaceProcessByIdResponse

}
export const ProcessReports = (
    {process}:Props
) => {

    const [activeTab, setActiveTab] = useState("1");
    const {appLoading,appLoaded} = useUiStore();

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
                                        Completo
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
                                    Proceso
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
                                                process.id &&
                                               <ShowReportByType processId={process.id} type={'general'}/>
                                            }
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="2">
                                    <Row>
                                        <Col sm="12">
                                            {activeTab == '2' &&
                                                process.id &&
                                                <ShowReportByType processId={process.id} type={'process-resume'}/>
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