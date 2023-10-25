import {useState} from "react";
import {TaskRiskAssessmentResponse} from "./TaskRiskAssessmentResponse";
import {AxiosError, AxiosResponse} from "axios/index";
import preventoolApi from "../../../../../shared/api/preventool/preventoolApi";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../../admin/shared/utils/MessagesHttpResponse";

export const GetTaskRiskAssessmentByTaskIdService = () => {
    const [taskRiskAssessment, setTaskRiskAssessment] = useState<TaskRiskAssessmentResponse|null>(null);

    const getTaskRiskAssessmentAction = async (taskRiskId:string):Promise<void> => {

        const url:string =  `task-risk/${taskRiskId}/task-risk-assessment`
        try {
            const response:AxiosResponse = await preventoolApi.get(url);
            const codeStatus:number = response.status
            if(codeStatus == 200){
                const data:TaskRiskAssessmentResponse = response.data;
                setTaskRiskAssessment(data);
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
                toast.error(MessagesHttpResponse.TaskRiskNotFoundException)
            }else {
                toast.error(MessagesHttpResponse.InternalError);
            }
        }
    }


    return{
        taskRiskAssessment,
        getTaskRiskAssessmentAction
    }

}