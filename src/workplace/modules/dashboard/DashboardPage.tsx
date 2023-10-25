import {Card, CardBody, Col, Container, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown} from "reactstrap";
import {useSessionStore} from "../../../store/session/useSessionStore";
import {useEffect} from "react";
import {useUiStore} from "../../../store/ui/useUiStore";
import {GeneralDashboardPanel} from "./component/GeneralDashboardPanel";
import {useWorkplaceSessionStore} from "../../../store/workplace/useWorkplaceSessionStore";
import {GetWorkplaceDashboardByIdService} from "./service/getWorkplaceDashboardById/GetWorkplaceDashboardByIdService";

export const DashboardPage = () => {

    const {getSessionAction, sessionState} = useSessionStore();
    // const {getCompanySessionAction, companySessionState} = useCompanySessionStore();
    const {getWorkplaceSessionAction, workplaceSessionState} = useWorkplaceSessionStore();
    const {dashboardWorkplace,getDashboardAction} = GetWorkplaceDashboardByIdService();

    const {
        appLoading,
        appLoaded
    } = useUiStore();

    useEffect(()=>{

        appLoading()
        Promise.all([
            getSessionAction(),
            getWorkplaceSessionAction(),
        ]).then(appLoaded);

    },[]);

    useEffect(()=>{

        if(workplaceSessionState.actionWorkplace?.id){
            appLoading();
            getDashboardAction(workplaceSessionState.actionWorkplace.id).then(appLoaded);
        }




    },[workplaceSessionState.actionWorkplace?.id]);

    return(
        <>
            <div className="page-content">
                <Container fluid>
                    {
                        sessionState.actionAdmin?.id &&
                        workplaceSessionState.actionWorkplace?.id &&
                        dashboardWorkplace &&
                        <GeneralDashboardPanel
                            sessionState={sessionState}
                            workplaceSessionState={workplaceSessionState}
                            dashboardData={dashboardWorkplace}
                        />

                    }

                </Container>
            </div>
        </>
    )
}