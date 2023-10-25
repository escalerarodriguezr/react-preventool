import {Col, Dropdown, DropdownMenu, DropdownToggle, Row} from "reactstrap";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useCompanySessionStore} from "../../../store/compnay/useCompanySessionStore";
import {useWorkplaceSessionStore} from "../../../store/workplace/useWorkplaceSessionStore";


export const SocialMenu = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    const {clearCompanySessionAction} = useCompanySessionStore();
    const handleNavigateToAdminLayout = () => {
        clearCompanySessionAction();
        navigate('/admin/dashboard');

    }

    const {clearWorkplaceSession, workplaceSessionState} = useWorkplaceSessionStore();

    const handleNavigateToCompanyLayout = () => {
        const id:string = workplaceSessionState.actionWorkplace?.companyId!;
        localStorage.setItem('companyId', id );
        navigate('/empresa/dashboard');
    }


    return(
        <>
            <Dropdown
                className="d-none d-lg-inline-block ms-1"
                isOpen={isOpen}
                toggle={() => setIsOpen(!isOpen)}
            >
                <DropdownToggle
                    className="btn header-item noti-icon"
                    tag="button"
                >
                    <i className="bx bx-customize"></i>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-lg dropdown-menu-end">
                    <div className="px-lg-2">
                        <Row className="no-gutters">
                            <Col>
                                <div className="dropdown-icon-item cursor-pointer"
                                     onClick={handleNavigateToAdminLayout}
                                >
                                    <i className="fas fa-microchip font-size-24" />
                                    <span>Administración</span>
                                </div>
                            </Col>

                            <Col>
                                <div className="dropdown-icon-item cursor-pointer"
                                     onClick={handleNavigateToCompanyLayout}
                                >
                                    <i className="fas fa-sitemap font-size-24" />
                                    <span>Empresa</span>
                                </div>
                            </Col>
                        </Row>

                    </div>
                </DropdownMenu>
            </Dropdown>

        </>
    )
}