import {useSessionStore} from "../../../store/session/useSessionStore";
import {useEffect, useState} from "react";
import {Card, CardBody, CardTitle, Col, Container, Form, Input, Label, Row} from "reactstrap";
import Select from "react-select"
import {useFormik} from "formik";
import * as Yup from "yup";
import {CreateAdminFormInterface} from "./interface/CreateAdminFormInterface";
import {AdminRoles} from "../../shared/model/Admin/AdminRoles";
import {AxiosError, AxiosResponse} from "axios";
import preventoolApi from "../../../shared/api/preventool/preventoolApi";

import {useUiStore} from "../../../store/ui/useUiStore";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {CreateSuccessResponse} from "../../shared/interface/CreateSuccessResponse";
import {MessagesHttpResponse} from "../../shared/utils/MessagesHttpResponse";
import {MesseagesFormValidations} from "../../shared/utils/MesseagesFormValidations";


export const CreateAdminPage = () => {
    const {getSessionAction} = useSessionStore();

    useEffect(()=>{
        getSessionAction();
    },[]);

    const [selectRole, setSelectRole] = useState<any>(
        { label: "Admin", value: AdminRoles.ADMIN }
    );

    const {
        appLoading,
        appLoaded
    } = useUiStore();


    const creatAdminForm:CreateAdminFormInterface={
        name: '',
        lastName: '',
        role: selectRole.value,
        email: '',
        password: '',
        password2: '',
    }

    const roleOptionGroup = [
        {
            label: "Roles",
            options: [
                { label: "Root", value: AdminRoles.ROOT },
                { label: "Administrador", value: AdminRoles.ADMIN }
            ]
        },

    ];

    const selectedRoleGroup = selectRole;

    //Select
    const handleSelectRoleGroup = (selectedGroup: any) => {
        setSelectRole(selectedGroup);
        formik.setFieldValue('role', selectedGroup.value);
        formik.setFieldTouched('role');
    }

    const createAdminRequest = async (admin:any ) => {

        try {
            const response:AxiosResponse = await preventoolApi.post('/admin', admin);
            const data = response.data as CreateSuccessResponse;
            toast.success(MessagesHttpResponse.SuccessCreatedResponse);
            return data.uuid;

        }catch (error){

            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;

            if( status === 409 && data.class.includes('AdminAlreadyExistsException') )
            {
                toast.info(MessagesHttpResponse.AdminAlreadyExistsException);
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
        initialValues: creatAdminForm,
        onSubmit: async (values:CreateAdminFormInterface) => {
            appLoading();
            await createAdminRequest(values);
            appLoaded();
        },

        validationSchema: Yup.object({
            name: Yup.string()
                .required(MesseagesFormValidations.Required),
            lastName: Yup.string()
                .required(MesseagesFormValidations.Required),
            role: Yup.string()
                .required(MesseagesFormValidations.Required).oneOf([AdminRoles.ROOT, AdminRoles.ADMIN], MesseagesFormValidations.InvalidValue),
            password: Yup.string()
                .required(MesseagesFormValidations.Required),
            password2: Yup.string()
                .required(MesseagesFormValidations.Required)
                .oneOf([Yup.ref('password'),null], MesseagesFormValidations.NotMatchConfirmPassword),
            email: Yup.string()
                .email(MesseagesFormValidations.Email)
                .required(MesseagesFormValidations.Required),
        })
    });

    return(
        <>
            <div className="page-content">
                <Container fluid>

                    <Row className="justify-content-start text-start">
                        <Col xl={4}>
                            <div className="mb-4">
                                <h2>Crear Administrador</h2>
                            </div>
                        </Col>
                    </Row>

                    <Row >
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <CardTitle className="mb-4">Datos de registro</CardTitle>

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
                                            <Label htmlFor="lastName">Apellidos</Label>
                                            <Input
                                                type="text"
                                                id="lastName"
                                                placeholder="Apellidos"
                                                value={formik.values.lastName}
                                                onChange={formik.handleChange}
                                                onBlur={ formik.handleBlur }
                                                className={
                                                    "form-control" +
                                                    (formik.errors.lastName && formik.touched.lastName
                                                        ? " is-invalid"
                                                        : "")
                                                }
                                            />
                                            <div className="invalid-feedback">
                                                {formik.errors.lastName}
                                            </div>
                                        </div>

                                        <div className="mb-3 select2-container w-25">
                                            <Label>Rol</Label>
                                            <Select
                                                value={selectedRoleGroup}
                                                onChange={handleSelectRoleGroup}
                                                options={roleOptionGroup}
                                                className={
                                                    "select2-selection" +
                                                    (formik.errors.role && formik.touched.role
                                                        ? " is-invalid"
                                                        : "")
                                                }
                                            />
                                            <div className="invalid-feedback">
                                                {formik.errors.role}
                                            </div>
                                        </div>

                                        <Row>
                                            <Col md={6}>
                                                <div className="mb-3">
                                                    <Label htmlFor="email">Email</Label>
                                                    <Input
                                                        type="email"
                                                        id="email"
                                                        placeholder="Email"
                                                        value={formik.values.email}
                                                        onChange={formik.handleChange}
                                                        onBlur={ formik.handleBlur }
                                                        className={
                                                            "form-control" +
                                                            (formik.errors.email && formik.touched.email
                                                                ? " is-invalid"
                                                                : "")
                                                        }
                                                    />
                                                    <div className="invalid-feedback">
                                                        {formik.errors.email}
                                                    </div>
                                                </div>
                                           
                                                <div className="mb-3">
                                                    <Label htmlFor="password">Contraseña</Label>
                                                    <Input
                                                        type="password"
                                                        id="password"
                                                        placeholder="Contraseña"
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
                                                    <Label htmlFor="password2">Confirmar contraseña</Label>
                                                    <Input
                                                        type="password"
                                                        id="password2"
                                                        placeholder="Confirmar contraseña"
                                                        value={formik.values.password2}
                                                        onChange={formik.handleChange}
                                                        onBlur={ formik.handleBlur }
                                                        className={
                                                            "form-control" +
                                                            (formik.errors.password2 && formik.touched.password2
                                                                ? " is-invalid"
                                                                : "")
                                                        }
                                                    />
                                                    <div className="invalid-feedback">
                                                        {formik.errors.password2}
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>

                                        <div>
                                            <button type="submit" className="btn btn-primary w-md">
                                                Registrar
                                            </button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

        </>
    )
}