import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";

// @ts-ignore
import user1 from "../../../assets/images/users/default-user-icon-1.jpg";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useAuthStore} from "../../../store/auth/useAuthStore";
import {useSessionStore} from "../../../store/session/useSessionStore";

export const ProfileMenu = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {logOutAction} = useAuthStore();
    const navigate = useNavigate();

    const {sessionState} = useSessionStore();

    const onLogout = () => {
        logOutAction();
        navigate('/');
    }
    const onProfile = () => {
        navigate('/admin/perfil/'+sessionState.actionAdmin?.id);
    }

    return(
        <>
            <Dropdown
                isOpen={isOpen}
                toggle={()=> {setIsOpen(()=>!isOpen)}}
                className="d-inline-block"
            >
                <DropdownToggle
                    className="btn header-item"
                    id="page-header-user-dropdown"
                    tag="button"
                >
                    <img
                        className="rounded-circle header-profile-user"
                        src={user1}
                        alt="Header Avatar"
                    />
                    <span className="d-none d-md-inline-block ms-1">{sessionState.actionAdmin?.name}</span>
                    <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />

                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                    <DropdownItem
                        tag="b"
                        onClick={onProfile}
                        className="cursor-pointer"
                    >
                        <i className="bx bx-user font-size-16 align-middle ms-1" />
                        {"Perfil"}
                    </DropdownItem>
                    {/*<DropdownItem tag="a" href="#">*/}
                    {/*    <i className="bx bx-wallet font-size-16 align-middle me-1" />*/}
                    {/*    {"My Wallet"}*/}
                    {/*</DropdownItem>*/}
                    {/*<DropdownItem tag="a" href="#">*/}
                    {/*    <span className="badge bg-success float-end">11</span>*/}
                    {/*    <i className="bx bx-wrench font-size-17 align-middle me-1" />*/}
                    {/*    {"Settings"}*/}
                    {/*</DropdownItem>*/}
                    {/*<DropdownItem tag="a" href="#">*/}
                    {/*    <i className="bx bx-lock-open font-size-16 align-middle me-1" />*/}
                    {/*    {"Lock screen"}*/}
                    {/*</DropdownItem>*/}
                    {/*<Link to="/logout" className="dropdown-item">*/}
                    {/*    <i className="bx bx-lock-open font-size-16 align-middle me-1" />*/}
                    {/*    <span>{"Logout"}</span>*/}
                    {/*</Link>*/}
                    <div className="dropdown-divider" />
                    <button
                        className="dropdown-item"
                        onClick={onLogout}
                    >
                        <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
                        <span>{"Logout"}</span>
                    </button>
                </DropdownMenu>
            </Dropdown>
        </>
    )
}