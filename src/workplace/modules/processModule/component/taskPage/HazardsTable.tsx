import {useUiStore} from "../../../../../store/ui/useUiStore";
import {useEffect} from "react";
import {getTaskHazardsByTaskIdService} from "../../service/getTaskHazardsByTaskId/GetTaskHazardsByTaskIdService";
import {Card, CardBody, Col, Container, Input, Label, Row, Table} from "reactstrap";
import Swal from 'sweetalert2'
import Switch from "react-switch";
import {OffSymbol} from "../../../../../admin/shared/component/OffSymbol";
import {OnSymbol} from "../../../../../admin/shared/component/OnSymbol";
import {useNavigate} from "react-router-dom";
import preventoolApi from "../../../../../shared/api/preventool/preventoolApi";
import {AxiosError, AxiosResponse} from "axios";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../../admin/shared/utils/MessagesHttpResponse";
import {TaskRiskStatusMessages} from "../../../occupationalRisk/utils/TaskRiskStatusMessages";
import {TaskRiskTagClassMessages} from "../../../occupationalRisk/utils/TaskRiskStatusTagClass";

interface props{
    taskId: string
}
export const HazardsTable = (
    {taskId}:props
) => {
    const navigate = useNavigate();

    const {appLoading,appLoaded, loading} = useUiStore();
    const {taskHazards,getTaskHazardsAction} = getTaskHazardsByTaskIdService();

    useEffect(()=>{
        if(taskId){
            appLoading();
            getTaskHazardsAction(taskId).then(appLoaded);
        }
    },[]);


    const handleNavigateToRisk = (riskId:string) => {
       navigate(`/centro-trabajo/riesgo/${riskId}`);
    }

    const handleDeleteTaskHazad = (taskHazardId:string): void =>{

        Swal.fire({
            title: 'Estás seguro de querer eliminar el peligro?',
            text: "Se va eliminar el peligro asociado a la tarea. La acción es irreversible.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sí, eliminar el peligro!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTaskHazardRequest(taskHazardId);
            }
        })
    }

    const deleteTaskHazardRequest = async (taskHazardId:string) => {

        try {
            appLoading();
            const url:string = '/task-hazard/'+taskHazardId
            await preventoolApi.delete(url);
            if(taskId){
                getTaskHazardsAction(taskId)
            }
            appLoaded();
            Swal.fire(
                'Peligro!',
                'El peligro se ha eliminado correctamente.',
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
            <Container fluid>

                <Row>
                    <Col md={12}>
                        <Card>
                            <CardBody>
                                {
                                    !loading &&
                                    <div className="table-responsive">
                                        <Table className="table mb-0">
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th><span>Riesgo</span></th>
                                                <th><span>Peligro</span></th>
                                                <th><span>Estado</span></th>
                                                {/*<th>Activo</th>*/}
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>

                                            {
                                                taskHazards.length
                                                    ? taskHazards.map(
                                                        (taskHazard,index) => (
                                                            <tr
                                                                key={taskHazard.id}
                                                            >
                                                                <th scope="row">{index+1}</th>
                                                                <td>{taskHazard.riskName}</td>
                                                                <td>{taskHazard.hazardName}</td>
                                                                <td>
                                                                    <span
                                                                        className={`badge rounded-pill font-size-11 ${TaskRiskTagClassMessages(taskHazard.status)}`}>
                                                                        {TaskRiskStatusMessages(taskHazard.status)}
                                                                    </span>
                                                                </td>
                                                                {/*<td><Switch*/}
                                                                {/*    uncheckedIcon={<OffSymbol />}*/}
                                                                {/*    className="me-1 mb-sm-8 mb-2"*/}
                                                                {/*    checkedIcon={<OnSymbol />}*/}
                                                                {/*    onColor="#02a499"*/}
                                                                {/*    onChange={(checked, event, id) =>{*/}

                                                                {/*    }}*/}
                                                                {/*    checked={taskHazard.active}*/}
                                                                {/*    disabled={true}*/}
                                                                {/*/></td>*/}
                                                                <td>
                                                                    <div className="btn-group" >
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-default"
                                                                            title="Eliminar"
                                                                            onClick={()=>handleDeleteTaskHazad(taskHazard.id)}

                                                                        >
                                                                            <i className="fas fa-trash"></i>
                                                                        </button>

                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-default"
                                                                            title="Gestionar Riesgo"
                                                                            onClick={()=>handleNavigateToRisk(taskHazard.riskId)}
                                                                        >
                                                                            <i className="fas fa-bezier-curve" />
                                                                        </button>

                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )
                                                    : (<tr><td colSpan={6} className={'text-center'}>No hay peligros asignados</td></tr>)

                                            }
                                            </tbody>
                                        </Table>

                                    </div>
                                }

                            </CardBody>
                        </Card>
                    </Col>
                </Row>


            </Container>
        </>
    )



}