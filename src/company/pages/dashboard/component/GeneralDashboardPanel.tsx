import {SessionState} from "../../../../store/session/sessionSlice";
import {useEffect} from "react";
import {Card, CardBody, Col, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown} from "reactstrap";
import {NavLink} from "react-router-dom";
import {CompanySessionState} from "../../../../store/compnay/companySlice";
import {UseSearchWorkplaceService} from "../../workplaceModule/hook/searchWorkplaceService/UseSearchWorkplaceService";

interface GeneralDashboardPanelProps{
    sessionState:SessionState|undefined,
    companySessionState:CompanySessionState|undefined,

}
export const GeneralDashboardPanel = ({sessionState,companySessionState}:GeneralDashboardPanelProps) => {



    const {total:totalWorkplaces, searchWorkplaceAction} = UseSearchWorkplaceService();

    useEffect(()=>{
        if(companySessionState?.actionCompany?.id){
            searchWorkplaceAction(
                '?'
                +'pageSize='+1
                +'&filterByCompanyId='+companySessionState?.actionCompany?.id
            );

        }
    },[companySessionState]);

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
                                                <h5 className="mb-1">Centros de trabajo</h5>
                                                <p className="mb-0">Registrados en la empresa</p>
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
                                                <NavLink className="dropdown-item" to="/empresa/crear-centro-trabajo">
                                                    Crear nuevo
                                                </NavLink>
                                                <NavLink className="dropdown-item" to="/empresa/centros-de-trabajo">
                                                    Ver Centros
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
                                                <h5 className="mb-0">{totalWorkplaces}</h5>
                                            </div>
                                        </Col>
                                        {/*<div className="col-4">*/}
                                        {/*    <div>*/}
                                        {/*        <p className="text-muted text-truncate mb-2">*/}
                                        {/*            Subscribes*/}
                                        {/*        </p>*/}
                                        {/*        <h5 className="mb-0">10k</h5>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
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