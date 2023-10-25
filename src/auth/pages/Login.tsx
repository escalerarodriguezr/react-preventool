import {redirect, useNavigate} from "react-router-dom";
import {Card, CardBody, Col, Container, Row} from "reactstrap";
import * as Yup from 'yup';
// import images
// @ts-ignore
import profile from "../../assets/images/profile-img.png";
// @ts-ignore
import logo from "../../assets/images/logo.svg";
import {useFormik} from "formik";
import {useAuthStore} from "../../store/auth/useAuthStore";
import {useUiStore} from "../../store/ui/useUiStore";
import {LoginForm} from "../interface/LoginFormInterface";
import {useSessionStore} from "../../store/session/useSessionStore";
import {MesseagesFormValidations} from "../../admin/shared/utils/MesseagesFormValidations";


export const Login = () => {

    const {
        loginAction,
        errorMessage
    } = useAuthStore();

    const {
        appLoading,
        appLoaded
    } = useUiStore();

    const {getSessionAction} = useSessionStore()

    const loginInitialForm:LoginForm ={
        email: '',
        password: ''
    }

    const formik = useFormik({
        initialValues: loginInitialForm,
        onSubmit: async (values:LoginForm) => {
            appLoading();
            const loginSuccess:boolean = await loginAction({email:values.email,password:values.password});
            if(loginSuccess){
                const sessionSuccess:boolean = await getSessionAction();
                if(loginSuccess && sessionSuccess){
                    appLoaded();
                    redirect('/');
                    // window.location.reload();
                }
            }
            appLoaded();
        },

        validationSchema: Yup.object({
            password: Yup.string()
                .required(MesseagesFormValidations.Required),
            email: Yup.string()
                .required(MesseagesFormValidations.Required)
                .email(MesseagesFormValidations.Email),
        })
    });

    const {handleChange,values,handleSubmit, touched, errors, handleBlur} = formik;

    return(
        <>

            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="overflow-hidden">
                                <div className="bg-primary bg-soft">
                                    {/*<Row>*/}
                                    {/*    <Col className="col-5 align-self-end">*/}
                                    {/*        /!*<img src={profile} alt="" className="img-fluid" />*!/*/}
                                    {/*    </Col>*/}
                                    {/*</Row>*/}
                                </div>
                                <CardBody className="pt-0">
                                    {/*<div className="auth-logo">*/}
                                    {/*        <div className="avatar-md profile-user-wid mb-4">*/}
                                    {/*            <span className="avatar-title rounded-circle bg-light">*/}
                                    {/*                <img*/}
                                    {/*                    src={logo}*/}
                                    {/*                    alt=""*/}
                                    {/*                    className="rounded-circle"*/}
                                    {/*                    height="34"*/}
                                    {/*                />*/}
                                    {/*            </span>*/}
                                    {/*        </div>*/}
                                    {/*</div>*/}

                                    <div className="p-2 mt-2">
                                        <form
                                            noValidate
                                            className="form-horizontal"
                                            onSubmit={handleSubmit}
                                        >
                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label">
                                                    Email
                                                </label>
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="text"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={ handleBlur }
                                                    className={
                                                        "form-control"
                                                        + (errors.email && touched.email
                                                            ? " is-invalid"
                                                            : "")
                                                    }
                                                />
                                                <div className="invalid-feedback">
                                                    {errors.email}
                                                </div>

                                                <div className="mb-3 mt-2">
                                                    <label htmlFor="password" className="form-label">
                                                        Contraseña
                                                    </label>
                                                    <div className="input-group auth-pass-inputgroup">
                                                        <input
                                                            name="password"
                                                            type="password"
                                                            value={values.password}
                                                            onChange={handleChange}
                                                            onBlur={ handleBlur }
                                                            className={
                                                                "form-control" +
                                                                (errors.password && touched.password
                                                                    ? " is-invalid"
                                                                    : "")
                                                            }
                                                        />
                                                        <div className="invalid-feedback">
                                                            {errors.password}
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="mb-3">
                                                    {(errorMessage && (
                                                        <span className="error">{errorMessage}</span>
                                                    ))}

                                                </div>

                                                <div className="mt-3 d-grid">
                                                    <button
                                                        className="btn btn-primary btn-block"
                                                        type="submit"
                                                    >
                                                        Iniciar
                                                    </button>
                                                </div>
                                            </div>
                                        </form>

                                    </div>
                                </CardBody>
                            </Card>
                            <div className="mt-5 text-center">
                                <p>
                                    © {new Date().getFullYear()} by Preventool
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}