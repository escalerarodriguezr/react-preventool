import {Col, Dropdown, DropdownMenu, DropdownToggle, Row} from "reactstrap";
import {Link} from "react-router-dom";
import github from "../../../assets/images/brands/github.png";
import bitbucket from "../../../assets/images/brands/bitbucket.png";
import dribbble from "../../../assets/images/brands/dribbble.png";
import dropbox from "../../../assets/images/brands/dropbox.png";
import mail_chimp from "../../../assets/images/brands/mail_chimp.png";
import slack from "../../../assets/images/brands/slack.png";
import {useState} from "react";

export const SocialMenu = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

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
                                <Link className="dropdown-icon-item" to="#">
                                    <img src={github} alt="Github" />
                                    <span>GitHub</span>
                                </Link>
                            </Col>
                            <Col>
                                <Link className="dropdown-icon-item" to="#">
                                    <img src={bitbucket} alt="bitbucket" />
                                    <span>Bitbucket</span>
                                </Link>
                            </Col>
                            <Col>
                                <Link className="dropdown-icon-item" to="#">
                                    <img src={dribbble} alt="dribbble" />
                                    <span>Dribbble</span>
                                </Link>
                            </Col>
                        </Row>

                        <Row className="no-gutters">
                            <Col>
                                <Link className="dropdown-icon-item" to="#">
                                    <img src={dropbox} alt="dropbox" />
                                    <span>Dropbox</span>
                                </Link>
                            </Col>
                            <Col>
                                <Link className="dropdown-icon-item" to="#">
                                    <img src={mail_chimp} alt="mail_chimp" />
                                    <span>Mail Chimp</span>
                                </Link>
                            </Col>
                            <Col>
                                <Link className="dropdown-icon-item" to="#">
                                    <img src={slack} alt="slack" />
                                    <span>Slack</span>
                                </Link>
                            </Col>
                        </Row>
                    </div>
                </DropdownMenu>
            </Dropdown>

        </>
    )
}