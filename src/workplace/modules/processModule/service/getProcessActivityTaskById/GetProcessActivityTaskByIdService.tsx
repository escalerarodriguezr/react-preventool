import {useState} from "react";
import {ProcessActivityTaskResponse} from "../interface/ProcessActivityTaskResponse";
import {AxiosError, AxiosResponse} from "axios";
import preventoolApi from "../../../../../shared/api/preventool/preventoolApi";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../../admin/shared/utils/MessagesHttpResponse";

export const GetProcessActivityTaskByIdService = () => {
    const [task, setTask] = useState<ProcessActivityTaskResponse|null>(null);

    const getTaskAction = async (taskId:string):Promise<void> => {
        try {
            const response:AxiosResponse = await preventoolApi.get(
                `/activity-task/${taskId}`
            );
            const data:ProcessActivityTaskResponse = response.data;
            setTask(data);

        }catch (error){
            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;

            if( status === 409 && data.class.includes('ActionNotAllowedException') )
            {
                toast.info(MessagesHttpResponse.ActionNotAllowedException);
            }else if( status === 403 && data.class.includes('AccessDeniedException') ){
                toast.info(MessagesHttpResponse.AccessDeniedException);
            }else if( status === 404 ){
                toast.error(MessagesHttpResponse.ProcessActivityTaskNotFoundException)
            }else {
                toast.error(MessagesHttpResponse.InternalError);
            }
        }
    }

    return{
        task,
        getTaskAction
    }

}