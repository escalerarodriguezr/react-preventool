import {Link} from "react-router-dom";
// @ts-ignore
import logo from "../../../assets/images/logo.svg";
// @ts-ignore
import logoDark from "../../../assets/images/logo-dark.png";

export const NavBarBrand = () => {

    return(
        <>
            <div className="navbar-brand-box">
                <Link to="/admin/dashboard" className="logo logo-dark">
                    <span className="logo-sm">
                      <img src={logo} alt="" height="22" />
                    </span>
                    <span className="logo-lg">
                        <img src={logoDark} alt="" height="22" />
                    </span>
                </Link>
            </div>
        </>
    )
}