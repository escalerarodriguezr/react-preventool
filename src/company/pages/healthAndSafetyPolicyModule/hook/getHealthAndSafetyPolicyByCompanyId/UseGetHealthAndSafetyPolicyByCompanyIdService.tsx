import {useState} from "react";
import {GetHealthAndSafetyPolicyResponseInterface} from "./getHealthAndSafetyPolicyResponseInterface";
import {AxiosError, AxiosResponse} from "axios";
import preventoolApi from "../../../../../shared/api/preventool/preventoolApi";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../../admin/shared/utils/MessagesHttpResponse";

export const UseGetHealthAndSafetyPolicyByCompanyIdService = () => {

    const [policy, setPolicy] = useState<GetHealthAndSafetyPolicyResponseInterface|null>(null);


    const getPolicyByCompanyIdAction = async (
        companyId:string
    ): Promise<boolean> => {

        try {

            const response:AxiosResponse = await preventoolApi.get('' +
                `/company/${companyId}/health-and-safety-policy`
            );
            const responseData:GetHealthAndSafetyPolicyResponseInterface = response.data;
            setPolicy(responseData);
            return true;
        }catch (error:any){

            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;

            if( status === 409 && data.class.includes('ActionNotAllowedException') )
            {
                toast.info(MessagesHttpResponse.ActionNotAllowedException);
            }else if( status === 403 && data.class.includes('AccessDeniedException') ){
                toast.info(MessagesHttpResponse.AccessDeniedException);
            }else if( status === 404 ){
                toast.error(MessagesHttpResponse.HealthAndSafetyNotFoundException)
            }else {
                toast.error(MessagesHttpResponse.InternalError);
            }
            return false;


        }

    }

    return{
        policy,
        getPolicyByCompanyIdAction
    }

}