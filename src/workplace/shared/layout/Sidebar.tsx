import {SideBarContent} from "./SideBarContent";

export const Sidebar = () => {

    return(
        <>
            <div className="vertical-menu">
                <div data-simplebar className="h-100">
                    <SideBarContent/>
                </div>
                <div className="sidebar-background"></div>
            </div>
        </>
    )
}