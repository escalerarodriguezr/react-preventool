import {Input, Label} from "reactstrap";
import {SyntheticEvent, useState} from "react";
import {AxiosResponse} from "axios";
import preventoolApiUploadFile from "../api/preventool/preventoolApiUploaFile";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../admin/shared/utils/MessagesHttpResponse";
import {AxiosError} from "axios/index";

interface UploadPdfDocumentProps {
    uploadEndpoint: string,
    maxFileSize:number
    onSuccessAction: any
}
export const UploadPdfDocument = ({uploadEndpoint, maxFileSize, onSuccessAction}:UploadPdfDocumentProps) => {

    const [documentFile, setDocumentFile] = useState<File|null>(null);


    const handleOnchanegInput = (event:SyntheticEvent) => {

        // @ts-ignore
        const file = event.nativeEvent.target.files[0];

        if( file.type != 'application/pdf' ){
            toast.info('El documento debe ser un pdf');
            return
        }

        if( file.size > (maxFileSize*1024*1024)  ){
            toast.info('Tamaño máximo de archivo superado');
        }


        // @ts-ignore
        setDocumentFile(file);

    }
    const handleUploadAction = async ():Promise<void> => {

        if(!documentFile){
            return
        }
        const data = new FormData();
        data.append('policy',documentFile);

        try {
            const response:AxiosResponse = await preventoolApiUploadFile.post(
                uploadEndpoint,
                data
            )

            toast.success(MessagesHttpResponse.SuccessUploadDocumentResponse);
            onSuccessAction(documentFile);

        }catch (error){
            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;

            console.log(status);
            console.log(data);
            if( status === 409 && data.class.includes('ActionNotAllowedException') ) {
                toast.info(MessagesHttpResponse.ActionNotAllowedException);
            }else if( status === 403 && data.class.includes('AccessDeniedException') ){
                toast.info(MessagesHttpResponse.AccessDeniedException);

            }else if ( status === 422) {
                toast.info(MessagesHttpResponse.ErrorUploadDocumentInvalidFormatResponse);

            }else{
                toast.error(MessagesHttpResponse.ErrorUploadDocumentResponse);
            }
        }

    }
    return(

        <div>
            <h5 className="font-size-8"><i className="mdi mdi-arrow-right text-primary"></i> Subir Documento</h5>
            <div className="row">
                <div className="col">
                    <div className="mt-3 font-size-6">
                        <Label htmlFor="formFile" className="form-label">Documento</Label>
                        <Input className="form-control" type="file" id="formFile"
                               onChange={handleOnchanegInput}

                        />
                    </div>
                    <div>
                        <small>Formatos aceptados: pdf</small>
                        <br/>
                        <small>Tamaño máximo: {maxFileSize}M</small>
                    </div>
                    <div className="mt-2 text-center">
                        <button type="button" className="btn btn-primary w-md"
                                onClick={()=>handleUploadAction()}
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}