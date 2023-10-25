import {SessionState} from "../../../../store/session/sessionSlice";
import {WorkplaceSessionState} from "../../../../store/workplace/workplaceSlice";
import {useUiStore} from "../../../../store/ui/useUiStore";
import {GetWorkplaceProcessByIdService} from "../service/getWorkplaceProcessByIdService/GetWorkplaceProcessByIdService";
import React, {useEffect, useRef, useState} from "react";
import {EditProcessForm} from "../interface/EditProcessForm";
import {useFormik} from "formik";
import {CreateProcessForm} from "../interface/CreateProcessForm";
import * as Yup from "yup";
import {MesseagesFormValidations} from "../../../../admin/shared/utils/MesseagesFormValidations";
import {Form, Input, Label} from "reactstrap";
import {Editor} from "@tinymce/tinymce-react";
import preventoolApi from "../../../../shared/api/preventool/preventoolApi";
import {AxiosError, AxiosResponse} from "axios";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../admin/shared/utils/MessagesHttpResponse";

interface EditProcessGeneralDataProps{
    session:SessionState;
    workplace:WorkplaceSessionState;
    id:string;
}

export const EditProcessGeneralData = (
    {session,workplace,id}: EditProcessGeneralDataProps
) => {

    const {appLoading,appLoaded} = useUiStore();
    const {getWorkplaceProcessByIdAction,process} = GetWorkplaceProcessByIdService();

    const editorRef = useRef<any>(null);

    const [description, setDescription] = useState<string|undefined>(undefined);


    useEffect(()=>{
        if(id && session.actionAdmin?.id && workplace.actionWorkplace?.id ){
            appLoading();
            getWorkplaceProcessByIdAction(
                workplace.actionWorkplace.id,
                id
            ).then(appLoaded);
        }

    },[]);

    useEffect(()=>{
        if(process && process.description){
            setDescription(process.description);
        }
    },[process])

    const editProcessForm:EditProcessForm = {
        name: process?.name ? process.name : '',
        description: process?.description ? process.description : ''
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues:editProcessForm,
        onSubmit:async (value:CreateProcessForm) => {
            appLoading();
            await editProcessRequest(value);
            appLoaded();
        },
        validationSchema: Yup.object({
            name:Yup.string().required(MesseagesFormValidations.Required)
        })
    });

    const processDescription = () => {
        if (editorRef.current) {
            // @ts-ignore
            const value = editorRef.current.getContent().length > 0 ? editorRef.current.getContent() : null;
            formik.setFieldValue('description',value);
            formik.setFieldTouched('description');
        }
    };

    const editProcessRequest = async (process:EditProcessForm): Promise<void> => {

        try {
            await preventoolApi.put(
                `/workplace/${workplace.actionWorkplace?.id}/process/${id}`,
                process
            );
            toast.info(MessagesHttpResponse.SuccessEditResponse);

        }catch (error){

            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;

            if( status === 409 && data.class.includes('ProcessAlreadyExistsException') )
            {
                toast.info(MessagesHttpResponse.ProcessAlreadyExistsException);
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
                    <Label htmlFor="name">Descripción del proceso</Label>

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
                        Guardar
                    </button>
                </div>
            </Form>
        </>
    )



}