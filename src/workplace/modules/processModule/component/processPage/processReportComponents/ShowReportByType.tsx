import {useUiStore} from "../../../../../../store/ui/useUiStore";
import {GetProcessReportService} from "../../../service/getProcessReport/GetProcessReportService";
import React, {useEffect} from "react";

interface Props{
    processId:string
    type:string
}

export const ShowReportByType = (
    {processId,type}:Props
) => {
    const {appLoading,appLoaded} = useUiStore();

    const {documentUrl,getProcessReportAction} = GetProcessReportService();

    useEffect(()=>{
        if(processId){
            appLoading();
            getProcessReportAction(processId,type).then(appLoaded);
        }

    },[]);


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


    return(
        <>
            {documentUrl &&
                <iframe title="pdf" src='' style={{ height: '1250px', width: '100%' }}></iframe>
            }

            {!documentUrl &&
                <div className="alert-info">Informe no disponible</div>
            }
        </>
    )




}