import {useState} from "react";
import {WorkplaceHazardResponseInterface} from "./WorkplaceHazardResponseInterface";
import {AxiosError, AxiosResponse} from "axios";
import preventoolApi from "../../../../../shared/api/preventool/preventoolApi";
import {SearchProcessResponseInterface} from "../searchProcessService/SearchProcessResponseInterface";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../../admin/shared/utils/MessagesHttpResponse";
import {SearchWorkplaceHazardResponseInterface} from "./SearchWorkplaceHazardResponseInterface";

interface propsInterface{
    workplaceId:string
}
export const SearchWorkplaceHazardService = (
    props:propsInterface
) => {

    const [collection, setCollection] = useState<WorkplaceHazardResponseInterface[]>([]);

    const [pages, setPages] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);



    const searchAction = async (urlQueryString:string='?'): Promise<boolean> => {

        try {
            const url:string = `workplace/${props.workplaceId}/search-hazard`
            const response:AxiosResponse = await preventoolApi.get(
                url + urlQueryString);
            const data = response.data as SearchWorkplaceHazardResponseInterface;
            setCurrentPage(data.currentPage);
            setTotal(data.total);
            setPages(data.pages);
            setCollection(data.items);

            return true;

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
            return false;
        }

    }

    return{
        collection,
        currentPage,
        total,
        pages,
        searchAction
    }




}