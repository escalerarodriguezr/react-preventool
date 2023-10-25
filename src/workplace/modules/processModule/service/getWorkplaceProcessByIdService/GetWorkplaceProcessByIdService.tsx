import {useState} from "react";
import {GetWorkplaceProcessByIdResponse} from "./GetWorkplaceProcessByIdResponse";
import {AxiosError, AxiosResponse} from "axios";
import preventoolApi from "../../../../../shared/api/preventool/preventoolApi";
import {workplaceSlice} from "../../../../../store/workplace/workplaceSlice";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../../admin/shared/utils/MessagesHttpResponse";

export const GetWorkplaceProcessByIdService = () => {
    const [process, setProcess] = useState<GetWorkplaceProcessByIdResponse|null>(null);

    const getWorkplaceProcessByIdAction = async (workplaceId:string, id:string): Promise<boolean> => {


        try{
            const response:AxiosResponse = await preventoolApi.get(
                `/workplace/${workplaceId}/process/${id}`
            );

            const process:GetWorkplaceProcessByIdResponse = response.data;
            setProcess(process);
            return true;

        }catch (error){
            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;

            if( status === 409 && data.class.includes('ActionNotAllowedException') )
            {
                toast.info(MessagesHttpResponse.ActionNotAllowedException);
            }else if( status === 403 && data.class.includes('AccessDeniedException') ){
                toast.info(MessagesHttpResponse.AccessDeniedException);
            }else if( status === 404 ){
                toast.error(MessagesHttpResponse.ProcessNotFoundException)
            }else {
                toast.error(MessagesHttpResponse.InternalError);
            }
            return false;

        }

    }

    return{
        process,
        getWorkplaceProcessByIdAction
    }

}