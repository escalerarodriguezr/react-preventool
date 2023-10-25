import {Col, Dropdown, DropdownMenu, DropdownToggle, Row} from "reactstrap";
import {Link} from "react-router-dom";
import megamenuImg from "../../../assets/images/megamenu-img.png";
import {useState} from "react";


export const MegaMenu = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return(
        <>
            {/*MegaMeunu*/}
            <Dropdown
                className="dropdown-mega d-none d-lg-block ms-2"
                isOpen={isOpen}
                toggle={() => setIsOpen(()=>!isOpen)}
            >
                <DropdownToggle className="btn header-item" caret tag="button">
                    {" "}
                    {"Mega Menu"}
                    <i className="mdi mdi-chevron-down"></i>
                </DropdownToggle>
                <DropdownMenu className="dropdown-megamenu">
                    <Row>
                        <Col sm={8}>
                            <Row>
                                <Col md={4}>
                                    <h5 className="font-size-14 mt-0">
                                        {"UI Components"}
                                    </h5>
                                    <ul className="list-unstyled megamenu-list">
                                        <li>
                                            <Link to="#">{"Lightbox"}</Link>
                                        </li>
                                        <li>
                                            <Link to="#">{"Range Slider"}</Link>
                                        </li>

                                    </ul>
                                </Col>

                                <Col md={4}>
                                    <h5 className="font-size-14 mt-0">
                                        {"Applications"}
                                    </h5>
                                    <ul className="list-unstyled megamenu-list">
                                        <li>
                                            <Link to="#">{"Ecommerce"}</Link>
                                        </li>
                                        <li>
                                            <Link to="#">{"Calendar"}</Link>
                                        </li>

                                    </ul>
                                </Col>

                                <Col md={4}>
                                    <h5 className="font-size-14 mt-0">
                                        {"Extra Pages"}
                                    </h5>
                                    <ul className="list-unstyled megamenu-list">
                                        <li>
                                            <Link to="#">
                                                {"Light Sidebar"}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                {"Compact Sidebar"}
                                            </Link>
                                        </li>

                                    </ul>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={4}>
                            <Row>
                                <Col sm={6}>
                                    <h5 className="font-size-14 mt-0">
                                        {"UI Components"}
                                    </h5>
                                    <ul className="list-unstyled megamenu-list">
                                        <li>
                                            <Link to="#">{"Lightbox"}</Link>
                                        </li>
                                        <li>
                                            <Link to="#">{"Range Slider"}</Link>
                                        </li>
                                        <li>
                                            <Link to="#">{"Sweet Alert"}</Link>
                                        </li>
                                    </ul>
                                </Col>

                                <Col sm={5}>
                                    <div>
                                        <img
                                            src={megamenuImg}
                                            alt=""
                                            className="img-fluid mx-auto d-block"
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </DropdownMenu>
            </Dropdown>

        </>
    )
}