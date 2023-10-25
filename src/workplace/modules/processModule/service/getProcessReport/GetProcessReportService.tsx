import {useState} from "react";
import {getEnv} from "../../../../../shared/utils/getEnv";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../../admin/shared/utils/MessagesHttpResponse";

export const GetProcessReportService = () => {

    const [documentUrl, setDocumentUrl] = useState<any>(null);

    const getProcessReportAction = async (
        processId:string,
        type:string
    ): Promise<void> => {

        const request = new Request(
            `${getEnv().VITE_API_PREVENTOOL_URL}/process/${processId}/${type}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                mode: "cors",
                cache: "default",
            }
        );

        try {
            const response = await fetch(request);
            const blod = await response.blob();
            setDocumentUrl(blod);

        }catch (error){
            toast.error(MessagesHttpResponse.InternalError);
        }


    }



    return{
        documentUrl,
        getProcessReportAction,
        setDocumentUrl
    }

}