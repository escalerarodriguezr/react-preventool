import {useState} from "react";
import {useUiStore} from "../../../../../store/ui/useUiStore";
import {AxiosError, AxiosResponse} from "axios";
import preventoolApi from "../../../../../shared/api/preventool/preventoolApi";
import {toast} from "react-toastify";

import {SearchWorkplaceResponseInterface} from "./SearchWorkplaceResponseInterface";
import {MessagesHttpResponse} from "../../../../../admin/shared/utils/MessagesHttpResponse";
import Swal from "sweetalert2";

export const UseSearchWorkplaceService = () =>{

    const [workplaces, setWorkplaces] = useState<any[]>([]);
    const [pages, setPages] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);


    const {
        appLoading,
        appLoaded
    } = useUiStore();

    const searchWorkplaceAction = async (urlQueryString:string='?'):Promise<boolean> => {

        try {
            const sessionResponse:AxiosResponse = await preventoolApi.get('/workplace'+urlQueryString);
            const data = sessionResponse.data as SearchWorkplaceResponseInterface;
            setCurrentPage(data.currentPage);
            setTotal(data.total);
            setPages(data.pages);
            setWorkplaces(data.items);

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

    const activateWorkplace = async (currentWorkplace:any) => {

        const activateTitleText:string = currentWorkplace.active == true ? 'desactivar' : 'activar';
        const activateText:string = currentWorkplace.active == true
            ? 'Ya no se podrá acceder a la gestión del Centro de Trabajo'
            : 'Se podrá acceder a la gestión de la del Centro de Trabajo'

        Swal.fire({
            title: `¿Estás seguro de querer ${activateTitleText} el Centro de Trabajo?`,
            text: activateText,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sí, lo confirmo!'
        }).then((result) => {
            if (result.isConfirmed) {
                activateRequest(currentWorkplace);
            }
        })
    }

    const activateRequest = async (workplace:any) => {

        try {
            appLoading();
            const url:string = '/workplace/'+ workplace.id + '/activate'
            await preventoolApi.put(url);
            workplace.active = !workplace.active;
            appLoaded();
            Swal.fire(
                'Activar/Desactivar Centro de Trabajo',
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
        workplaces,
        currentPage,
        pages,
        total,

        searchWorkplaceAction,
        activateWorkplace
    }

}