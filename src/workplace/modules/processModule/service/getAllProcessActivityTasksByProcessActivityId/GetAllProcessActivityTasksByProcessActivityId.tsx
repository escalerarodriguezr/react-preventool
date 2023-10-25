import {ProcessActivityTaskResponse} from "../interface/ProcessActivityTaskResponse";
import {useState} from "react";
import {AxiosError, AxiosResponse} from "axios";
import preventoolApi from "../../../../../shared/api/preventool/preventoolApi";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../../admin/shared/utils/MessagesHttpResponse";

export const GetAllProcessActivityTasksByProcessActivityId = () => {

    const [tasks, setTasks] = useState<ProcessActivityTaskResponse[]>([]);

    const getTasksAction = async (processActivityId:string):Promise<void> => {

        try {
            const response:AxiosResponse = await preventoolApi.get(
                `all-process-activity-tasks/${processActivityId}`
            );
            const data:ProcessActivityTaskResponse[] = response.data;
            setTasks(data);

        }catch (error){
            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;

            if( status === 409 && data.class.includes('ActionNotAllowedException') )
            {
                toast.info(MessagesHttpResponse.ActionNotAllowedException);
            }else if( status === 403 && data.class.includes('AccessDeniedException') ){
                toast.info(MessagesHttpResponse.AccessDeniedException);
            }else{
                toast.error(MessagesHttpResponse.InternalError);
            }
        }
    }

    return{
        tasks,
        getTasksAction,
        setTasks
    }

}