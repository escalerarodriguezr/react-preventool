import {Route, Routes} from "react-router-dom";
import {Login} from "../pages";

export const AuthRouter = () => {
    return(
        <Routes>
            {/*<Route path="login" element={<Login />} />*/}
            <Route path="*" element={<Login />} />
        </Routes>
    )
}