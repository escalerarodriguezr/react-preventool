import {SessionState} from "../../../../store/session/sessionSlice";
import {useUiStore} from "../../../../store/ui/useUiStore";
import {UseEditAdminService} from "../hook/editAdminService/UseEditAdminService";
import {useEffect, useState} from "react";
import {AdminRoles} from "../../../shared/model/Admin/AdminRoles";
import {EditAdminFormInterface} from "../interface/EditAdminFormInterface";
import {useFormik} from "formik";
import * as Yup from "yup";
import {MesseagesFormValidations} from "../../../shared/utils/MesseagesFormValidations";
import {AxiosError, AxiosResponse} from "axios";
import preventoolApi from "../../../../shared/api/preventool/preventoolApi";
import {CreateSuccessResponse} from "../../../shared/interface/CreateSuccessResponse";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../shared/utils/MessagesHttpResponse";
import {Card, CardBody, CardTitle, Col, Container, Form, Input, Label, Row} from "reactstrap";
import Select from "react-select";
import {EditAdminPasswordFormInterface} from "../interface/EditAdminPasswordFormInterface";

interface EditAdminPasswordProps{
    id:string|undefined,
    sessionState:SessionState|undefined,
    fromProfile:boolean
}
export const EditAdminPassword = ({id, sessionState, fromProfile}:EditAdminPasswordProps) => {


    const {
        appLoading,
        appLoaded
    } = useUiStore();

    const {admin, getAdminByIdAction} = UseEditAdminService();

    useEffect(()=>{
        if( id && sessionState){
            appLoading();
            getAdminByIdAction(id).then(()=>appLoaded());
        }
    },[]);


    const editAdminPasswordForm: EditAdminPasswordFormInterface = {
        currentPassword: '',
        password: '',
        confirmPassword: ''
    }


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: editAdminPasswordForm,
        onSubmit: async (values:EditAdminPasswordFormInterface) => {
            appLoading();
            await editAdminPasswordRequest(values);
            appLoaded()
        },

        validationSchema: Yup.object({
            currentPassword: Yup.string()
                .required(MesseagesFormValidations.Required),
            password: Yup.string()
                .required(MesseagesFormValidations.Required),
            confirmPassword: Yup.string()
                .required(MesseagesFormValidations.Required)
                .oneOf([Yup.ref('password'),null], MesseagesFormValidations.NotMatchConfirmPassword),
        })
    });


    const editAdminPasswordRequest = async (adminData:EditAdminPasswordFormInterface ) => {

        try {
            const response:AxiosResponse = await preventoolApi.put('/admin/'+id+'/password', adminData);
            const data = response.data as CreateSuccessResponse;
            toast.success(MessagesHttpResponse.SuccessEditResponse);
            return true;

        }catch (error){
            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;

            if( status === 409 &&
                data.class.includes('AdminInvalidCurrentPasswordException')
            )
            {
                toast.info(MessagesHttpResponse.AdminInvalidCurrentPasswordException);
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
                <Container fluid>
                    <Row >
                        <Col lg={6}>
                            <Card>
                                <CardBody>
                                    <Form
                                        onSubmit={formik.handleSubmit}
                                    >
                                        <Row>
                                            <Col lg={12}>
                                                <div className="mb-3">
                                                    <Label htmlFor="currentPassword">Introduce tu contraseña actual</Label>
                                                    <Input
                                                        type="password"
                                                        id="currentPassword"
                                                        value={formik.values.currentPassword}
                                                        onChange={formik.handleChange}
                                                        onBlur={ formik.handleBlur }
                                                        className={
                                                            "form-control" +
                                                            (formik.errors.currentPassword && formik.touched.currentPassword
                                                                ? " is-invalid"
                                                                : "")
                                                        }
                                                    />
                                                    <div className="invalid-feedback">
                                                        {formik.errors.currentPassword}
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <Label htmlFor="password">Nueva Contraseña</Label>
                                                    <Input
                                                        type="password"
                                                        id="password"
                                                        value={formik.values.password}
                                                        onChange={formik.handleChange}
                                                        onBlur={ formik.handleBlur }
                                                        className={
                                                            "form-control" +
                                                            (formik.errors.password && formik.touched.password
                                                                ? " is-invalid"
                                                                : "")
                                                        }
                                                    />
                                                    <div className="invalid-feedback">
                                                        {formik.errors.password}
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                                                    <Input
                                                        type="password"
                                                        id="confirmPassword"
                                                        value={formik.values.confirmPassword}
                                                        onChange={formik.handleChange}
                                                        onBlur={ formik.handleBlur }
                                                        className={
                                                            "form-control" +
                                                            (formik.errors.confirmPassword && formik.touched.confirmPassword
                                                                ? " is-invalid"
                                                                : "")
                                                        }
                                                    />
                                                    <div className="invalid-feedback">
                                                        {formik.errors.confirmPassword}
                                                    </div>
                                                </div>

                                            </Col>

                                        </Row>

                                        <div>
                                            <button type="submit" className="btn btn-primary w-md">
                                                Cambiar
                                            </button>
                                        </div>

                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
        </>
    )
}