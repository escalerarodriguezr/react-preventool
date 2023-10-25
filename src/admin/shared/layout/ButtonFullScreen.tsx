const handleFullScreen = ():void => {
    // if (
    //     !document.fullscreenElement &&
    //     /* alternative standard method */ !document.mozFullScreenElement &&
    //     !document.webkitFullscreenElement
    // ) {
    //     // current working methods
    //     if (document.documentElement.requestFullscreen) {
    //         document.documentElement.requestFullscreen();
    //     } else if (document.documentElement.mozRequestFullScreen) {
    //         document.documentElement.mozRequestFullScreen();
    //     } else if (document.documentElement.webkitRequestFullscreen) {
    //         document.documentElement.webkitRequestFullscreen(
    //             Element.ALLOW_KEYBOARD_INPUT
    //         );
    //     }
    // } else {
    //     if (document.cancelFullScreen) {
    //         document.cancelFullScreen();
    //     } else if (document.mozCancelFullScreen) {
    //         document.mozCancelFullScreen();
    //     } else if (document.webkitCancelFullScreen) {
    //         document.webkitCancelFullScreen();
    //     }
    // }
}

export const ButtonFullScreen = () => {


    return(
        <>
            <div className="dropdown d-none d-lg-inline-block ms-1">
                <button
                    type="button"
                    onClick={()=>handleFullScreen()}
                    className="btn header-item noti-icon"
                    data-toggle="fullscreen"
                >
                    <i className="bx bx-fullscreen"></i>
                </button>
            </div>

        </>
    )
}