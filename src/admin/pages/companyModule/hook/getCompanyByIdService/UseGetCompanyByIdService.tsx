import {CompanyResponseInterface} from "./CompanyResponseInterface";
import {useState} from "react";
import {AxiosError, AxiosResponse} from "axios";
import preventoolApi from "../../../../../shared/api/preventool/preventoolApi";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../shared/utils/MessagesHttpResponse";

export const UseGetCompanyByIdService = () => {

    const [company, setCompany] = useState<CompanyResponseInterface|null>(null);

    const getCompanyByIdAction = async (id:string): Promise<boolean> => {

        try {
            const response:AxiosResponse = await preventoolApi.get('/company/'+id);
            const responseData:CompanyResponseInterface = response.data;
            setCompany(responseData)
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
                toast.error(MessagesHttpResponse.CompanyNotFoundException)
            }else {
                toast.error(MessagesHttpResponse.InternalError);
            }
            return false;
        }
    }

    return{
        company,
        getCompanyByIdAction
    }


}