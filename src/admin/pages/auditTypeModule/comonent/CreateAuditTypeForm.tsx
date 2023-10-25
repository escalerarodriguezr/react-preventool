import {SessionState} from "../../../../store/session/sessionSlice";
import {useUiStore} from "../../../../store/ui/useUiStore";
import {CreateAuditTypeFormInterface} from "../interface/CreateAuditTypeFormInterface";
import {useFormik} from "formik";
import * as Yup from "yup";
import {MesseagesFormValidations} from "../../../shared/utils/MesseagesFormValidations";
import {Form, Input, Label} from "reactstrap";
import {AxiosError, AxiosResponse} from "axios";
import preventoolApi from "../../../../shared/api/preventool/preventoolApi";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../shared/utils/MessagesHttpResponse";

interface CreateAuditTypeFormProps {
    sessionState: SessionState

}
export const CreateAuditTypeForm = ({sessionState}:CreateAuditTypeFormProps) => {

    const {appLoading, appLoaded} = useUiStore();


    const createAuditTypeForm: CreateAuditTypeFormInterface = {
        name: '',
        description: ''
    }

    const formik = useFormik({
        initialValues: createAuditTypeForm,
        onSubmit: async (values:CreateAuditTypeFormInterface) => {
            appLoading();
            await createAuditTypeRequest(values);
            appLoaded();
        },

        validationSchema: Yup.object({
            name: Yup.string()
                .required(MesseagesFormValidations.Required),
        })
    });


    const createAuditTypeRequest = async (formData:CreateAuditTypeFormInterface): Promise<void> => {

        try {

            const sendData:any   = {
                name: formData.name,
            }

            if(formData.description?.length){
                sendData.description = formData.description
            }

            const response:AxiosResponse = await preventoolApi.post(
                '/audit-type',
                sendData
            );

            toast.success(MessagesHttpResponse.SuccessCreatedResponse);

        }catch (error){

            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;

            if( status === 409 && data.class.includes('AuditTypeAlreadyExistsException') )
            {
                toast.info(MessagesHttpResponse.AuditTypeAlreadyExistsException);
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
                        placeholder="Nombre"
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
                    <Label htmlFor="description">Descripción</Label>
                    <Input
                        type="text"
                        id="description"
                        placeholder="Descripción"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={ formik.handleBlur }
                        className={
                            "form-control" +
                            (formik.errors.description && formik.touched.description
                                ? " is-invalid"
                                : "")
                        }
                    />
                    <div className="invalid-feedback">
                        {formik.errors.description}
                    </div>
                </div>

                <div>
                    <button type="submit" className="btn btn-primary w-md">
                        Crear
                    </button>
                </div>
            </Form>
        </>
    )

}