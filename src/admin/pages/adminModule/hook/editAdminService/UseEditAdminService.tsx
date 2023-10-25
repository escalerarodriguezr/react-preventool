import {EditAdminResponseInterface} from "./EditAdminResponseInterface";
import {useState} from "react";
import {useUiStore} from "../../../../../store/ui/useUiStore";
import {AxiosError, AxiosResponse} from "axios";
import preventoolApi from "../../../../../shared/api/preventool/preventoolApi";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../shared/utils/MessagesHttpResponse";

export const UseEditAdminService = () => {

    const [admin, setAdmin] = useState<EditAdminResponseInterface|null>(null);


    const getAdminByIdAction = async (id:string): Promise<boolean> => {

        try {

            const response:AxiosResponse = await preventoolApi.get('/admin/'+id);
            const responseData:EditAdminResponseInterface = response.data;
            setAdmin(responseData)

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
                toast.error(MessagesHttpResponse.AdminNotFoundException)
            }else {
                toast.error(MessagesHttpResponse.InternalError);
            }
            return false;
        }
    }


    return{
        admin,

        getAdminByIdAction
    }


}