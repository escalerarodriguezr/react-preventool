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

interface EditAdminGeneralDataProps{
    id:string|undefined,
    sessionState:SessionState|undefined,
    fromProfile:boolean
}
export const EditAdminGeneralData = ({id, sessionState, fromProfile}:EditAdminGeneralDataProps) => {

    const [selectedRole, setSelectedRole] = useState<any>(
        { label: "Admin", value: AdminRoles.ADMIN }
    );

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

    useEffect(()=>{

        if(admin){
            if(admin.role == AdminRoles.ADMIN){
                setSelectedRole({ label: "Administrador", value: AdminRoles.ADMIN })
            }
            if(admin.role == AdminRoles.ROOT){
                setSelectedRole({ label: "Root", value: AdminRoles.ROOT })
            }
        }

    },[admin]);

    const roleOptionGroup = [
        {
            label: "Roles",
            options: [
                { label: "Root", value: AdminRoles.ROOT },
                { label: "Administrador", value: AdminRoles.ADMIN }
            ]
        },

    ];

    const handleSelectRoleGroup = (selectedGroup: any) => {
        setSelectedRole(selectedGroup);
        formik.setFieldValue('role', selectedGroup.value);
        formik.setFieldTouched('role');
    }


    const editAdminForm: EditAdminFormInterface = {
        name: admin?.name ? admin.name : '',
        lastName: admin?.lastName ? admin.lastName : '',
        role: selectedRole.value,
        email: admin?.email ? admin.email : '',
    }


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: editAdminForm,
        onSubmit: async (values:EditAdminFormInterface) => {
            appLoading();
            await editAdminRequest(values);
            appLoaded()
        },

        validationSchema: Yup.object({
            name: Yup.string()
                .required(MesseagesFormValidations.Required),
            lastName: Yup.string()
                .required(MesseagesFormValidations.Required),
            role: Yup.string()
                .required(MesseagesFormValidations.Required).oneOf([AdminRoles.ROOT, AdminRoles.ADMIN], MesseagesFormValidations.InvalidValue),
            email: Yup.string()
                .email(MesseagesFormValidations.Email)
                .required(MesseagesFormValidations.Required),
        })
    });


    const editAdminRequest = async (adminData:EditAdminFormInterface ) => {

        try {
            const response:AxiosResponse = await preventoolApi.put('/admin/'+id, adminData);
            const data = response.data as CreateSuccessResponse;
            toast.success(MessagesHttpResponse.SuccessEditResponse);
            return true;

        }catch (error){

            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;

            if( status === 409 &&
                (data.class.includes('AdminAlreadyExistsException') || data.class.includes('UserAlreadyExistsException') ) )
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
                                                    <Label htmlFor="lastName">Apellidos</Label>
                                                    <Input
                                                        type="text"
                                                        id="lastName"
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

                                                <div className="mb-3 select2-container">
                                                    <Label>Rol</Label>
                                                    <Select
                                                        value={selectedRole}
                                                        onChange={handleSelectRoleGroup}
                                                        options={roleOptionGroup}
                                                        className={
                                                            "select2-selection" +
                                                            (formik.errors.role && formik.touched.role
                                                                ? " is-invalid"
                                                                : "")
                                                        }
                                                       isDisabled={fromProfile}
                                                    />
                                                    <div className="invalid-feedback">
                                                        {formik.errors.role}
                                                    </div>
                                                </div>

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

                                            </Col>

                                        </Row>

                                        <div>
                                            <button type="submit" className="btn btn-primary w-md">
                                                Editar
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