import SimpleBar from "simplebar-react"
import {Link, NavLink} from "react-router-dom";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useSessionStore} from "../../../store/session/useSessionStore";
import {AdminRoles} from "../model/Admin/AdminRoles";

export const SideBarContent = () => {

    const simpleBar = useRef<any>(undefined);
    const [displayAdmin, setDisplayAdmin] = useState(false);
    const [displayCompany, setDisplayCompany] = useState(false);
    const [displayAuditType, setDisplayAuditType] = useState(false);



    useEffect(()=>{

        const sideUlMenu:HTMLUListElement = simpleBar.current
        const items = sideUlMenu.getElementsByTagName("a");
        const arrows:HTMLAnchorElement[] = Array.from(items).filter(item => item.classList.contains('has-arrow'));
        arrows.forEach((element:HTMLElement)=>{
            const subMenu:any = element.closest('li')?.querySelector('ul');
            
            if(subMenu.dataset.menu === 'admin-module'){
                element.onclick = ()=>{
                    if( displayAdmin == false ){
                        subMenu.style.display = '';
                        setDisplayAdmin(true);
                    }else{
                        subMenu.style.display = 'none';
                        setDisplayAdmin(false);
                    }
                };
            }

            if(subMenu.dataset.menu === 'company-module'){
                element.onclick = ()=>{
                    if( displayCompany == false ){
                        subMenu.style.display = '';
                        setDisplayCompany(true);
                    }else{
                        subMenu.style.display = 'none';
                        setDisplayCompany(false);
                    }
                };
            }

            if(subMenu.dataset.menu === 'audit-type-module'){
                element.onclick = ()=>{
                    if( displayAuditType == false ){
                        subMenu.style.display = '';
                        setDisplayAuditType(true);
                    }else{
                        subMenu.style.display = 'none';
                        setDisplayAuditType(false);
                    }
                };
            }
        })


    });

    const {sessionState} = useSessionStore();

    return(
        <>
            <SimpleBar className="h-100">
                <div id="sidebar-menu">
                    <h5 className="text-center">SISTEMA</h5>
                    <ul className="metismenu list-unstyled" id="side-menu"  ref={simpleBar}>


                        {/*DashBoard*/}
                        <li>
                            <NavLink
                                to="/admin/dashboard"
                                className={({isActive}) => `${isActive ? 'text-primary bold' : ''}`}
                            >
                                <i className="bx bx-home-circle" />
                                <span>{"Dashboard"}</span>
                            </NavLink>
                        </li>

                        {/*Admin*/}

                        {(sessionState.actionAdmin?.role === AdminRoles.ROOT) &&
                            <>
                                <li className="menu-title">{"Administración"}</li>

                                <li>
                                    <a className="has-arrow">
                                        <i className="bx bxs-user-detail" />
                                        <span>{"Administradores"}</span>
                                    </a>
                                    <ul className="sub-menu" aria-expanded="false" style={{display:'none'}}
                                        data-menu="admin-module"
                                    >
                                        <li>
                                            <NavLink
                                                to="/admin/createAdmin"
                                                className={({isActive}) => `${isActive ? 'text-primary bold' : ''}`}
                                            >
                                                {"Nuevo"}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/admin/administradores"
                                                className={({isActive}) => `${isActive ? 'text-primary bold' : ''}`}
                                            >
                                                {"Administradores"}
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>
                            </>
                        }


                            {/*Company*/}

                            <li>
                                <a className="has-arrow">
                                    <i className="fas fa-city" />
                                    <span>{"Empresas"}</span>
                                </a>
                                <ul className="sub-menu" aria-expanded="false" style={{display:'none'}}
                                    data-menu="company-module"
                                >

                                {(sessionState.actionAdmin?.role === AdminRoles.ROOT) &&

                                    <li>
                                        <NavLink
                                            to="/admin/empresa"
                                            className={({isActive}) => `${isActive ? 'text-primary bold' : ''}`}
                                        >
                                            {"Nueva"}
                                        </NavLink>
                                    </li>
                                }

                                    <li>
                                        <NavLink
                                            to="/admin/empresas"
                                            className={({isActive}) => `${isActive ? 'text-primary bold' : ''}`}
                                        >
                                            {"Empresas"}
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>


                        {/*/!*AuditType*!/*/}

                        {/*<li className="menu-title">{"Configuración SST"}</li>*/}

                        {/*<li>*/}
                        {/*    <a className="has-arrow">*/}
                        {/*        <i className="fas fa-check-square" />*/}
                        {/*        <span>{"Auditorías"}</span>*/}
                        {/*    </a>*/}
                        {/*    <ul className="sub-menu" aria-expanded="false" style={{display:'none'}}*/}
                        {/*        data-menu="audit-type-module"*/}
                        {/*    >*/}

                        {/*        <li>*/}
                        {/*            <NavLink*/}
                        {/*                to="/admin/tipo-auditoria"*/}
                        {/*                className={({isActive}) => `${isActive ? 'text-primary bold' : ''}`}*/}
                        {/*            >*/}
                        {/*                {"Crear"}*/}
                        {/*            </NavLink>*/}
                        {/*            <NavLink*/}
                        {/*                to="/admin/tipo-auditoria-listado"*/}
                        {/*                className={({isActive}) => `${isActive ? 'text-primary bold' : ''}`}*/}
                        {/*            >*/}
                        {/*                {"Listado"}*/}
                        {/*            </NavLink>*/}
                        {/*        </li>*/}



                        {/*    </ul>*/}
                        {/*</li>*/}

                    </ul>
                </div>
            </SimpleBar>

        </>
    )
}