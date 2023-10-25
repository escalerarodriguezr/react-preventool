import {CardTitle, Col, Row} from "reactstrap";
import {useUiStore} from "../../../../../store/ui/useUiStore";
import {
    GetTaskRiskAssessmentByTaskIdService
} from "../../service/getTaskRiskAssessmentByTaskRiskId/GetTaskRiskAssessmentByTaskIdService";
import {SyntheticEvent, useEffect, useState} from "react";
import preventoolApi from "../../../../../shared/api/preventool/preventoolApi";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../../admin/shared/utils/MessagesHttpResponse";
import {AxiosError, AxiosResponse} from "axios";

interface props{
    taskRiskId:string
}
export const StatusAssessment = (
    {taskRiskId}:props
) => {

    const {appLoading,appLoaded} = useUiStore();
    const {taskRiskAssessment,getTaskRiskAssessmentAction} = GetTaskRiskAssessmentByTaskIdService();

    const [status, setStatus] = useState<string>('PENDING');

    useEffect(()=>{
        appLoading();
        getTaskRiskAssessmentAction(taskRiskId).then(appLoaded);
    },[]);

    useEffect(()=>{
        if(taskRiskAssessment?.status){
            setStatus(taskRiskAssessment.status);
        }
    },[taskRiskAssessment])

    const handleSelectedChange = (event:SyntheticEvent) => {
        // @ts-ignore
        const statusValue = event.nativeEvent.target.value
        setStatus(statusValue);
    }

    const disableSaveButton = () => {
       return taskRiskAssessment == null;


    }

    const handleSaveRequest = async ():Promise<void> => {
        const url:string = `/task-risk-assessment/${taskRiskId}/update-status`;
        const requestData = {
            status: status
        }
        try {
            await preventoolApi.put(url,requestData);
            toast.info(MessagesHttpResponse.TaskRiskAssessmentStatusUpdated);

        }catch (error){
            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;
            if( status === 404 && data.class.includes('TaskRiskAssessmentNotFoundException') )
            {
                toast.info(MessagesHttpResponse.TaskRiskNotFoundException);
            }else if( status === 409 && data.class.includes('ActionNotAllowedException') ) {
                toast.info(MessagesHttpResponse.ActionNotAllowedException);
            }else if( status === 403 && data.class.includes('AccessDeniedException') ){
                toast.info(MessagesHttpResponse.AccessDeniedException);
            }else{
                toast.error(MessagesHttpResponse.InternalError);
            }
        }

    }

    return(
        <>
            <Row className="justify-content-center">
                <CardTitle className="text-center mt-4">ESTADO</CardTitle>
                <Col sm={4}>
                    <div className="mb-3 row">
                        <div className="text-center">
                            <label className="col-form-label">Estado del Documento</label>
                        </div>

                        <div className="">
                            <select className="form-select"
                                    value={status}
                                    disabled={disableSaveButton()}
                                    onChange={handleSelectedChange}
                            >
                                <option value={'PENDING'} disabled={true}>Pendiente de evaluar</option>
                                <option value={'DRAFT'}>Borrador</option>
                                <option value={'REVISED'}>Revisado</option>
                                <option value={'APPROVED'}>Aprobado</option>

                            </select>
                        </div>

                        <div className="mt-2 text-center">
                            <button type="button" className="btn btn-primary w-md"
                                    disabled={disableSaveButton()}
                                    onClick={()=>handleSaveRequest()}
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </Col>

            </Row>
        </>
    )
}