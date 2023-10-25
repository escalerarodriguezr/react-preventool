import {useState} from "react";
import {GetBaselineStudyComplianceResponseInterface} from "./GetBaselineStudyComplianceResponseInterface";
import {AxiosError, AxiosResponse} from "axios";
import preventoolApi from "../../../../../shared/api/preventool/preventoolApi";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../../admin/shared/utils/MessagesHttpResponse";

export const GetBaselineStudyComplianceService = () => {
    const [baselineStudyCompliance, setBaselineStudyCompliance] = useState<
        GetBaselineStudyComplianceResponseInterface|null
    >(null);


    const getBaselineStudyComplianceAction = async (id:string):Promise<boolean> => {

        try {
            const response:AxiosResponse = await preventoolApi.get(
                '/baseline-study-compliance/' + id
            );

            const data:GetBaselineStudyComplianceResponseInterface = response.data;
            setBaselineStudyCompliance(data);

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
                toast.error(MessagesHttpResponse.WorkplaceNotFoundException)
            }else {
                toast.error(MessagesHttpResponse.InternalError);
            }
            return false;

        }


        return true;

    }



    return{
        baselineStudyCompliance,
        getBaselineStudyComplianceAction
    }
}