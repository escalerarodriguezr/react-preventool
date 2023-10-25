import {useState} from "react";
import {DashboardResponse} from "./DashboardResponse";
import {AxiosError, AxiosResponse} from "axios";
import preventoolApi from "../../../../../shared/api/preventool/preventoolApi";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../../admin/shared/utils/MessagesHttpResponse";


export const GetWorkplaceDashboardByIdService = () => {
    const [dashboardWorkplace, setDashboardWorkplace] = useState<DashboardResponse>();


    const getDashboardAction = async (workplaceId:string):Promise<void> => {

        const url:string =  `workplace/${workplaceId}/dashboard`
        try {
            const response:AxiosResponse = await preventoolApi.get(url);
            const codeStatus:number = response.status
            if(codeStatus == 200){
                const data:DashboardResponse = response.data;
                setDashboardWorkplace(data);
            }

        }catch (error){
            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;

            if( status === 409 && data.class.includes('ActionNotAllowedException') )
            {
                toast.info(MessagesHttpResponse.ActionNotAllowedException);
            }else if( status === 403 && data.class.includes('AccessDeniedException') ){
                toast.info(MessagesHttpResponse.AccessDeniedException);
            }else if( status === 404 ){
                toast.error(MessagesHttpResponse.WorkplaceNotFoundException)
            }else {
                toast.error(MessagesHttpResponse.InternalError);
            }
        }
    }
    
    return{
        dashboardWorkplace,
        getDashboardAction
    }

}