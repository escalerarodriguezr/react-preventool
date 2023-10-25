import {ProcessActivityResponse} from "../../service/interface/ProcessActivityResponse";
import {Col, Row, Table} from "reactstrap";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {
    GetAllProcessActivityTasksByProcessActivityId
} from "../../service/getAllProcessActivityTasksByProcessActivityId/GetAllProcessActivityTasksByProcessActivityId";
import {useUiStore} from "../../../../../store/ui/useUiStore";
import {ProcessActivityTaskResponse} from "../../service/interface/ProcessActivityTaskResponse";
// @ts-ignore
import ReactDragListView from "react-drag-listview/lib/index.js";
import preventoolApi from "../../../../../shared/api/preventool/preventoolApi";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../../admin/shared/utils/MessagesHttpResponse";
import {AxiosError, AxiosResponse} from "axios";
import Swal from "sweetalert2";

interface ActivityTasksProps{
    activity:ProcessActivityResponse
}
export const ActivityTasks = (
    {activity}:ActivityTasksProps
) => {

    const navigate = useNavigate();
    const {appLoading,appLoaded} = useUiStore();
    const {getTasksAction,setTasks,tasks} = GetAllProcessActivityTasksByProcessActivityId();

    useEffect(()=>{
        appLoading();
        getTasksAction(activity.id).then(appLoaded);
    },[]);


    const handleNavigateToCreateProcessActivityTaskPAge = () => {
        navigate(`/centro-trabajo/actividad/${activity.id}/crear-tarea`);
    }

    const dragProps = {
        onDragEnd(fromIndex:any, toIndex:any) {

            const data:ProcessActivityTaskResponse[] = [...tasks];
            const item:ProcessActivityTaskResponse = data.splice(fromIndex, 1)[0];
            data.splice(toIndex, 0, item);
            let itemIndex:number = 0;

            data.forEach((task:ProcessActivityTaskResponse) => {
                itemIndex += 1;
                task.taskOrder = itemIndex;
            })
            setTasks(data);
        },
        nodeSelector: "tr",
        handleSelector: "tr",
    };

    const handleSaveOrder = ():void => {

        const orderList:string[] = [];
        tasks.forEach((task:ProcessActivityTaskResponse) => {
            orderList.push(task.id);
        })
        //hacer peticion con este order list
        appLoading()
        reorderRequest(activity.id,orderList).then(appLoaded);
        appLoaded();

    }

    const handleNavigateToEdit = (taskId:string) => {
        navigate(`/centro-trabajo/actividad/${activity.id}/editar-tarea/${taskId}`)
    }

    const handleNavigateToTaskPage = (taskId:string):void => {
        navigate(`/centro-trabajo/tarea/${taskId}`);
    }

    const reorderRequest = async (processActivity:string, order:string[]):Promise<void> => {

        try {
            await preventoolApi.put(
                `/process-activity/${processActivity}/reorder-tasks`,
                {order}
            );
            toast.info(MessagesHttpResponse.SuccessReorderResponse)
        }catch (error){
            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;
            if( status === 404 )
            {
                toast.error(MessagesHttpResponse.ProcessNotFoundException);
            }else if( status === 409 && data.class.includes('ActionNotAllowedException') ) {
                toast.info(MessagesHttpResponse.ActionNotAllowedException);
            }else if( status === 403 && data.class.includes('AccessDeniedException') ){
                toast.info(MessagesHttpResponse.AccessDeniedException);
            }else{
                toast.error(MessagesHttpResponse.InternalError);
            }
        }
    }

    const handleDeleteTask = (taskId:string): void =>{

        Swal.fire({
            title: 'Estás seguro de querer eliminar la Tarea?',
            text: "Se va eliminar la Tarea del sistema. La acción es irreversible.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sí, eliminar la Tarea!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTaskRequest(taskId);
            }
        })
    }

    const deleteTaskRequest = async (taskId:string): Promise<void> => {

        try {
            appLoading();
            const url:string = '/activity-task/' + taskId
            await preventoolApi.delete(url);
            getTasksAction(activity.id);
            appLoaded();
            Swal.fire(
                'Tarea',
                'La tarea se ha eliminado correctamente.',
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

    return(
        <>
            <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-primary"
                        onClick={handleNavigateToCreateProcessActivityTaskPAge}
                >
                    Añadir Tarea
                </button>
            </div>

            <Row>
                <Col xs={{size: 12}}>
                    <div className="table-responsive">
                        <ReactDragListView {...dragProps}>
                            <Table className="table mb-0">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th style={{width:'200px'}}></th>

                                </tr>
                                </thead>

                                <tbody>
                                {tasks.map((task:ProcessActivityTaskResponse, index:number) => (
                                    <tr key={index}>
                                        <th scope="row" style={{width:'100px'}}>{index+1}</th>
                                        <td>{task.name}</td>
                                        <td>
                                            <div className="btn-group" >
                                                <button
                                                    type="button"
                                                    className="btn btn-default"
                                                    title="Editar"
                                                    onClick={()=>handleNavigateToEdit(task.id)}

                                                >
                                                    <i className="fas fa-edit"></i>
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-default"
                                                    title="Gestionar Tarea"
                                                    onClick={()=>handleNavigateToTaskPage(task.id)}
                                                >
                                                    <i className="fas fa-city" />
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-default"
                                                    title="Eliminar"
                                                    onClick={()=>handleDeleteTask(task.id)}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>

                                            </div>

                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </ReactDragListView>
                    </div>

                    <div className="d-flex justify-content-start mt-5">
                        <button type="button" className="btn btn-primary"
                                onClick={handleSaveOrder}

                        >
                            Guardar orden
                        </button>
                    </div>

                </Col>
            </Row>

        </>
    )
}