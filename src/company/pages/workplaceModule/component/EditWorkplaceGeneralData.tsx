import {SessionState} from "../../../../store/session/sessionSlice";
import {CompanySessionState} from "../../../../store/compnay/companySlice";
import {
    UseGetCompanyByIdService
} from "../../../../admin/pages/companyModule/hook/getCompanyByIdService/UseGetCompanyByIdService";
import {UseGetWorkplaceByIdService} from "../hook/getWorkplaceByIdService/UseGetWorkplaceByIdService";
import {useUiStore} from "../../../../store/ui/useUiStore";
import {useEffect} from "react";
import {CreateWorkplaceFormInterface} from "../interface/CreateWorkplaceFormInterface";
import {EditWorkplaceFormInterface} from "../interface/EditWorkplaceFormInterface";
import {AxiosError, AxiosResponse} from "axios/index";
import preventoolApi from "../../../../shared/api/preventool/preventoolApi";
import {CreateSuccessResponse} from "../../../../admin/shared/interface/CreateSuccessResponse";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../admin/shared/utils/MessagesHttpResponse";
import {useFormik} from "formik";
import * as Yup from "yup";
import {MesseagesFormValidations} from "../../../../admin/shared/utils/MesseagesFormValidations";
import {Form, Input, Label} from "reactstrap";

interface EditWorkplaceGeneralDataProps {
    id:string|undefined,
    sessionState: SessionState|undefined,
    companySessionState: CompanySessionState|undefined
}
export const EditWorkplaceGeneralData = (
    {id,sessionState,companySessionState}:EditWorkplaceGeneralDataProps
) => {

    const {
        appLoading,
        appLoaded,
        loading
    } = useUiStore()

   const {
       workplace,
       getWorkplaceByIdAction
   } = UseGetWorkplaceByIdService();

    useEffect(()=>{

        if(id && sessionState?.actionAdmin && companySessionState?.actionCompany?.id){
            appLoading();
            getWorkplaceByIdAction(
                companySessionState.actionCompany.id,
                id
            ).then(appLoaded);
        }

    },[companySessionState]);


    const editWorkplaceForm:EditWorkplaceFormInterface={
        name: workplace?.name ? workplace.name : '',
        contactPhone: workplace?.contactPhone ? workplace.contactPhone : '',
        address: workplace?.address ? workplace.address : '',
        numberOfWorkers: workplace?.numberOfWorkers ? workplace.numberOfWorkers : 0

    }

    const updateWorkplaceRequest = async (workplace:EditWorkplaceFormInterface ) => {

        try {
            const response:AxiosResponse = await preventoolApi.put(
                '/company/'+companySessionState?.actionCompany?.id +'/workplace/' + id,
                workplace
            );
            toast.success(MessagesHttpResponse.SuccessEditResponse);
            return true;

        }catch (error){

            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;

            if( status === 409 && data.class.includes('WorkplaceAlreadyExistsException') )
            {
                toast.info(MessagesHttpResponse.WorkplaceAlreadyExistsException);
            }else if( status === 409 && data.class.includes('WorkplaceNotBelongToCompanyException') ) {
                toast.info(MessagesHttpResponse.ActionNotAllowedException);
            }

            else if( status === 409 && data.class.includes('ActionNotAllowedException') ) {
                toast.info(MessagesHttpResponse.ActionNotAllowedException);
            }else if( status === 403 && data.class.includes('AccessDeniedException') ){
                toast.info(MessagesHttpResponse.AccessDeniedException);

            }else{
                toast.error(MessagesHttpResponse.InternalError);
            }

            return false;
        }

    }

    const formik = useFormik(
        {
        enableReinitialize: true,
        initialValues: editWorkplaceForm,
        onSubmit: async (values:EditWorkplaceFormInterface) => {
            appLoading();
            await updateWorkplaceRequest(values);
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