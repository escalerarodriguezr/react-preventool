import {useState} from "react";
import {TaskRiskResponse} from "./TaskRiskResponse";
import {AxiosError, AxiosResponse} from "axios";
import preventoolApi from "../../../../../shared/api/preventool/preventoolApi";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../../admin/shared/utils/MessagesHttpResponse";

export const GetTaskRiskByIdService = () => {
    const [taskRisk, setTaskRisk] = useState<TaskRiskResponse>();

    const getTaskRiskAction = async (taskRiskId:string) => {

        try {
            const url:string = `task-risk/${taskRiskId}`
            const response:AxiosResponse = await preventoolApi.get(url);

            const data:TaskRiskResponse = response.data;
            setTaskRisk(data);

        }catch (error){
            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;

            if( status === 409 && data.class.includes('ActionNotAllowedException') )
            {
                toast.info(MessagesHttpResponse.ActionNotAllowedException);
            }else if( status === 403 && data.class.includes('AccessDeniedException') ){
                toast.info(MessagesHttpResponse.AccessDeniedException);
            }else if( status === 404 ){
                toast.error(MessagesHttpResponse.TaskRiskNotFoundException)
            }else {
                toast.error(MessagesHttpResponse.InternalError);
            }
        }

    }

    return{
        taskRisk,
        getTaskRiskAction
    }

}