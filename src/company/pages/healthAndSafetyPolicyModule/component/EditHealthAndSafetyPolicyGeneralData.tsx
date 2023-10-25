import {SessionState} from "../../../../store/session/sessionSlice";
import {CompanySessionState} from "../../../../store/compnay/companySlice";
import {
    UseGetHealthAndSafetyPolicyByCompanyIdService
} from "../hook/getHealthAndSafetyPolicyByCompanyId/UseGetHealthAndSafetyPolicyByCompanyIdService";
import {useUiStore} from "../../../../store/ui/useUiStore";
import {SyntheticEvent, useDebugValue, useEffect, useState} from "react";
import {Col, Row} from "reactstrap";
import {
    UseGetDocumentHealthAndSafetyPolicyByCompanyIdService
} from "../hook/getDocumentHealthAndSafetyPolicyByCompanyId/UseGetDocumentHealthAndSafetyPolicyByCompanyIdService";
import {UploadPdfDocument} from "../../../../shared/component/UploadPdfDocument";
import {redirect, useNavigate} from "react-router-dom";
import {AxiosResponse} from "axios";
import preventoolApi from "../../../../shared/api/preventool/preventoolApi";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../admin/shared/utils/MessagesHttpResponse";
import {AxiosError} from "axios";


interface EditHealthAndSafetyPolicyGeneralDataProps{
    sessionState:SessionState
    companySessionState:CompanySessionState

}
export const EditHealthAndSafetyPolicyGeneralData = (
    {sessionState,companySessionState}:EditHealthAndSafetyPolicyGeneralDataProps
) =>
{
    const [status, setStatus] = useState<string>('DRAFT');
    const {appLoading, appLoaded} = useUiStore();

    const {
        policy,
        getPolicyByCompanyIdAction
    } = UseGetHealthAndSafetyPolicyByCompanyIdService();

    const {getPolicyDocumentByCompanyIdAction, documentUrl, setDocumentUrl} = UseGetDocumentHealthAndSafetyPolicyByCompanyIdService();

    useEffect(()=>{
        if(sessionState.actionAdmin && companySessionState.actionCompany?.id){
            appLoading();
            getPolicyByCompanyIdAction(companySessionState.actionCompany.id);
            if(!policy?.documentResource){
                appLoaded();
            }
        }

    },[companySessionState]);

    useEffect(()=>{

        if(policy?.status){
            setStatus(policy.status);
        }

        if(policy?.documentResource && companySessionState.actionCompany?.id){
            appLoading();
            getPolicyDocumentByCompanyIdAction(companySessionState.actionCompany?.id).then(appLoaded);

        }
    },[policy]);

    useEffect(()=>{
        if(documentUrl){
            const file = window.URL.createObjectURL(documentUrl);
            const iframe = document.querySelector("iframe");
            if (iframe?.src) iframe.src = file;

            iframe!.onload = ()=>{
                window.URL.revokeObjectURL(file);
            }
            //Forzar descarga
            // const link = document.createElement('a');
            // link.href = window.URL.createObjectURL(documentUrl);
            // link.download = `uno-${+new Date()}.pdf`;
            // console.log(link);
            // link.click();
            //
        }
    },[documentUrl])


    const handleOnSuccessUploadFile = (file:File):void => {
        setDocumentUrl(file);
    }

    const handleSelectedChange = (event:SyntheticEvent) => {
        // @ts-ignore
        const statusValue = event.nativeEvent.target.value
        setStatus(statusValue);
    }

    const handleStatusSaveAction = async (): Promise<void> => {

        try{
            const response:AxiosResponse = await preventoolApi.put(
                `/company/${companySessionState.actionCompany?.id}/approve-health-and-safety-policy`
            )
            toast.info(MessagesHttpResponse.HealthAndSafetyStatusChangedSuccess);

        }catch (error) {

            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;

            if( status === 409 && data.class.includes('CompanyNotFoundException') )
            {
                toast.info(MessagesHttpResponse.CompanyNotFoundException);
            }else if( status === 409 && data.class.includes('HealthAndSafetyPolicyOfCompanyNotHasDocumentAssignedException') ) {
                toast.info(MessagesHttpResponse.ActionNotAllowedException);
            } else if( status === 409 && data.class.includes('ActionNotAllowedException') ) {
                toast.info(MessagesHttpResponse.ActionNotAllowedException);
            }else if( status === 403 && data.class.includes('AccessDeniedException') ){
                toast.info(MessagesHttpResponse.AccessDeniedException);

            }else{
                toast.error(MessagesHttpResponse.InternalError);
            }

        }




    }

    // @ts-ignore
    return(
        <>
            <Row>
                <Col lg={2} className={'order-lg-2'} >
                    {
                        documentUrl &&
                        <div className="mb-3 row">
                            <div className="text-center">
                                <label className="col-form-label">Estado del Documento</label>
                            </div>

                            <div className="">
                                <select className="form-select"
                                        value={status}
                                        onChange={handleSelectedChange}
                                >

                                    <option
                                        value={'DRAFT'}
                                        // selected={isSelected('DRAFT')}
                                    >Borrador</option>
                                    <option
                                        value={'APPROVED'}
                                        // selected={isSelected('APPROVED')}
                                    >Aprobado</option>

                                </select>
                            </div>

                            <div className="mt-2 text-center">
                                <button type="button" className="btn btn-primary w-md"
                                        disabled={!documentUrl}
                                        onClick={()=>handleStatusSaveAction()}
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>
                    }

                    <div className="mt-5 row">
                        <UploadPdfDocument
                            uploadEndpoint={`/company/${companySessionState.actionCompany?.id}/upload-health-and-safety-policy`}
                            onSuccessAction={(file:File)=>handleOnSuccessUploadFile(file)}
                            maxFileSize={10}
                        />

                    </div>

                </Col>

                <Col lg={10} className={'order-lg-1'}>

                    {
                        documentUrl &&
                        <iframe title="pdf" src='' style={{ height: '1250px', width: '100%' }}></iframe>
                    }

                    {
                        !documentUrl &&
                        <div className="alert-info">Pendiente de subir el documento de la Política de Seguridad y Salud</div>
                    }

                </Col>

            </Row>
        </>
    )
}