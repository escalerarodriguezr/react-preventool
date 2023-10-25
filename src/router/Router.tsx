import {Route, Routes} from "react-router-dom";
import {PublicRouter} from "./PublicRouter";
import {AuthRouter} from "../auth";
import {PrivateRouter} from "./PrivateRouter";
import {AdminRouter} from "../admin";
import {CircleSpinnerOverlay} from "react-spinner-overlay";
import {useUiStore} from "../store/ui/useUiStore";
import {CompanyRouter} from "../company/router/CompanyRouter";
import {WorkplaceRouter} from "../workplace/router/WorkplaceRouter";

export const Router = () => {

    const {loading} = useUiStore()

    return(
        <>
            <CircleSpinnerOverlay
                loading={loading}
                color="#5b9bd1"
                overlayColor="rgba(0,153,255,0.1)"
            />
            <Routes>
                {/*<Route path="/auth/*" element={*/}
                {/*    <PublicRouter>*/}
                {/*        <AuthRouter/>*/}
                {/*    </PublicRouter>*/}
                {/*} />*/}

                <Route path="/admin/*" element={
                    <PrivateRouter>
                        <AdminRouter/>
                    </PrivateRouter>
                } />

                <Route path="/empresa/*" element={
                    <PrivateRouter>
                        <CompanyRouter/>
                    </PrivateRouter>
                } />

                <Route path="/centro-trabajo/*" element={
                    <PrivateRouter>
                        <WorkplaceRouter/>
                    </PrivateRouter>
                } />

                <Route path="/*" element={
                    <PublicRouter>
                        <AuthRouter/>
                    </PublicRouter>
                } />
            </Routes>
        </>

    )
}