import {SessionState} from "../../../../store/session/sessionSlice";
import {useNavigate} from "react-router-dom";
import {SyntheticEvent, useEffect, useState} from "react";
import {Card, CardBody, Col, Container, Input, Label, Row, Table} from "reactstrap";
import Switch from "react-switch";
import {CompanySessionState} from "../../../../store/compnay/companySlice";
import {UseSearchWorkplaceService} from "../hook/searchWorkplaceService/UseSearchWorkplaceService";
import {OffSymbol} from "../../../../admin/shared/component/OffSymbol";
import {TablePaginator} from "../../../../admin/shared/component/TablePaginator";
import {OnSymbol} from "../../../../admin/shared/component/OnSymbol";
import {useUiStore} from "../../../../store/ui/useUiStore";
import Swal from "sweetalert2";
import preventoolApi from "../../../../shared/api/preventool/preventoolApi";
import {AxiosError, AxiosResponse} from "axios";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../admin/shared/utils/MessagesHttpResponse";

interface SearchWorkplaceTableProps{
    sessionState:SessionState|undefined,
    companySessionState: CompanySessionState|undefined
}

export const SearchWorkplaceTable = ({sessionState, companySessionState}:SearchWorkplaceTableProps) => {

    const navigate = useNavigate();

    const {
        appLoading,
        appLoaded,
        loading
    } = useUiStore();

    //Estados para gestionar el paginador y la ordenación
    const [orderBy, setOrderBy] = useState('createdAt');
    const [orderByDirection, setOrderByDirection] = useState('DESC');
    const [requiredPage, setRequiredPage] = useState(1);

    const pageSize:number = 10;

    const {workplaces,total, currentPage, pages, searchWorkplaceAction, activateWorkplace} = UseSearchWorkplaceService();

    //filtros
    const [filterQuery, setFilterQuery] = useState('');

    useEffect(()=>{

        if(companySessionState?.actionCompany?.id){
            searchWorkplaceAction(
                '?'
                +'pageSize='+pageSize
                +'&orderBy='+orderBy
                +'&orderDirection='+orderByDirection
                +'&currentPage='+requiredPage
                +'&filterByCompanyId='+companySessionState?.actionCompany?.id
                +filterQuery
            );
        }

    },[orderBy,orderByDirection, requiredPage, filterQuery, companySessionState]);


    const handleNextPage = () =>{

        if(currentPage === pages){
            return currentPage;
        }
        setRequiredPage(currentPage+1);
    }

    const handlePreviousPage = () =>{
        if(currentPage === 1){
            return currentPage
        }
        setRequiredPage(currentPage-1);
    }

    const handleTargetPage = (targetPage:number) => {
        setRequiredPage(targetPage);
    }

    const handleOrderByCreatedAt = () => {
        setOrderBy('createdAt');
        setOrderByDirection((prevState)=>{
            if(prevState === 'ASC'){
                return 'DESC';
            }
            if(prevState === 'DESC'){
                return 'ASC';
            }
            return prevState;
        });
    }

    const handleOrderByName = () => {
        setOrderBy('name');
        setOrderByDirection((prevState)=>{
            if(prevState === 'ASC'){
                return 'DESC';
            }
            if(prevState === 'DESC'){
                return 'ASC';
            }
            return prevState;
        });
    }

    // const handleFilterByName = (event:SyntheticEvent) => {
    //     // @ts-ignore
    //     const {value} = event.nativeEvent.target;
    //     setFilterByName(value);
    // }


    // const handleFilterAction = (event:SyntheticEvent) => {
    //
    //     let filterQuery:string = '&';
    //     if(filterByName.length > 0) {
    //         filterQuery += 'filterByName='+filterByName
    //     }
    //
    //     filterQuery !== '&' ? setFilterQuery(filterQuery) : setFilterQuery('');
    //     setRequiredPage(1);
    // }

    const handleNavigateEdit = (id:string) => {
        navigate('/empresa/centro-trabajo/' + id);
    }

    const handleNavigateToWorkplaceLayout = (id:string) => {
        localStorage.setItem('workplaceId', id );
        navigate('/centro-trabajo/dashboard');
    }

    const handleActiveChecked = (workplace:any) => {
        return workplace.active == true;
    }

    const handleDeleteWorkplace = (companyId:string, workplaceId:string): void =>{

        Swal.fire({
            title: 'Estás seguro de querer eliminar el Centro de Trabajo?',
            text: "Se va eliminar el Centro de Trabajo.La acción es irreversible.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sí, eliminar el Centro de Trabajo!'
        }).then((result) => {
            if (result.isConfirmed) {
               deleteWorkplaceRequest(companyId,workplaceId);
            }
        })
    }

    const deleteWorkplaceRequest = async (companyId:string,workplaceId:string): Promise<void> => {

        try {
            appLoading();
            const url:string = '/company/'+companyId+'/workplace/'+workplaceId;
            await preventoolApi.delete(url);
            if(companyId){
                searchWorkplaceAction(
                    '?'
                    +'pageSize='+pageSize
                    +'&orderBy='+orderBy
                    +'&orderDirection='+orderByDirection
                    +'&currentPage='+requiredPage
                    +'&filterByCompanyId='+companySessionState?.actionCompany?.id
                    +filterQuery
                );
            }
            appLoaded();
            Swal.fire(
                'Centro de Trabajo',
                'El Centro de Trabajo se ha eliminado correctamente.',
                'success'
            )

        }catch (error){
            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;
            if( status === 409 && data.class.includes('ActionNotAllowedException') )
            {
                toast.info(MessagesHttpResponse.ActionNotAllowedException);
            }else if( status === 403 && data.class.includes('AccessDeniedException') ){
                toast.info(MessagesHttpResponse.AccessDeniedException);
            }else {
                toast.error(MessagesHttpResponse.InternalError);
            }
        }
    }



    return(
        <>
                <Container fluid>
                    <Row>
                        <Col md={12}>
                            <Card>
                                <CardBody>
                                    {
                                        !loading &&
                                        <div className="table-responsive">
                                            <Table className="table mb-0">
                                                <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th><span className="cursor-pointer" onClick={handleOrderByName}>Nombre</span></th>
                                                    <th>Número de trabajadores</th>
                                                    <th><span className="cursor-pointer" onClick={handleOrderByCreatedAt}>Creado</span></th>
                                                    <th>Activo</th>
                                                    <th></th>
                                                </tr>
                                                </thead>
                                                <tbody>

                                                {
                                                    workplaces.length
                                                        ? workplaces.map(
                                                            (workplace,index) => (
                                                                <tr
                                                                    key={workplace.id}
                                                                >
                                                                    <th scope="row">{index+1}</th>
                                                                    <td>{workplace.name}</td>
                                                                    <td>{workplace.numberOfWorkers}</td>
                                                                    <td>{new Date(workplace.createdAt).toLocaleDateString()}</td>
                                                                    <td><Switch
                                                                        uncheckedIcon={<OffSymbol />}
                                                                        className="me-1 mb-sm-8 mb-2"
                                                                        checkedIcon={<OnSymbol />}
                                                                        onColor="#02a499"
                                                                        onChange={(checked, event, id) =>{
                                                                            activateWorkplace(workplace)
                                                                        }}
                                                                        checked={handleActiveChecked(workplace)}

                                                                    /></td>
                                                                    <td>
                                                                        <div className="btn-group" >

                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-default"
                                                                                title="Editar"
                                                                                onClick={()=>handleNavigateEdit(workplace.id)}

                                                                            >
                                                                                <i className="fas fa-edit"></i>
                                                                            </button>

                                                                            {
                                                                                workplace.active == true &&
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn btn-default"
                                                                                    title="Gestionar centro"
                                                                                    onClick={()=>handleNavigateToWorkplaceLayout(workplace.id)}
                                                                                >
                                                                                    <i className="fas fa-city" />
                                                                                </button>
                                                                            }

                                                                            {workplace.active != true &&
                                                                                companySessionState?.actionCompany?.id  &&
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn btn-default"
                                                                                    title="Eliminar"
                                                                                    onClick={()=>handleDeleteWorkplace(
                                                                                        companySessionState?.actionCompany?.id!,
                                                                                        workplace.id
                                                                                    )}
                                                                                >
                                                                                    <i className="fas fa-trash"></i>
                                                                                </button>
                                                                            }

                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )
                                                        : (<tr><td colSpan={6} className={'text-center'}>No hay centros de trabajo registrados </td></tr>)



                                                }
                                                </tbody>
                                            </Table>

                                        </div>
                                    }

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={12}>
                            {
                                total > 0 &&
                                <TablePaginator
                                    total={total}
                                    currentPage={currentPage}
                                    pages={pages}
                                    handlePreviousPage={handlePreviousPage}
                                    handleNextPage={handleNextPage}
                                    handleTargetPage={handleTargetPage}
                                />
                            }
                        </Col>
                    </Row>
                </Container>
        </>
    )
}