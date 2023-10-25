import {useUiStore} from "../../../../../store/ui/useUiStore";
import {
    GetTaskRiskAssessmentByTaskIdService
} from "../../service/getTaskRiskAssessmentByTaskRiskId/GetTaskRiskAssessmentByTaskIdService";
import {SyntheticEvent, useEffect, useState} from "react";
import {CardTitle, Col, Row} from "reactstrap";
import {AxiosError, AxiosResponse} from "axios";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../../admin/shared/utils/MessagesHttpResponse";
import preventoolApi from "../../../../../shared/api/preventool/preventoolApi";

interface props{
    taskRiskId:string
}
export const IpercAssessment = (
    {taskRiskId}:props
) => {

    const {appLoading,appLoaded} = useUiStore();
    const {taskRiskAssessment,getTaskRiskAssessmentAction} = GetTaskRiskAssessmentByTaskIdService();


    const [riskLevel, setRiskLevel] = useState<number|null>(null);
    const getDescription = ():string => {

            if (riskLevel != null){
                if(riskLevel <= 4){
                    return 'TRIVIAL';
                }
                if(riskLevel >= 5 && riskLevel <= 8){
                    return 'TOLERABLE';
                }
                if(riskLevel >= 9 && riskLevel <= 16){
                    return 'MODERADO';
                }
                if(riskLevel >= 17 && riskLevel <= 24){
                    return 'IMPORTANTE';
                }
                if(riskLevel >= 25 && riskLevel <= 36){
                    return 'INTORELABLE';
                }
                return 'PENDIENTE DE EVALUAR';
            }else{
                return 'PENDIENTE DE EVALUAR';
            }
    }

    const getDescriptionTagClass = ():string => {

        if (riskLevel != null){
            if(riskLevel <= 4){
                return 'bg-success';
            }
            if(riskLevel >= 5 && riskLevel <= 8){
                return 'bg-info';
            }
            if(riskLevel >= 9 && riskLevel <= 16){
                return 'bg-warning';
            }
            if(riskLevel >= 17 && riskLevel <= 24){
                return 'bg-danger';
            }
            if(riskLevel >= 25 && riskLevel <= 36){
                return 'bg-dark';
            }
            return 'bg-light';
        }else{
            return 'bg-light';
        }
    }

    const [peopleExposed, setPeopleExposed] = useState<number>(0);
    const handlePeopleExposedChange = (event:SyntheticEvent)=>{
        // @ts-ignore
        const valueIndex = event.nativeEvent.target.value
        setPeopleExposed(parseInt(valueIndex));
    }

    const [procedure, setProcedure] = useState<number>(0);
    const handleProcedureChange = (event:SyntheticEvent)=>{
        // @ts-ignore
        const valueIndex = event.nativeEvent.target.value
        setProcedure(parseInt(valueIndex));

    }

    const [training, setTraining] = useState<number>(0);
    const handleTrainingChange = (event:SyntheticEvent)=>{
        // @ts-ignore
        const valueIndex = event.nativeEvent.target.value
        setTraining(parseInt(valueIndex));
    }

    const [exposure, setExposure] = useState<number>(0);
    const handleExposureChange = (event:SyntheticEvent)=>{
        // @ts-ignore
        const valueIndex = event.nativeEvent.target.value
        setExposure(parseInt(valueIndex));
    }

    const [severity, setSeverity] = useState<number>(0);
    const handleSeverityChange = (event:SyntheticEvent)=>{
        // @ts-ignore
        const valueIndex = event.nativeEvent.target.value
        setSeverity(parseInt(valueIndex));
    }


    const [disableCalculateButton, setDisableCalculateButton] = useState<boolean>(true);

    useEffect(()=>{
        handleDisableCalculate();

    },[severity,peopleExposed,procedure,training,exposure])
    const handleDisableCalculate = () => {
        if( severity == 0 ||
            peopleExposed == 0 ||
            procedure == 0 ||
            training == 0 ||
            exposure == 0
        ){
            setDisableCalculateButton(true);
            setDisableSaveButton(true);
        }else{
            setDisableCalculateButton(false);
            if(riskLevel != null) {
                setDisableSaveButton(false);
            }
        }
    }

    const handleCalculateRiskLevel = () => {
        const probabilityIndex:number = (+procedure + +peopleExposed + +training + +exposure)
        const level:number = +severity*probabilityIndex;
        setRiskLevel(level);
        setDisableSaveButton(false);
    }

    const [disableSaveButton, setDisableSaveButton] = useState<boolean>(true);

    const handleSaveRiskLevel = async () => {
        const requestData = {
            severityIndex: severity,
            peopleExposedIndex: peopleExposed,
            procedureIndex: procedure,
            trainingIndex: training,
            exposureIndex: exposure
        }

        const url = `/task-risk/${taskRiskId}/calculate-assessment`;
        try {
            await preventoolApi.put(url,requestData);
            toast.info(MessagesHttpResponse.TaskRiskAssessmentCalculated);
        }catch (error){
            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;
            if( status === 404 && data.class.includes('TaskRiskNotFoundException') )
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

    useEffect(()=>{
        appLoading();
        getTaskRiskAssessmentAction(taskRiskId).then(appLoaded);
    },[]);

    useEffect(()=>{
        if(taskRiskAssessment == null){
            setRiskLevel(null);
            setPeopleExposed(0);
            setProcedure(0);
            setTraining(0);
            setExposure(0);
            setSeverity(0);
        }else{
            setRiskLevel(taskRiskAssessment.riskLevelIndex);
            setSeverity(taskRiskAssessment.severityIndex);
            setPeopleExposed(taskRiskAssessment.peopleExposedIndex);
            setProcedure(taskRiskAssessment.procedureIndex);
            setTraining(taskRiskAssessment.trainingIndex);
            setExposure(taskRiskAssessment.exposureIndex);
        }

    },[taskRiskAssessment])

    return(
        <>
            <Row className="justify-content-center">
                <CardTitle className="text-center mt-4">NIVEL DE RIESGO</CardTitle>
                <Col sm={4}>
                    <div className="mb-3 row">
                        <div className="text-center" style={{fontSize:20}}>
                            <span className={"badge rounded-pill p-2 d-block " + getDescriptionTagClass()}>{getDescription()}</span>
                        </div>
                    </div>
                </Col>

            </Row>

            <Row>
                <CardTitle className="text-center mt-4">PROBABILIDAD</CardTitle>
                <Col sm={6}  >
                        <div className="mb-3 row">
                            <div className="text-center">
                                <label className="col-form-label">Personas expuestas</label>
                            </div>

                            <div className="">
                                <select className="form-select"
                                        value={peopleExposed}
                                        onChange={handlePeopleExposedChange}
                                >
                                    <option value='0'>Seleccionar</option>
                                    <option value='1'>De 1 a 3</option>
                                    <option value='2'>De 4 a 12</option>
                                    <option value='3'>Más de 12</option>

                                </select>
                            </div>
                        </div>
                </Col>

                <Col sm={6}  >
                    <div className="mb-3 row">
                        <div className="text-center">
                            <label className="col-form-label">Procedimientos existentes</label>
                        </div>

                        <div className="">
                            <select className="form-select"
                                    value={procedure}
                                    onChange={handleProcedureChange}
                            >
                                <option value='0'>Seleccionar</option>
                                <option value='1'>Existen, son satisfactorios y suficientes</option>
                                <option value='2'>Existen, parcialmente y no son satisfactorios o suficientes</option>
                                <option value='3'>No existen</option>

                            </select>
                        </div>
                    </div>
                </Col>

                <Col sm={6}  >
                    <div className="mb-3 row">
                        <div className="text-center">
                            <label className="col-form-label">Capacitación</label>
                        </div>

                        <div className="">
                            <select className="form-select"
                                    value={training}
                                    onChange={handleTrainingChange}
                            >
                                <option value='0'>Seleccionar</option>
                                <option value='1'>Personal entrenado. Conoce el peligro y lo previene</option>
                                <option value='2'>Personal parcialmente  entrenado. Conoce el peligro, pero no toma acciones de control</option>
                                <option value='3'>Personal no entrenado. No conoce el peligro, no toma acciones de control</option>

                            </select>
                        </div>
                    </div>
                </Col>

                <Col sm={6}  >
                    <div className="mb-3 row">
                        <div className="text-center">
                            <label className="col-form-label">Exposición al riesgo</label>
                        </div>

                        <div className="">
                            <select className="form-select"
                                    value={exposure}
                                    onChange={handleExposureChange}
                            >
                                <option value='0'>Seleccionar</option>
                                <option value='1'>Al menos una vez al año (S) / Esporádicamente (SO)</option>
                                <option value='2'>Al menos una vez al mes (S) / Eventualmente (SO)</option>
                                <option value='3'>Al menos una vez al día (S) / Permanentemente (SO)</option>

                            </select>
                        </div>
                    </div>
                </Col>

            </Row>


            <Row className="justify-content-center">
                <CardTitle className="text-center mt-4">CONSECUENCIAS</CardTitle>
                <Col sm={8}>
                    <div className="mb-3 row">
                        <div className="text-center">
                            <label className="col-form-label">Severidad</label>
                        </div>

                        <div>
                            <select className="form-select"
                                    value={severity}
                                    onChange={handleSeverityChange}
                            >
                                <option value='0'>Seleccionar</option>
                                <option value='1'>Lesión sin incapacidad (S) / Disconfort/Incomodidad (SO)</option>
                                <option value='2'>Lesión con incapacidad temporal (S) / Daño a la salud reversible (SO)</option>
                                <option value='3'>Lesión con incapacidad permanente (S) / Daño a la salud irreversible (SO)</option>

                            </select>
                        </div>
                    </div>
                </Col>

            </Row>

            <Row>

                <Col sm={12}>
                    <div className="mb-3 d-flex justify-content-center">
                       <button
                           className={`btn btn-primary btn-rounded text-center px-4 `}
                           disabled={disableCalculateButton}
                           onClick={handleCalculateRiskLevel}
                       >Calcular</button>
                    </div>
                </Col>

            </Row>

            <Row>
                <Col sm={12}>
                    <div className="mb-3 d-flex justify-content-center">
                        <button
                            className={`btn btn-primary btn-rounded text-center px-4 `}
                            disabled={disableSaveButton}
                            onClick={handleSaveRiskLevel}
                        >Guardar evaluación</button>
                    </div>
                </Col>
            </Row>

        </>
    )

}