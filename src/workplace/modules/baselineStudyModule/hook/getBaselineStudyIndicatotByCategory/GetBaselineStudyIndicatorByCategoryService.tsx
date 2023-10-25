import {BaselineStudyIndicatorInterface} from "./BaselineStudyIndicatorInterface";
import {useState} from "react";
import {AxiosError, AxiosResponse} from "axios";
import preventoolApi from "../../../../../shared/api/preventool/preventoolApi";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../../admin/shared/utils/MessagesHttpResponse";

export const GetBaselineStudyIndicatorByCategoryService = () => {
    const [indicators, setIndicators] = useState<BaselineStudyIndicatorInterface[]>([]);

    const getBaselineStudyIndicatorsByCategoryAction = async (
        category:string,
        workplaceId:string
    ): Promise<boolean> =>
    {
        try {

            const response:AxiosResponse = await preventoolApi.get(
                `workplace-baseline-study-indicators-by-category/${workplaceId}/${category}`
            );
            const responseData:BaselineStudyIndicatorInterface[] = response.data;
            setIndicators(responseData);
            return true

        }catch (error){

            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;

            if( status === 409 && data.class.includes('ActionNotAllowedException') )
            {
                toast.info(MessagesHttpResponse.ActionNotAllowedException);
            }else if( status === 403 && data.class.includes('AccessDeniedException') ){
                toast.info(MessagesHttpResponse.AccessDeniedException);
            }else if( status === 404 ){
                if(data.class.includes('WorkplaceNotFoundException')){
                    toast.error(MessagesHttpResponse.WorkplaceNotFoundException);
                }else if(data.class.includes('WorkplaceBaselineStudyByCategoryNotFoundException')){
                    toast.error(MessagesHttpResponse.WorkplaceBaselineStudyByCategoryNotFoundException)
                }
                toast.error(MessagesHttpResponse.InternalError);

            }else {
                toast.error(MessagesHttpResponse.InternalError);
            }
            return false;


        }
    }

    return{
        indicators,
        getBaselineStudyIndicatorsByCategoryAction
    }

}