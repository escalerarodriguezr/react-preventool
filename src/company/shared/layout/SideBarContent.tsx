import SimpleBar from "simplebar-react"
import {Link, NavLink} from "react-router-dom";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useSessionStore} from "../../../store/session/useSessionStore";
import {useCompanySessionStore} from "../../../store/compnay/useCompanySessionStore";

export const SideBarContent = () => {

    const simpleBar = useRef<any>(undefined);
    const [displayWorkplace, setDisplayWorkplace] = useState(false);




    useEffect(()=>{

        const sideUlMenu:HTMLUListElement = simpleBar.current
        const items = sideUlMenu.getElementsByTagName("a");
        const arrows:HTMLAnchorElement[] = Array.from(items).filter(item => item.classList.contains('has-arrow'));
        arrows.forEach((element:HTMLElement)=>{
            const subMenu:any = element.closest('li')?.querySelector('ul');
            
            if(subMenu.dataset.menu === 'workplace-module'){
                element.onclick = ()=>{
                    if( displayWorkplace == false ){
                        subMenu.style.display = '';
                        setDisplayWorkplace(true);
                    }else{
                        subMenu.style.display = 'none';
                        setDisplayWorkplace(false);
                    }
                };
            }

        })


    });

    const {sessionState} = useSessionStore();
    const {companySessionState} = useCompanySessionStore();

    return(
        <>
            <SimpleBar className="h-100">
                <div id="sidebar-menu">
                    <h5 className="text-center">EMPRESA</h5>
                    <h6 className="text-center">{companySessionState.actionCompany?.name}</h6>
                    <ul className="metismenu list-unstyled" id="side-menu"  ref={simpleBar}>
                        {/*DashBoard*/}
                        <li>
                            <NavLink
                                to="/empresa/dashboard"
                                className={({isActive}) => `${isActive ? 'text-primary bold' : ''}`}
                            >
                                <i className="bx bx-home-circle" />
                                <span>Dashboard</span>
                            </NavLink>
                        </li>


                        <li className="menu-title">{"Administración"}</li>

                        <li>
                            <a className="has-arrow">
                                <i className="fas fa-tools" />
                                <span>{"Centros de trabajo"}</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="false" style={{display:'none'}}
                                data-menu="workplace-module"
                            >
                                <li>
                                    <NavLink
                                        to="/empresa/crear-centro-trabajo"
                                        className={({isActive}) => `${isActive ? 'text-primary bold' : ''}`}
                                    >
                                        {"Crear"}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/empresa/centros-de-trabajo"
                                        className={({isActive}) => `${isActive ? 'text-primary bold' : ''}`}
                                    >
                                        {"Centros de trabajo"}
                                    </NavLink>
                                </li>
                            </ul>
                        </li>


                        <li className="menu-title">{"Sistema de Gestión SST"}</li>

                        <li>
                            <a className="has-arrow">
                                <i className="fas fa-people-carry" />
                                <span>{"Política SS"}</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="false" style={{display:'none'}}
                                data-menu="workplace-module"
                            >
                                <li>
                                    <NavLink
                                        to="/empresa/politica-seguridad-y-salud"
                                        className={({isActive}) => `${isActive ? 'text-primary bold' : ''}`}
                                    >
                                        {"Editar"}
                                    </NavLink>
                                </li>

                            </ul>
                        </li>

                    </ul>
                </div>
            </SimpleBar>

        </>
    )
}