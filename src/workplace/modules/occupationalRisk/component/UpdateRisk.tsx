import {useUiStore} from "../../../../store/ui/useUiStore";
import {GetTaskRiskByIdService} from "../service/getTaskRiskById/GetTaskRiskByIdService";
import React, {useEffect, useState} from "react";
import {TaskRiskResponse} from "../service/getTaskRiskById/TaskRiskResponse";
import {EditTaskRiskForm} from "../forms/EditTaskRiskForm";
import {useFormik} from "formik";
import {CreateProcessForm} from "../../processModule/interface/CreateProcessForm";
import * as Yup from "yup";
import {MesseagesFormValidations} from "../../../../admin/shared/utils/MesseagesFormValidations";
import {Card, CardText, CardTitle, Col, Form, Input, Label, Row} from "reactstrap";
import {Editor} from "@tinymce/tinymce-react";
import {TaskRiskStatusMessages} from "../utils/TaskRiskStatusMessages";
import preventoolApi from "../../../../shared/api/preventool/preventoolApi";
import {AxiosError, AxiosResponse} from "axios/index";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../admin/shared/utils/MessagesHttpResponse";

interface props{
    taskRiskId:string
}
export const UpdateRisk = (
    {taskRiskId}:props
) => {

    const {taskRisk,getTaskRiskAction} = GetTaskRiskByIdService();

    // const [observationsState, setObservationsState] = useState<any>(taskRisk.observation);

    const {appLoading,appLoaded} = useUiStore();

    useEffect(()=>{
        if(taskRiskId){
            appLoading()
            Promise.all([
                getTaskRiskAction(taskRiskId)
            ]).then(appLoaded);
        }
    },[]);

    const handleObservationsChange = (event:any)=>{
        const val = event.target.value;
        formik.setFieldValue('observations',val)
        formik.setFieldTouched('observations');
    }

    const handleLegalRequirementChange = (event:any)=>{
        const val = event.target.value;
        formik.setFieldValue('legalRequirement',val)
        formik.setFieldTouched('legalRequirement');
    }

    const handleHazardDescriptionChange = (event:any)=>{
        const val = event.target.value;
        formik.setFieldValue('hazardDescription',val)
        formik.setFieldTouched('hazardDescription');
    }

    const editForm: EditTaskRiskForm ={
        name: taskRisk?.name || '',
        observations: taskRisk?.observations || '',
        legalRequirement: taskRisk?.legalRequirement || '',
        hazardName: taskRisk?.hazardName || '',
        hazardDescription: taskRisk?.hazardDescription || ''
    };

    const formik = useFormik({
        enableReinitialize:true,
        initialValues:editForm,

        onSubmit:async (value:EditTaskRiskForm) => {
           appLoading();
           await updateTaskRiskRequest(taskRiskId,value);
           appLoaded();
        },
        validationSchema: Yup.object({
            name:Yup.string()
                .required(MesseagesFormValidations.Required)
                .test(
                    'len',
                    'Máximo 100 caracteres',
                    (val) => {
                        if (val == undefined) {
                            return true;
                        }
                        return  (val.length <= 100)
                    }
                ),
            observations:Yup.string().nullable()
                .test(
                    'len',
                    'Máximo 1000 caracteres',
                    (val) => {
                        if (val == undefined) {
                            return true;
                        }
                        return  (val.length <= 1000)
                    }
                ),
            legalRequirement:Yup.string().nullable()
                .test(
                    'len',
                    'Máximo 300 caracteres',
                    (val) => {
                        if (val == undefined) {
                            return true;
                        }
                        return  (val.length <= 300)
                    }
                ),
            hazardName:Yup.string()
                .required(MesseagesFormValidations.Required)
                .test(
                    'len',
                    'Máximo 50 caracteres',
                    (val) => {
                        if (val == undefined) {
                            return true;
                        }
                        return  (val.length <= 50)
                    }
                ),
            hazardDescription:Yup.string().nullable()
                .test(
                    'len',
                    'Máximo 300 caracteres',
                    (val) => {
                        if (val == undefined) {
                            return true;
                        }
                        return  (val.length <= 300)
                    }
                ),

        })
    });

    const updateTaskRiskRequest = async (taskRiskId:string, formData:EditTaskRiskForm): Promise<void> => {

        try {
            await preventoolApi.put(`/task-risk/${taskRiskId}`, formData);
            toast.info(MessagesHttpResponse.SuccessEditResponse);

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





    // @ts-ignore
    return(
        <>


            <Row className="justify-content-center">
                {/*<CardTitle className="text-center mt-4">ESTADO DEVALUACIÓN</CardTitle>*/}
                <Col sm={4}>
                    <div className="mb-3 row">
                        <div className="text-center" style={{fontSize:20}}>
                            {taskRisk?.status &&
                                <span className={"badge rounded-pill bg-light p-2 d-block"}>{TaskRiskStatusMessages(taskRisk.status)}</span>
                            }

                        </div>
                    </div>
                </Col>

            </Row>

            <Form
                onSubmit={formik.handleSubmit}
            >

                <Card body className={"mt-4 border border-2"}>
                    <CardTitle className="mt-4">Datos del Riesgo</CardTitle>

                        <div className="mb-3 w-50">
                            <Label htmlFor="name">Nombre</Label>
                            <Input
                                type="text"
                                id="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={ formik.handleBlur }
                                className={
                                    "form-control" +
                                    (formik.errors.name && formik.touched.name
                                        ? " is-invalid"
                                        : "")
                                }
                            />
                            <div className="invalid-feedback">
                                {formik.errors.name}
                            </div>
                        </div>



                        <div className="mb-3 w-50">
                            <Label htmlFor="observations">Observaciones</Label>
                            <Input
                                type="textarea"
                                id="observations"
                                rows="4"
                                placeholder="Máximo 300 caracteres..."
                                value={formik.values.observations || ''}
                                onChange={handleObservationsChange}
                                onBlur={ formik.handleBlur }
                                className={
                                    "form-control" +
                                    (formik.errors.observations && formik.touched.observations
                                        ? " is-invalid"
                                        : "")
                                }
                            />

                            <div className="invalid-feedback">
                                {formik.errors.observations}
                            </div>
                        </div>

                    <div className="mb-3 w-50">
                        <Label htmlFor="legalRequirement">Requerimiento Legal</Label>
                        <Input
                            type="textarea"
                            id="legalRequirement"
                            rows="4"
                            placeholder="Máximo 300 caracteres..."
                            value={formik.values.legalRequirement || ''}
                            onChange={handleLegalRequirementChange}
                            onBlur={ formik.handleBlur }
                            className={
                                "form-control" +
                                (formik.errors.legalRequirement && formik.touched.legalRequirement
                                    ? " is-invalid"
                                    : "")
                            }
                        />

                        <div className="invalid-feedback">
                            {formik.errors.legalRequirement}
                        </div>
                    </div>

                </Card>


                <Card body className={"mt-4 border border-2"}>
                    <CardTitle className="mt-4">Datos del Peligro</CardTitle>

                    <div className="mb-3 w-50">
                        <Label htmlFor="hazardName">Nombre</Label>
                        <Input
                            type="text"
                            id="hazardName"
                            value={formik.values.hazardName}
                            onChange={formik.handleChange}
                            onBlur={ formik.handleBlur }
                            className={
                                "form-control" +
                                (formik.errors.hazardName && formik.touched.hazardName
                                    ? " is-invalid"
                                    : "")
                            }
                        />
                        <div className="invalid-feedback">
                            {formik.errors.hazardName}
                        </div>
                    </div>

                    <div className="mb-3 w-50">
                        <Label htmlFor="hazardDescription">Descripción</Label>
                        <Input
                            type="text"
                            id="hazardDescription"
                            value={formik.values.hazardDescription || ''}
                            onChange={handleHazardDescriptionChange}
                            onBlur={ formik.handleBlur }
                            className={
                                "form-control" +
                                (formik.errors.hazardDescription && formik.touched.hazardDescription
                                    ? " is-invalid"
                                    : "")
                            }
                        />
                        <div className="invalid-feedback">
                            {formik.errors.hazardDescription}
                        </div>
                    </div>

                </Card>

                <div>
                    <button type="submit" className="btn btn-primary w-md">
                        Guardar
                    </button>
                </div>
            </Form>
        </>
    )
}