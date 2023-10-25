const handleToggleSideBar = () => {
    var body = document.body;
    if (window.screen.width <= 998) {
        body.classList.toggle("sidebar-enable");
    } else {
        body.classList.toggle("vertical-collpsed");
        body.classList.toggle("sidebar-enable");
    }
}

export const ToggleSideBarButton = () => {
    return(
        <>
            <button
                type="button"
                onClick={()=>{handleToggleSideBar()}}
                className="btn btn-sm px-3 font-size-16 header-item"
                id="vertical-menu-btn"
            >
                <i className="fa fa-fw fa-bars"></i>
            </button>

        </>
    )
}