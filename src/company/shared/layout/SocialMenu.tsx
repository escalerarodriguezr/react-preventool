import {Col, Dropdown, DropdownMenu, DropdownToggle, Row} from "reactstrap";
import {Link, redirect, useNavigate} from "react-router-dom";
import github from "../../../assets/images/brands/github.png";
import bitbucket from "../../../assets/images/brands/bitbucket.png";
import dribbble from "../../../assets/images/brands/dribbble.png";
import dropbox from "../../../assets/images/brands/dropbox.png";
import mail_chimp from "../../../assets/images/brands/mail_chimp.png";
import slack from "../../../assets/images/brands/slack.png";
import {useState} from "react";
import {useCompanySessionStore} from "../../../store/compnay/useCompanySessionStore";

export const SocialMenu = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    const {clearCompanySessionAction} = useCompanySessionStore();
    const handleNavigateToAdminLayout = () => {
        clearCompanySessionAction();
        navigate('/admin/dashboard');

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

                        </Row>


                    </div>
                </DropdownMenu>
            </Dropdown>

        </>
    )
}