import {ProcessActivityTaskResponse} from "../../service/interface/ProcessActivityTaskResponse";
import {ActionWorkplace} from "../../../../../store/workplace/workplaceSlice";
import {useEffect, useState} from "react";
import {Card, CardBody, Col, Container, Input, Label, Row, Table} from "reactstrap";
import {TablePaginator} from "../../../../../admin/shared/component/TablePaginator";
import {useUiStore} from "../../../../../store/ui/useUiStore";
import {
    SearchWorkplaceHazardService,
} from "../../service/searchWorkplaceHazardService/SearchWorkplaceHazardService";
import preventoolApi from "../../../../../shared/api/preventool/preventoolApi";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../../admin/shared/utils/MessagesHttpResponse";
import {AxiosError, AxiosResponse} from "axios/index";

interface props{
    task:ProcessActivityTaskResponse,
    workplace:ActionWorkplace
}
export const AddHazardTable = (
    props:props
) => {

    const {appLoading,appLoaded,loading} = useUiStore();

    const [orderBy, setOrderBy] = useState('name');
    const [orderByDirection, setOrderByDirection] = useState('ASC');
    const [requiredPage, setRequiredPage] = useState(1);

    const pageSize:number = 10;

    const {
        collection,
        total,
        currentPage,
        pages, searchAction
    } = SearchWorkplaceHazardService({workplaceId:props.workplace.id});


    //filtros
    // const [filterByName, setFilterByName] = useState('');
    const [filterQuery, setFilterQuery] = useState('');


    useEffect(()=>{
        if(props.workplace.id){
            appLoading()
            searchAction(
                '?'
                +'pageSize='+pageSize
                +'&orderBy='+orderBy
                +'&orderDirection='+orderByDirection
                +'&currentPage='+requiredPage
                +filterQuery
            ).then(appLoaded);
        }

    },[orderBy,orderByDirection, requiredPage, filterQuery, props.workplace]);


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


    const handleAddHazard = async (hazardId:string) => {

        appLoading();
        try {

            const postData = {
                taskId:props.task.id,
                hazardId: hazardId
            }
            await preventoolApi.post(
                '/create-task-hazard',
                postData
            );

            toast.info('Peligro añadido a la tarea');


        }catch (error){
            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;

            if( status === 409 && data.class.includes('TaskHazardAlreadyExitsException') )
            {
                toast.info(MessagesHttpResponse.TaskHazardAlreadyExistsException);
            }else if( status === 409 && data.class.includes('TaskHazardConflictException') ){
                toast.error(MessagesHttpResponse.TaskHazardConflictException);
            } else if( status === 409 && data.class.includes('ActionNotAllowedException') ) {
                toast.info(MessagesHttpResponse.ActionNotAllowedException);
            }else if( status === 403 && data.class.includes('AccessDeniedException') ){
                toast.info(MessagesHttpResponse.AccessDeniedException);

            }else{
                toast.error(MessagesHttpResponse.InternalError);
            }
        }
        appLoaded();
    }


    return(
        <>
            <Container fluid>
                {/*<Row>*/}
                {/*    <Col md={12}>*/}
                {/*        <Card>*/}
                {/*            <CardBody>*/}
                {/*                <div className="row gy-2 gx-3 align-items-center">*/}
                {/*                    <div className="col-sm-auto">*/}
                {/*                        <Label className="" htmlFor="filterByName">Nombre</Label>*/}
                {/*                        <Input*/}
                {/*                            className="form-control"*/}
                {/*                            type="text"*/}
                {/*                            id="filterByName"*/}
                {/*                            name="filterByName"*/}
                {/*                            onChange={handleFilterByName}*/}
                {/*                        />*/}
                {/*                    </div>*/}
                {/*                </div>*/}

                {/*                <div className="row mt-2 justify-content-end">*/}
                {/*                    <div className="col-sm-auto ">*/}
                {/*                        <button type="button" className="btn btn-primary w-md"*/}
                {/*                                onClick={handleFilterAction}*/}
                {/*                        >Buscar</button>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </CardBody>*/}

                {/*        </Card>*/}
                {/*    </Col>*/}
                {/*</Row>*/}


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
                                                <th><span className="cursor-pointer">Categoría</span></th>
                                                <th><span className="cursor-pointer" onClick={handleOrderByCreatedAt}>Creado</span></th>

                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>

                                            {
                                                collection.length
                                                    ? collection.map(
                                                        (hazard,index) => (
                                                            <tr
                                                                key={hazard.id}
                                                            >
                                                                <th scope="row">{index+1}</th>
                                                                <td>{hazard.name}</td>
                                                                <td>{hazard.categoryName}</td>
                                                                <td>{new Date(hazard.createdAt).toLocaleDateString()}</td>

                                                                <td>
                                                                    <div className="btn-group" >
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-outline-secondary"
                                                                            title="Editar"
                                                                            onClick={()=>handleAddHazard(hazard.id)}

                                                                        >
                                                                           Asignar
                                                                        </button>

                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )
                                                    : (<tr><td colSpan={6} className={'text-center'}>No hay peligros </td></tr>)

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