import {GetWorkplaceByIdResponseInterface} from "./GetWorkplaceByIdResponseInterface";
import {useState} from "react";
import {AxiosError, AxiosResponse} from "axios";
import preventoolApi from "../../../../../shared/api/preventool/preventoolApi";
import {
    CompanyResponseInterface
} from "../../../../../admin/pages/companyModule/hook/getCompanyByIdService/CompanyResponseInterface";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../../admin/shared/utils/MessagesHttpResponse";

export const UseGetWorkplaceByIdService = () => {

    const [workplace, setWorkplace] = useState<GetWorkplaceByIdResponseInterface|null>(null);

    const getWorkplaceByIdAction = async (
        companyId:string,
        id:string
    ): Promise<boolean> => {
        try {

            const response:AxiosResponse = await preventoolApi.get('/company/' +companyId + '/workplace/' + id);
            const responseData:GetWorkplaceByIdResponseInterface = response.data;
            setWorkplace(responseData)
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
                toast.error(MessagesHttpResponse.CompanyNotFoundException)
            }else {
                toast.error(MessagesHttpResponse.InternalError);
            }
            return false;

        }
    }


    return{
        workplace,
        getWorkplaceByIdAction
    }


}