import {SessionState} from "../../../../store/session/sessionSlice";
import {Col, Form, Input, Label, Row} from "reactstrap";
import Select from "react-select";
import {useUiStore} from "../../../../store/ui/useUiStore";
import {CreateCompanyFormInterface} from "../interface/CreateCompanyFormInterface";
import {useFormik} from "formik";
import * as Yup from "yup";
import {MesseagesFormValidations} from "../../../shared/utils/MesseagesFormValidations";
import {AxiosError, AxiosResponse} from "axios";
import preventoolApi from "../../../../shared/api/preventool/preventoolApi";
import {CreateSuccessResponse} from "../../../shared/interface/CreateSuccessResponse";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../shared/utils/MessagesHttpResponse";

interface CreateCompanyGeneralData{
    sessionState:SessionState|undefined,
}

export const CreateCompanyGeneralData = ({sessionState}:CreateCompanyGeneralData) => {

    const {
        appLoading,
        appLoaded
    } = useUiStore();


    const createCompanyForm:CreateCompanyFormInterface={
        name: '',
        legalName: '',
        legalDocument: '',
        address: '',
        sector: ''
    }

    const createCompanyRequest = async (company:CreateCompanyFormInterface ) => {

        try {
            const response:AxiosResponse = await preventoolApi.post('/company', company);
            const data = response.data as CreateSuccessResponse;
            toast.success(MessagesHttpResponse.SuccessCreatedResponse);
            return data.uuid;

        }catch (error){

            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;

            if( status === 409 && data.class.includes('CompanyAlreadyExistsException') )
            {
                toast.info(MessagesHttpResponse.CompanyAlreadyExistsException);
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

    const formik = useFormik({
        initialValues: createCompanyForm,
        onSubmit: async (values:CreateCompanyFormInterface) => {
            appLoading();
            await createCompanyRequest(values);
            appLoaded();
        },

        validationSchema: Yup.object({
            name: Yup.string()
                .required(MesseagesFormValidations.Required),
            legalName: Yup.string()
                .required(MesseagesFormValidations.Required),
            legalDocument: Yup.string()
                .required(MesseagesFormValidations.Required),
            address: Yup.string()
                .required(MesseagesFormValidations.Required),
            sector: Yup.string()
                .required(MesseagesFormValidations.Required),

        })
    });




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
                    <Label htmlFor="lastName">Razón Social</Label>
                    <Input
                        type="text"
                        id="legalName"
                        placeholder="Razoń social"
                        value={formik.values.legalName}
                        onChange={formik.handleChange}
                        onBlur={ formik.handleBlur }
                        className={
                            "form-control" +
                            (formik.errors.legalName && formik.touched.legalName
                                ? " is-invalid"
                                : "")
                        }
                    />
                    <div className="invalid-feedback">
                        {formik.errors.legalName}
                    </div>
                </div>

                <div className="mb-3 w-50">
                    <Label htmlFor="lastDocument">RUC</Label>
                    <Input
                        type="text"
                        id="legalDocument"
                        placeholder="RUC"
                        value={formik.values.legalDocument}
                        onChange={formik.handleChange}
                        onBlur={ formik.handleBlur }
                        className={
                            "form-control" +
                            (formik.errors.legalDocument && formik.touched.legalDocument
                                ? " is-invalid"
                                : "")
                        }
                    />
                    <div className="invalid-feedback">
                        {formik.errors.legalDocument}
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
                    <Label htmlFor="sector">Actividad</Label>
                    <Input
                        type="text"
                        id="sector"
                        placeholder="Actividad"
                        value={formik.values.sector}
                        onChange={formik.handleChange}
                        onBlur={ formik.handleBlur }
                        className={
                            "form-control" +
                            (formik.errors.sector && formik.touched.sector
                                ? " is-invalid"
                                : "")
                        }
                    />
                    <div className="invalid-feedback">
                        {formik.errors.sector}
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