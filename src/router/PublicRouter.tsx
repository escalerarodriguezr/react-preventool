import {Navigate, RouterProps} from "react-router-dom";
import {ReactElement} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";

interface Props {
    children:ReactElement | ReactElement [];
}

export const PublicRouter = ({children}:Props): any => {

    const {token} = useSelector((state:RootState)=>state.auth);const isLogged = false

    return token
        ? <Navigate to={'/admin/dashboard'}/>
        : children
}