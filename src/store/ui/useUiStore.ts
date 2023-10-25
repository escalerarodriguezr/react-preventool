import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {getEnv} from "../../shared/utils/getEnv";
import {authApi} from "../../shared/api/preventool/authApi";

import {loadingOff, loadingOn} from "./uiSlice";

export const useUiStore = () => {

    const { 
        loading
    } = useSelector( (state: RootState)=> state.ui );
    const dispatch = useDispatch();
    
    
    const appLoading = () => {
        dispatch(loadingOn());
    }
    
    const appLoaded = () => {
        dispatch(loadingOff())
    }

    return {
        //* Propiedades
        loading,

        //* Métodos
        appLoading,
        appLoaded
    }
}