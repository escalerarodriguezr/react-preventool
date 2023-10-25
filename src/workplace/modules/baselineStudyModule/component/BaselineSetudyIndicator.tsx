import {
    BaselineStudyIndicatorInterface
} from "../hook/getBaselineStudyIndicatotByCategory/BaselineStudyIndicatorInterface";
import {Card, CardText, CardTitle, Input} from "reactstrap";
import React, {ChangeEvent, SyntheticEvent, useEffect, useState} from "react";
import {AxiosError, AxiosResponse} from "axios";
import preventoolApi from "../../../../shared/api/preventool/preventoolApi";
import {useWorkplaceSessionStore} from "../../../../store/workplace/useWorkplaceSessionStore";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../admin/shared/utils/MessagesHttpResponse";

export const BaselineStudyIndicator = (
    {
        id,
        name,
        description,
        compliancePercentage,
        observations

    }:BaselineStudyIndicatorInterface) => {

    const [compliance, setCompliance] = useState<number|string>(compliancePercentage);
    const [observationsState, setObservationsState] = useState<any>(observations);

    const {workplaceSessionState} = useWorkplaceSessionStore();


    const handleComplianceChange = (event:ChangeEvent<HTMLInputElement>)=>{
        const value = event.target.value
        setCompliance(value)
    }

    const handleOnKeyUp = (event:any)=>{

        if (event.target.value > 100 ){
            event.target.value = "100";
            setCompliance(event.target.value);
        }

        if (event.target.value < 0 ){
            event.target.value = "0";
            setCompliance(event.target.value);
        }


    }

    const handleObservationsChange = (event:any)=>{
        setObservationsState(event.target.value);
    }



    const handleSaveAction = async ():Promise<void> => {

        try{

            const url = `/update-baseline-study-indicator/${workplaceSessionState.actionWorkplace?.id}/${id}`;
            const payload:any = {
                compliancePercentage: (typeof compliance === 'string') ? parseInt(compliance) : compliance,
                observations: observationsState.length >0 ? observationsState : null
            }

            await preventoolApi.put(
                url,
                payload
            );
            toast.info(MessagesHttpResponse.HealthAndSafetyStatusChangedSuccess);

        }catch (error){
            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;

            if( status === 409 && data.class.includes('ActionNotAllowedException') )
            {
                toast.info(MessagesHttpResponse.ActionNotAllowedException);
            }else if( status === 403 && data.class.includes('AccessDeniedException') ) {
                toast.info(MessagesHttpResponse.AccessDeniedException);

            }else if ( status === 422 && data.class.includes('UnprocessableEntityHttpExceptio') ){
                toast.error(MessagesHttpResponse.ErrorUnprocesableEntityResponse);
            }else if( status === 404 ){
                if(data.class.includes('WorkplaceNotFoundException')){
                    toast.error(MessagesHttpResponse.WorkplaceNotFoundException);
                }else if(data.class.includes('WorkplaceBaselineStudyByCategoryNotFoundException')){
                    toast.error(MessagesHttpResponse.WorkplaceBaselineStudyByCategoryNotFoundException)
                }
                toast.error(MessagesHttpResponse.InternalError);

            }else {
                toast.error(MessagesHttpResponse.InternalError);
            }
        }

    }


    return(
        <Card body className={"mt-4 border border-2"}>
            <CardTitle className="mt-0">{name}</CardTitle>
            <CardText className={"mt-2 space-pre-line"}>
                {description}
            </CardText>
            <CardTitle className="mt-4">% Cumplimiento</CardTitle>
            <CardText>

                <Input
                    className={"form form-control input-w-10"}
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    id={id}
                    value={compliance}
                    onChange={handleComplianceChange}
                    onKeyUp={handleOnKeyUp}
                />


            </CardText>
            <CardTitle className="mt-4">Observaciones</CardTitle>
            <CardText>
                <Input
                    type="textarea"
                    id="textarea"
                    rows="4"
                    placeholder="Máximo 300 caracteres..."
                    value={observationsState}
                    onChange={handleObservationsChange}
                />

            </CardText>
            <button
                className="btn btn-primary w-25"
                onClick={handleSaveAction}
            >
                Guardar
            </button>
        </Card>
    )

}