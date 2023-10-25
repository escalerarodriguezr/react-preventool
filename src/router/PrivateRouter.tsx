
import {Navigate} from "react-router-dom";
import {ReactElement} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";

interface Props {
    children: ReactElement | ReactElement [];
}
export const PrivateRouter = ({children}:Props): any => {
    const {token} = useSelector((state:RootState)=>state.auth);
    return (token)
        ?children
        :<Navigate to={'/auth/login'}/>
}