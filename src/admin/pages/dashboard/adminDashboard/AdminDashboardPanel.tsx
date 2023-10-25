import {SessionState} from "../../../../store/session/sessionSlice";
import {UseSearchAdminService} from "../../adminModule/hook/searchAdminService/UseSearchAdminService";
import {UseSearchCompanyService} from "../../companyModule/hook/searchCompanyService/UseSearchCompanyService";
import {useEffect} from "react";
import {Card, CardBody, Col, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown} from "reactstrap";
import {NavLink} from "react-router-dom";

interface AdminDashboardPanelProps{
    sessionState:SessionState|undefined,

}
export const AdminDashboardPanel = ({sessionState}:AdminDashboardPanelProps) => {

    const {total:totalCompanies, searchCompanyAction} = UseSearchCompanyService();

    useEffect(()=>{
        searchCompanyAction(
            '?'
            +'pageSize='+1
        );

    },[]);

    return(
        <>
            <Row>
                <Col xl={4}>
                    <Card>
                        <CardBody>
                            <div className="d-flex">
                                <div className="me-3">
                                    <i className="fas fa-city font-size-24" />

                                </div>
                                <div className="flex-grow-1">
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <div className="text-muted">
                                                <h5 className="mb-1">Empresas</h5>
                                                <p className="mb-0">Activas en el sistema</p>
                                            </div>
                                        </div>

                                        <UncontrolledDropdown className="ms-2">
                                            <DropdownToggle
                                                className="btn btn-light btn-sm"
                                                color="#eff2f7"
                                                type="button"
                                            >
                                                <i className="bx bxs-cog align-middle me-1"></i> Acciones
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-end">
                                                <NavLink className="dropdown-item" to="/admin/empresas">
                                                    Ver empresas
                                                </NavLink>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </div>

                                    <hr />

                                    <Row>
                                        <Col xl={4}>
                                            <div>
                                                <p className="text-muted text-truncate mb-2">
                                                    Total
                                                </p>
                                                <h5 className="mb-0">{totalCompanies}</h5>
                                            </div>
                                        </Col>
                                    </Row>


                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}