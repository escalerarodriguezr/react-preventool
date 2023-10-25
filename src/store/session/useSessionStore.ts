import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {AxiosError, AxiosResponse} from "axios";
import preventoolApi from "../../shared/api/preventool/preventoolApi";
import {clearSession, SessionState, setHasSessionError, setSession} from "./sessionSlice";

export const useSessionStore = () => {

    const sessionState:SessionState = useSelector( (state: RootState)=> state.session );
    const dispatch = useDispatch();

    const clearSessionAction = () => {
        dispatch(clearSession());
    }

    const getSessionAction = async():Promise<boolean> => {

        try {
            const sessionResponse:AxiosResponse = await preventoolApi.get('/session');
            const data = sessionResponse.data as SessionState;
            if(data){
                dispatch(setSession(data))
                localStorage.setItem('session', JSON.stringify(data));
                return true;
            }
            return false;

        } catch (error) {
            // const axiosError = error as AxiosError;
            // const {status, data} = axiosError.response as AxiosResponse ;
            dispatch(setHasSessionError());
            return false;
        }
    }

    return {
        //State
        sessionState,
        //Actions
        getSessionAction,
        clearSessionAction


    }
}