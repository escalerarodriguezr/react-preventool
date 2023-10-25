import {Card, CardBody, Col, Container, Input, Label, Row, Table} from "reactstrap";
import Switch from "react-switch";
import {OffSymbol} from "../../../shared/component/OffSymbol";
import {OnSymbol} from "../../../shared/component/OnSymbol";
import {AdminRoles} from "../../../shared/model/Admin/AdminRoles";
import {TablePaginator} from "../../../shared/component/TablePaginator";
import {SessionState} from "../../../../store/session/sessionSlice";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {UseSearchAuditTypeService} from "../hook/searchAuditTypeService/UseSearchAuditTypeService";
import {useTablePaginator} from "../../../../shared/hook/useTablePaginator";

interface SearchCompanyTableProps{
    sessionState:SessionState,
}

export const SearchAuditTypeTable = ({sessionState}:SearchCompanyTableProps) => {

    const navigate = useNavigate();

    const [orderBy, setOrderBy] = useState('createdAt');
    const [orderByDirection, setOrderByDirection] = useState('DESC');

    const pageSize:number = 10;

    const {
        searchAuditTypeAction,
        total,
        pages,
        currentPage,
        auditTypes
    } = UseSearchAuditTypeService();

    const {
        requiredPage,
        handleTargetPage,
        handlePreviousPage,
        handleNextPage
    } = useTablePaginator({currentPage,pages});


    useEffect(()=>{
        searchAuditTypeAction(
            '?'
            +'pageSize='+pageSize
            +'&orderBy='+orderBy
            +'&orderDirection='+orderByDirection
            +'&currentPage='+requiredPage
        );
    },[orderBy,orderByDirection, requiredPage]);

    
    //Orders
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

    return(
        <>
            <Container fluid>
                <Row>
                    <Col md={12}>
                        <Card>
                            <CardBody>
                                <div className="table-responsive">
                                    <Table className="table mb-0">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th><span className="cursor-pointer" onClick={handleOrderByName}>Nombre</span></th>
                                            <th><span className="cursor-pointer" onClick={handleOrderByCreatedAt}>Creado</span></th>
                                            <th>Activo</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        {auditTypes.length
                                            ? auditTypes.map(
                                                (item,index) => (
                                                    <tr
                                                        key={item.id}
                                                    >
                                                        <th scope="row">{index+1}</th>
                                                        <td>{item.name}</td>
                                                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                                        <td><Switch
                                                            uncheckedIcon={<OffSymbol />}
                                                            className="me-1 mb-sm-8 mb-2"
                                                            checkedIcon={<OnSymbol />}
                                                            onColor="#02a499"
                                                            onChange={(checked, event, id) =>{
                                                                if(checked = false){

                                                                }
                                                            }}
                                                            checked={item.active}
                                                            disabled={true}
                                                        /></td>
                                                        <td>
                                                            <div className="btn-group" >
                                                                {sessionState?.actionAdmin?.role == AdminRoles.ROOT &&
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-default"
                                                                        title="Editar"
                                                                    >
                                                                        <i className="fas fa-edit"></i>
                                                                    </button>
                                                                }

                                                                <button
                                                                    type="button"
                                                                    className="btn btn-default"
                                                                    title="Gestionar"

                                                                >
                                                                    <i className="fas fa-city" />
                                                                </button>

                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                            : <tr><td colSpan={6} className={'text-center'}>No hay empresas tipos de auditoría registradas </td></tr>

                                        }
                                        </tbody>
                                    </Table>
                                </div>
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