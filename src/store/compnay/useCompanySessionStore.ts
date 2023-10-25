import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {AxiosError, AxiosResponse} from "axios";
import preventoolApi from "../../shared/api/preventool/preventoolApi";
import {
    ActionCompany, clearCompanySession,
    CompanySessionResponse,
    CompanySessionState,
    setCompanySession,
    setCompanySessionError
} from "./companySlice";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

export const useCompanySessionStore = () => {

    const companySessionState:CompanySessionState = useSelector( (state: RootState)=> state.company );
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const clearCompanySessionAction = () => {
        dispatch(clearCompanySession());
        localStorage.removeItem('companyId');
        localStorage.removeItem('companySession');
    }

    const getCompanySessionAction = async():Promise<boolean> => {

        try {
            const companyId = localStorage.getItem('companyId');
            const companySessionResponse:AxiosResponse = await preventoolApi.get('/company-session/'+companyId);
            const data = companySessionResponse.data;
            if(data){
                if(data.actionCompany.active == true){
                    dispatch(setCompanySession(data))
                    localStorage.setItem('companySession', JSON.stringify(data));
                    return true;
                }else{
                    dispatch(setCompanySessionError());
                    navigate('/admin/dashboard');
                    Swal.fire(
                        'Error!',
                        'La Empresa no está activa en el sistema',
                        'error'
                    )
                    return false;
                }
            }
            
            return false;

        } catch (error) {
            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;
            dispatch(setCompanySessionError());
            return false;
        }
    }

    return {
        //State
        companySessionState,
        //Actions
        getCompanySessionAction,
        clearCompanySessionAction
    }
}