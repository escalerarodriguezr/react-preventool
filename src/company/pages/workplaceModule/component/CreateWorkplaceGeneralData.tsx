import {SessionState} from "../../../../store/session/sessionSlice";
import {Col, Form, Input, Label, Row} from "reactstrap";
import {useUiStore} from "../../../../store/ui/useUiStore";
import {isInteger, useFormik} from "formik";
import * as Yup from "yup";
import {AxiosError, AxiosResponse} from "axios";
import {toast} from "react-toastify";
import {CompanySessionState} from "../../../../store/compnay/companySlice";
import {CreateWorkplaceFormInterface} from "../interface/CreateWorkplaceFormInterface";
import {MessagesHttpResponse} from "../../../../admin/shared/utils/MessagesHttpResponse";
import {MesseagesFormValidations} from "../../../../admin/shared/utils/MesseagesFormValidations";
import preventoolApi from "../../../../shared/api/preventool/preventoolApi";
import {CreateSuccessResponse} from "../../../../admin/shared/interface/CreateSuccessResponse";

interface CreateWorkplaceGeneralDataProps{
    sessionState:SessionState|undefined,
    companySessionState:CompanySessionState|undefined,
}

export const CreateWorkplaceGeneralData = ({sessionState, companySessionState}:CreateWorkplaceGeneralDataProps) => {

    const {
        appLoading,
        appLoaded
    } = useUiStore();


    const createWorkplaceForm:CreateWorkplaceFormInterface={
        name: '',
        contactPhone: '',
        address: '',
        numberOfWorkers: 0

    }

    const createWorkplaceRequest = async (workplace:CreateWorkplaceFormInterface ) => {

        try {
            const response:AxiosResponse = await preventoolApi.post(
                '/company/'+companySessionState?.actionCompany?.id +'/workplace',
                workplace);
            const data = response.data as CreateSuccessResponse;
            toast.success(MessagesHttpResponse.SuccessCreatedResponse);
            return data.uuid;

        }catch (error){

            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;

            if( status === 409 && data.class.includes('WorkplaceAlreadyExistsException') )
            {
                toast.info(MessagesHttpResponse.WorkplaceAlreadyExistsException);
            }else if( status === 409 && data.class.includes('ActionNotAllowedException') ) {
                toast.info(MessagesHttpResponse.ActionNotAllowedException);
            }else if( status === 403 && data.class.includes('AccessDeniedException') ){
                toast.info(MessagesHttpResponse.AccessDeniedException);

            }else{
                toast.error(MessagesHttpResponse.InternalError);
            }

            return false;
        }

    }

    // @ts-ignore
    // @ts-ignore
    const formik = useFormik({
        initialValues: createWorkplaceForm,
        onSubmit: async (values:CreateWorkplaceFormInterface) => {
            appLoading();
            await createWorkplaceRequest(values);
            appLoaded();
        },

        validationSchema: Yup.object({
            name: Yup.string()
                .required(MesseagesFormValidations.Required),
            contactPhone: Yup.string()
                .required(MesseagesFormValidations.Required),
            address: Yup.string()
                .required(MesseagesFormValidations.Required),
            numberOfWorkers: Yup.number().required(MesseagesFormValidations.Required)
                .test('positive', function (value) {
                    // @ts-ignore
                    if (value < 0) {
                        return this.createError({
                            path: this.path,
                            message: "Debe ser un número positivo",
                        });
                    }

                   return true;

                })
                .test('integer', function (value) {
                    if (!Number.isInteger(value)) {
                        return this.createError({
                            path: this.path,
                            message: "Debe ser un número entero",
                        });
                    }

                    return true;
                })

        })
    });




    // @ts-ignore
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
                    <Label htmlFor="contactPhone">Teléfono de contacto</Label>
                    <Input
                        type="text"
                        id="contactPhone"
                        placeholder="Teléfono de contacto"
                        value={formik.values.contactPhone}
                        onChange={formik.handleChange}
                        onBlur={ formik.handleBlur }
                        className={
                            "form-control" +
                            (formik.errors.contactPhone && formik.touched.contactPhone
                                ? " is-invalid"
                                : "")
                        }
                    />
                    <div className="invalid-feedback">
                        {formik.errors.contactPhone}
                    </div>
                </div>



                <div className="mb-3 w-100">
                    <Label htmlFor="address">Dirección Legal</Label>
                    <Input
                        type="text"
                        id="address"
                        placeholder="Dirección legal"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={ formik.handleBlur }
                        className={
                            "form-control" +
                            (formik.errors.address && formik.touched.address
                                ? " is-invalid"
                                : "")
                        }
                    />
                    <div className="invalid-feedback">
                        {formik.errors.address}
                    </div>
                </div>

                <div className="mb-3 w-100">
                    <Label htmlFor="numberOfWorkers">Número de trabajadores</Label>
                    <Input
                        type="number"
                        min="0"
                        step="1"
                        id="numberOfWorkers"
                        placeholder="1000"
                        value={formik.values.numberOfWorkers}
                        onChange={formik.handleChange}
                        onBlur={ formik.handleBlur }
                        className={
                            "form-control" +
                            (formik.errors.numberOfWorkers && formik.touched.numberOfWorkers
                                ? " is-invalid"
                                : "")
                        }
                    />
                    <div className="invalid-feedback">
                        {formik.errors.numberOfWorkers}
                    </div>
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