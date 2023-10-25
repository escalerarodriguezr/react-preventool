import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {AxiosError, AxiosResponse} from "axios";
import preventoolApi from "../../shared/api/preventool/preventoolApi";
import {
    clearWorkplaceSession,
    setWorkplaceSession,
    setWorkplaceSessionError,
    WorkplaceSessionState
} from "./workplaceSlice";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";



export const useWorkplaceSessionStore = () => {

    const workplaceSessionState:WorkplaceSessionState = useSelector( (state: RootState)=> state.workplace );
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const clearWorkplaceSessionAction = () => {
        dispatch(clearWorkplaceSession());
        localStorage.removeItem('workplaceId');
        localStorage.removeItem('workplaceSession');
    }

    const getWorkplaceSessionAction = async():Promise<boolean> => {

        try {
            const workplaceId = localStorage.getItem('workplaceId');
            const workplaceSessionResponse:AxiosResponse = await preventoolApi.get('/workplace-session/'+workplaceId);
            const data = workplaceSessionResponse.data;
            if(data.actionWorkplace.active == true){
                dispatch(setWorkplaceSession(data))
                localStorage.setItem('workplaceSession', JSON.stringify(data));
                return true;
            }else{
                dispatch(setWorkplaceSessionError());
                navigate('/empresa/dashboard');
                Swal.fire(
                    'Error!',
                    'El Centro de Trabajo no está activo en el sistema',
                    'error'
                )
                return false;
            }

        } catch (error) {
            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;
            dispatch(setWorkplaceSessionError());
            return false;
        }
    }

    return {
        //State
        workplaceSessionState,
        //Actions
        getWorkplaceSessionAction,
        clearWorkplaceSession
    }
}