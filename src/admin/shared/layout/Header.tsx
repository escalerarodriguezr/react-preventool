import {ProfileMenu} from "./ProfileMenu";
import {ButtonFullScreen} from "./ButtonFullScreen";
import {ToggleSideBarButton} from "./ToggleSideBarButton";
import {NavBarBrand} from "./NavBarBrand";
import {SearchForm} from "./SearchForm";
import {MegaMenu} from "./MegaMenu";
import {SocialMenu} from "./SocialMenu";
import {NotificationDropdown} from "./NotificationDropdown";

export const Header = () => {
    return(
        <>
            <header id="page-topbar">
                <div className="navbar-header">
                    <div className="d-flex">
                        {/*<NavBarBrand/>*/}
                        <ToggleSideBarButton/>
                        {/*<SearchForm/>*/}
                        {/*<MegaMenu/>*/}
                    </div>

                    <div className="d-flex">
                        {/*<SocialMenu/>*/}
                        {/*<ButtonFullScreen/>*/}
                        {/*<NotificationDropdown />*/}
                        <ProfileMenu />
                    </div>
                </div>
            </header>
        </>
    )
}