import {ProcessActivityResponse} from "../interface/ProcessActivityResponse";
import {useState} from "react";
import {AxiosResponse} from "axios";
import preventoolApi from "../../../../../shared/api/preventool/preventoolApi";
import {AxiosError} from "axios/index";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../../admin/shared/utils/MessagesHttpResponse";

export const GetProcessActivityByIdService = () => {
    const [activity, setActivity] = useState<ProcessActivityResponse|null>(null);

    const getAction = async (activityId:string):Promise<void> => {

        try {
            const response:AxiosResponse = await preventoolApi.get(
                `/process-activity/${activityId}`
            );
            setActivity(response.data);

        }catch (error){
            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;

            if( status === 409 && data.class.includes('ActionNotAllowedException') )
            {
                toast.info(MessagesHttpResponse.ActionNotAllowedException);
            }else if( status === 403 && data.class.includes('AccessDeniedException') ){
                toast.info(MessagesHttpResponse.AccessDeniedException);
            }else if( status === 404 ){
                toast.error(MessagesHttpResponse.ProcessActivityNotFoundException)
            }else {
                toast.error(MessagesHttpResponse.InternalError);
            }

        }
    }

    return{
        activity,
        getAction
    }
}