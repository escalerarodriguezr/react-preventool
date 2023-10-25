import {useState} from "react";
import {AxiosError, AxiosResponse} from "axios";
import preventoolApi from "../../../../../shared/api/preventool/preventoolApi";
import {SearchAdminResponseInterface} from "./SearchAdminResponseInterface";
import {useUiStore} from "../../../../../store/ui/useUiStore";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../shared/utils/MessagesHttpResponse";
import Swal from "sweetalert2";

export const UseSearchAdminService = () =>{

    const [admins, setAdmins] = useState<any[]>([]);
    const [pages, setPages] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const {
        appLoading,
        appLoaded
    } = useUiStore();

    const searchAdminAction = async (urlQueryString:string='?'):Promise<boolean> => {

        try {
            appLoading();
            const sessionResponse:AxiosResponse = await preventoolApi.get('/admin'+urlQueryString);
            const data = sessionResponse.data as SearchAdminResponseInterface;
            setCurrentPage(data.currentPage);
            setTotal(data.total);
            setPages(data.pages);
            setAdmins(data.items);
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

    const activateAdmin = async (currentAdmin:any) => {



        const activateTitleText:string = currentAdmin.active == true ? 'desactivar' : 'activar';
        const activateText:string = currentAdmin.active == true
            ? 'El Administrador no podrá acceder al sistema'
            : 'El Administrador podrá acceder al sistema'
        Swal.fire({
            title: `¿Estás seguro de querer ${activateTitleText} al Administrador?`,
            text: activateText,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sí, lo confirmo!'
        }).then((result) => {
            if (result.isConfirmed) {
                activateRequest(currentAdmin);
            }
        })
    }

    const activateRequest = async (admin:any) => {

        try {
            appLoading();
            const url:string = '/admin/'+ admin.id + '/activate'
            await preventoolApi.put(url);
            admin.active = !admin.active;
            appLoaded();
            Swal.fire(
                'Admin!',
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
        admins,
        currentPage,
        pages,
        total,

        searchAdminAction,
        activateAdmin
    }

}