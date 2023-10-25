import {SessionState} from "../../../../store/session/sessionSlice";
import {useUiStore} from "../../../../store/ui/useUiStore";
import {useEffect} from "react";
import {UseGetCompanyByIdService} from "../hook/getCompanyByIdService/UseGetCompanyByIdService";
import {EditCompanyFormInterface} from "../interface/EditCompanyFormInterface";
import {useFormik} from "formik";
import * as Yup from "yup";
import {MesseagesFormValidations} from "../../../shared/utils/MesseagesFormValidations";
import {Form, Input, Label} from "reactstrap";
import {AxiosError, AxiosResponse} from "axios";
import preventoolApi from "../../../../shared/api/preventool/preventoolApi";
import {CreateSuccessResponse} from "../../../shared/interface/CreateSuccessResponse";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../shared/utils/MessagesHttpResponse";

interface EditCompanyGeneralDataProps{
    id:string|undefined;
    sessionState:SessionState|undefined
}
export const EditCompanyGeneralData = ({id,sessionState}:EditCompanyGeneralDataProps) => {

    const {
        appLoading,
        appLoaded
    } = useUiStore();

    const {company, getCompanyByIdAction} = UseGetCompanyByIdService();

    useEffect(()=>{
        if( id && sessionState){
            appLoading();
            getCompanyByIdAction(id).then(()=>appLoaded());
        }
    },[]);


    const editCompanyForm: EditCompanyFormInterface = {
        name: company?.name ? company.name : '',
        legalName: company?.legalName ? company.legalName : '',
        legalDocument: company?.legalDocument ? company.legalDocument : '',
        address: company?.address ? company.address : '',
        sector: company?.sector ? company.sector : '',
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: editCompanyForm,
        onSubmit: async (values:EditCompanyFormInterface) => {
            appLoading();
            await editCompanyRequest(values);
            appLoaded()
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


    const editCompanyRequest = async (companyData:EditCompanyFormInterface ) => {

        try {
            const response:AxiosResponse = await preventoolApi.put('/company/'+id, companyData);
            const data = response.data as CreateSuccessResponse;
            toast.success(MessagesHttpResponse.SuccessEditResponse);
            return true;

        }catch (error){

            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;

            if( status === 409 &&
                (data.class.includes('CompanyAlreadyExistsException'))
            )
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
                        Guardar
                    </button>
                </div>
            </Form>
        </>
    )
}