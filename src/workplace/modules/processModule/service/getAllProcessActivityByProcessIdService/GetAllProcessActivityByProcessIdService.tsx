import {useState} from "react";
import {AxiosResponse} from "axios";
import preventoolApi from "../../../../../shared/api/preventool/preventoolApi";
import {AxiosError} from "axios/index";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../../admin/shared/utils/MessagesHttpResponse";
import {ProcessActivityResponse} from "../interface/ProcessActivityResponse";

export const GetAllProcessActivityByProcessIdService = () => {
    const [collection, setCollection] = useState<ProcessActivityResponse[]>([]);

    const searchAction = async (processId:string): Promise<void>=>{
        try {
            const response:AxiosResponse = await preventoolApi.get(
                '/all-process-activity/' + processId
            )
            setCollection(response.data);

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
        collection,
        setCollection,
        searchAction
    }
}