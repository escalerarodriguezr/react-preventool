import {Card, CardBody, Col, Container, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown} from "reactstrap";
import {Breadcrumbs} from "../../shared/component/Breadcrumbs";
import {useSessionStore} from "../../../store/session/useSessionStore";
import {useEffect} from "react";
import {UseSearchCompanyService} from "../companyModule/hook/searchCompanyService/UseSearchCompanyService";
import {Link, NavLink} from "react-router-dom";
import {UseSearchAdminService} from "../adminModule/hook/searchAdminService/UseSearchAdminService";
import {AdminRoles} from "../../shared/model/Admin/AdminRoles";
import {RootDashboardPanel} from "./rootDashboard/RootDashboardPanel";
import {AdminDashboardPanel} from "./adminDashboard/AdminDashboardPanel";

export const DashboardPage = () => {

    const {getSessionAction, sessionState} = useSessionStore();

    useEffect(()=>{
        getSessionAction();
    },[]);


    return(
        <>
            <div className="page-content">
                <Container fluid>
                    { sessionState.actionAdmin?.role == AdminRoles.ROOT &&
                        <RootDashboardPanel sessionState={sessionState}/>
                    }
                    { sessionState.actionAdmin?.role == AdminRoles.ADMIN &&
                        <AdminDashboardPanel sessionState={sessionState}/>
                    }
                </Container>
            </div>
        </>
    )
}