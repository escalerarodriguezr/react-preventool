import {useUiStore} from "../../../../../../store/ui/useUiStore";
import {useSessionStore} from "../../../../../../store/session/useSessionStore";
import React, {useEffect, useRef, useState} from "react";
import {CreateProcessActivityForm} from "../../../interface/CreateProcessActivityForm";
import {useFormik} from "formik";
import * as Yup from "yup";
import {MessagesHttpResponse} from "../../../../../../admin/shared/utils/MessagesHttpResponse";
import {MesseagesFormValidations} from "../../../../../../admin/shared/utils/MesseagesFormValidations";
import {Form, Input, Label} from "reactstrap";
import {Editor} from "@tinymce/tinymce-react";
import {CreateActivityTaskForm} from "../../../interface/CreateActivityTaskForm";
import preventoolApi from "../../../../../../shared/api/preventool/preventoolApi";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {AxiosError, AxiosResponse} from "axios";

interface CreateActivityTaskGeneralDataProps{
    activityId:string
}
export const CreateActivityTaskGeneralData = (
    {activityId}:CreateActivityTaskGeneralDataProps
) => {
    const navigate = useNavigate();

    const editorRef = useRef<any>(null);

    const {appLoading,appLoaded} = useUiStore();
    const {getSessionAction,sessionState} = useSessionStore();

    const [description, setDescription] = useState<string|undefined>(undefined);

    useEffect(()=>{
        appLoading();
        getSessionAction().then(appLoaded);
    },[]);

    const CreateActivityTaskForm:CreateProcessActivityForm = {
        name:'',
        description:description
    }

    const processDescription = () => {
        if (editorRef.current) {
            // @ts-ignore
            const value = editorRef.current.getContent().length > 0 ? editorRef.current.getContent() : null;
            formik.setFieldValue('description',value);
            formik.setFieldTouched('description');
        }
    };

    const formik = useFormik({
        initialValues:CreateActivityTaskForm,
        onSubmit: async (task:CreateProcessActivityForm):Promise<void> =>{
            appLoading();
            await createActivityTaskRequest(task);
            appLoaded();
        },
        validationSchema: Yup.object({
            name:Yup.string().required(MesseagesFormValidations.Required)

        })
    });

    const createActivityTaskRequest = async (task:CreateActivityTaskForm):Promise<void> => {

        try {
            await preventoolApi.post(
                `/activity/${activityId}/task`,
                task
            );
            toast.info(MessagesHttpResponse.SuccessCreatedResponse);
            setTimeout(()=> navigate('/centro-trabajo/actividad/' + activityId),800);

        }catch (error){
            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;

            if( status === 409 && data.class.includes('ProcessActivityTaskAlreadyExistsException') )
            {
                toast.info(MessagesHttpResponse.ProcessActivityAlreadyExistsException);
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
            <Form
                onSubmit={formik.handleSubmit}
            >
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

                <div className="mb-3">
                    <Label htmlFor="name">Descripción</Label>
                    <Editor
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue={description}
                        init={{
                            height: 300,
                            menubar: true,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code table help'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        onChange={processDescription}
                    />
                </div>


                <div>
                    <button type="submit" className="btn btn-primary w-md">
                        Registrar
                    </button>
                </div>
            </Form>

        </>
    )
}