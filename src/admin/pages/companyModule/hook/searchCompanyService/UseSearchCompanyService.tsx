import {useState} from "react";
import {useUiStore} from "../../../../../store/ui/useUiStore";
import {AxiosError, AxiosResponse} from "axios";
import preventoolApi from "../../../../../shared/api/preventool/preventoolApi";
import {SearchAdminResponseInterface} from "../../../adminModule/hook/searchAdminService/SearchAdminResponseInterface";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../shared/utils/MessagesHttpResponse";
import {SearchCompanyResponseInterface} from "./SearchCompanyResponseInterface";
import Swal from "sweetalert2";

export const UseSearchCompanyService = () =>{

    const [companies, setCompanies] = useState<any[]>([]);
    const [pages, setPages] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);


    const {
        appLoading,
        appLoaded
    } = useUiStore();

    const searchCompanyAction = async (urlQueryString:string='?'):Promise<boolean> => {

        try {
            appLoading();
            const sessionResponse:AxiosResponse = await preventoolApi.get('/company'+urlQueryString);
            const data = sessionResponse.data as SearchCompanyResponseInterface;
            setCurrentPage(data.currentPage);
            setTotal(data.total);
            setPages(data.pages);
            setCompanies(data.items);
            appLoaded();

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

            appLoaded();
            return false;
        }

    }

    const activateCompany = async (currentCompany:any) => {

        const activateTitleText:string = currentCompany.active == true ? 'desactivar' : 'activar';
        const activateText:string = currentCompany.active == true
            ? 'Ya no se podrá acceder a la gestión de la Empresa'
            : 'Se podrá acceder a la gestión de la Empresa'

        Swal.fire({
            title: `¿Estás seguro de querer ${activateTitleText} la Empresa?`,
            text: activateText,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sí, lo confirmo!'
        }).then((result) => {
            if (result.isConfirmed) {
                activateRequest(currentCompany);
            }
        })
    }

    const activateRequest = async (company:any) => {

        try {
            appLoading();
            const url:string = '/company/'+ company.id + '/activate'
            await preventoolApi.put(url);
            company.active = !company.active;
            appLoaded();
            Swal.fire(
                'Activar/Desactivar Empresa',
                'Acción completada.',
                'success'
            )

        }catch (error){
            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;
            if( status === 409 && data.class.includes('ActionNotAllowedException') )
            {
                toast.info(MessagesHttpResponse.ActionNotAllowedException);
            }else if( status === 403 && data.class.includes('AccessDeniedException') ){
                toast.info(MessagesHttpResponse.AccessDeniedException);
            }else {
                toast.error(MessagesHttpResponse.InternalError);
            }
        }
    }



    return{
        companies,
        currentPage,
        pages,
        total,

        searchCompanyAction,
        activateCompany
    }

}