import {useState} from "react";
import {TaskHazardResponse} from "./TaskHazardResponse";
import {AxiosError, AxiosResponse} from "axios/index";
import preventoolApi from "../../../../../shared/api/preventool/preventoolApi";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../../admin/shared/utils/MessagesHttpResponse";

export const getTaskHazardsByTaskIdService = () => {

    const [taskHazards, setTaskHazards] = useState<TaskHazardResponse[]>([]);

    const getTaskHazardsAction = async (taskId:string):Promise<void> => {
        try {
            const response:AxiosResponse = await preventoolApi.get(`/task/${taskId}/hazards`);
            const data:TaskHazardResponse[] = response.data;
            setTaskHazards(data)
        }catch (error){
            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;
            if( status === 409 && data.class.includes('ActionNotAllowedException') )
            {
                toast.info(MessagesHttpResponse.ActionNotAllowedException);
            }else if( status === 403 && data.class.includes('AccessDeniedException') ){
                toast.info(MessagesHttpResponse.AccessDeniedException);
            }else {
                toast.error(MessagesHttpResponse.InternalError);
            }
        }

    }

    return{
        taskHazards,
        getTaskHazardsAction
    }
}