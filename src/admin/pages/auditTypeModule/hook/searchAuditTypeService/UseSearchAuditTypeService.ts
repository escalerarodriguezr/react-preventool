import {useState} from "react";
import {useUiStore} from "../../../../../store/ui/useUiStore";
import {AxiosError, AxiosResponse} from "axios";
import preventoolApi from "../../../../../shared/api/preventool/preventoolApi";
import {
    SearchCompanyResponseInterface
} from "../../../companyModule/hook/searchCompanyService/SearchCompanyResponseInterface";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../shared/utils/MessagesHttpResponse";

export const UseSearchAuditTypeService = () => {
    const [auditTypes, setAuditTypes] = useState<any[]>([]);
    const [pages, setPages] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const {appLoading, appLoaded} = useUiStore()

    const searchAuditTypeAction = async (urlQueryString:string = '?'): Promise<boolean> => {

        try{
            appLoading()
            const response:AxiosResponse = await preventoolApi.get<SearchCompanyResponseInterface>(
                '/audit-type'+urlQueryString
            );
            const data:SearchCompanyResponseInterface = response.data
            setTotal(data.total);
            setPages(data.pages);
            setCurrentPage(data.currentPage);
            setAuditTypes(data.items);

            appLoaded()
            return true;
        }catch (error){
            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse;
            if( status === 409 && data.class.includes('ActionNotAllowedException') )
            {
                toast.info(MessagesHttpResponse.ActionNotAllowedException);
            }else if( status === 403 && data.class.includes('AccessDeniedException') ){
                toast.info(MessagesHttpResponse.AccessDeniedException);
            }else{
                toast.error(MessagesHttpResponse.InternalError);
            }
            appLoaded()
            return false;

        }

    }


    return{
        auditTypes,
        pages,
        total,
        currentPage,
        searchAuditTypeAction
    }

}