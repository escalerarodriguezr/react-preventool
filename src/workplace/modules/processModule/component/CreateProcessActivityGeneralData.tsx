import {SessionState} from "../../../../store/session/sessionSlice";
import {WorkplaceSessionState} from "../../../../store/workplace/workplaceSlice";
import {useUiStore} from "../../../../store/ui/useUiStore";
import {CreateProcessForm} from "../interface/CreateProcessForm";
import {useFormik} from "formik";
import * as Yup from "yup";
import {MesseagesFormValidations} from "../../../../admin/shared/utils/MesseagesFormValidations";
import {Form, Input, Label} from "reactstrap";
import {AxiosError, AxiosResponse} from "axios";
import preventoolApi from "../../../../shared/api/preventool/preventoolApi";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../admin/shared/utils/MessagesHttpResponse";

import React, {useRef, useState} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {CreateProcessActivityForm} from "../interface/CreateProcessActivityForm";
import {useNavigate} from "react-router-dom";


interface CreateProcessActivityGeneralDataProps{
    session: SessionState;
    workplace: WorkplaceSessionState,
    processId: string
}

export const CreateProcessActivityGeneralData = (
    {session,workplace,processId}:CreateProcessActivityGeneralDataProps
)=>{

    const navigate = useNavigate();

    const editorRef = useRef<any>(null);

    const [description, setDescription] = useState<string|undefined>(undefined);
    const {appLoading,appLoaded} = useUiStore();

    const createProcessActivityForm:CreateProcessActivityForm = {
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
        initialValues:createProcessActivityForm,
        onSubmit:async (value:CreateProcessForm) => {
            appLoading();
            await createProcessActivityRequest(value);
            appLoaded();
        },
        validationSchema: Yup.object({
            name:Yup.string().required(MesseagesFormValidations.Required)
        })
    })

    const createProcessActivityRequest = async (form:CreateProcessActivityForm):Promise<void> =>{

        try{
            const response:AxiosResponse = await preventoolApi.post(
                `/process/${processId}/activity`,
                form
            );
            toast.info(MessagesHttpResponse.SuccessCreatedResponse);
            setTimeout(()=> navigate('/centro-trabajo/proceso/' + processId),1000);

        }catch (error:any){
            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;

            if( status === 409 && data.class.includes('ProcessActivityAlreadyExistsException') )
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

    const handleNavigateToCreateProcessActivityPage = () => {
        if(processId){
            navigate('/centro-trabajo/proceso/'+processId);
        }
    }

    // @ts-ignore
    // @ts-ignore
    return(
        <>
            <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-primary"
                        onClick={handleNavigateToCreateProcessActivityPage}
                >
                    Volver al proceso
                </button>
            </div>

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