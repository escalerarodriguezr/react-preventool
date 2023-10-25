import {SessionState} from "../../../../store/session/sessionSlice";
import {
    Card,
    CardBody, CardTitle,
    Col,
    DropdownMenu,
    DropdownToggle,
    Progress,
    Row,
    Table,
    UncontrolledDropdown
} from "reactstrap";
import {WorkplaceSessionState} from "../../../../store/workplace/workplaceSlice";
import ReactApexChart from "react-apexcharts";
import {DashboardResponse} from "../service/getWorkplaceDashboardById/DashboardResponse";

interface GeneralDashboardPanelProps{
    sessionState:SessionState|undefined,
    workplaceSessionState:WorkplaceSessionState|undefined,
    dashboardData:DashboardResponse

}
export const GeneralDashboardPanel = ({sessionState,workplaceSessionState,dashboardData}:GeneralDashboardPanelProps) => {


    const getChartOptions = (percentage:number = 100) => {
        const options = {
            chart: { sparkline: { enabled: !0 } },
            dataLabels: { enabled: !1 },
            colors: ["#f46a6a"],
            plotOptions: {
                radialBar: {
                    hollow: { margin: 0, size: "60%" },
                    track: { margin: 0 },
                    dataLabels: { show: !1 },
                },
            },
        };

        if( percentage === 100 ){
            options["colors"][0] = "#34c38f";
        }else if( percentage < 50 ){
            options["colors"][0] = "#f46a6a";

        }else{
            options["colors"][0] = "#556ee6";
        }

        return options;
    };

    return(
        <>
            <Row>
                <Col xl={4}>
                    <Card>
                        <CardTitle className="mt-4 h4 text-center">Estudio de Línea Base</CardTitle>

                        <CardBody>
                            <div className="table-responsive mt-4 overflow-md-hidden">
                                <Table className="table align-middle mb-0">
                                    <tbody>
                                    <tr key={'total'}>
                                        <td>
                                            <p className="text-muted mb-0">
                                                Cumplimiento total del estudio de línea base
                                            </p>
                                        </td>
                                        <td>
                                            <div className="apex-charts">
                                                    <ReactApexChart
                                                        options={getChartOptions(dashboardData.baselineStudyTotalCompliance)}
                                                        series={[dashboardData.baselineStudyTotalCompliance]}
                                                        type="radialBar"
                                                        height={75}
                                                        width={75}
                                                    />


                                            </div>
                                        </td>
                                        <td>
                                            <p className="text-muted mb-1">Cumplimiento</p>
                                            <h5 className="mb-0">{dashboardData.baselineStudyTotalCompliance} %</h5>
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </div>

                        </CardBody>
                    </Card>
                </Col>

                <Col xl={4}>

                    <Card>
                        <CardBody>
                            <CardTitle className="mb-4 h4 text-center">Riesgos Identificados</CardTitle>
                            <div className="text-center">
                                {/*<div className="mb-4">*/}
                                {/*    <i className="bx bx-map-pin text-primary display-4" style={{ lineHeight: '1' }} />*/}
                                {/*</div>*/}
                                <h3>{dashboardData.taskRiskTotalNumber}</h3>
                                {/*<p>Totales</p>*/}
                            </div>

                            <div className="table-responsive mt-4">
                                <table className="table align-middle table-nowrap">
                                    <tbody>
                                    <tr>
                                        <td style={{ width: "30%" }}>
                                            <p className="mb-0">Pendientes de evaluar</p>
                                        </td>
                                        <td style={{ width: "25%" }}>
                                            <h5 className="mb-0">{dashboardData.taskRiskStatusPendingNumber}</h5>
                                        </td>
                                        <td>
                                            <Progress
                                                value={(dashboardData.taskRiskStatusPendingNumber/dashboardData.taskRiskTotalNumber)*100}
                                                color="danger"
                                                className="progress bg-transparent progress-sm"
                                                size="sm"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p className="mb-0">Evaluación realizada</p>
                                        </td>
                                        <td>
                                            <h5 className="mb-0">{dashboardData.taskRiskStatusDraftNumber}</h5>
                                        </td>
                                        <td>
                                            <Progress
                                                value={(dashboardData.taskRiskStatusDraftNumber/dashboardData.taskRiskTotalNumber)*100}
                                                color="warning"
                                                className="progress bg-transparent progress-sm"
                                                size="sm"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p className="mb-0">Evaluación revisada</p>
                                        </td>
                                        <td>
                                            <h5 className="mb-0">{dashboardData.taskRiskStatusRevisedNumber}</h5>
                                        </td>
                                        <td>
                                            <Progress
                                                value={(dashboardData.taskRiskStatusRevisedNumber/dashboardData.taskRiskTotalNumber)*100}
                                                color="info"
                                                className="progress bg-transparent progress-sm"
                                                size="sm"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p className="mb-0">Evaluación aprobada</p>
                                        </td>
                                        <td>
                                            <h5 className="mb-0">{dashboardData.taskRiskStatusApprovedNumber}</h5>
                                        </td>
                                        <td>
                                            <Progress
                                                value={(dashboardData.taskRiskStatusApprovedNumber/dashboardData.taskRiskTotalNumber)*100}
                                                color="success"
                                                className="progress bg-transparent progress-sm"
                                                size="sm"
                                            />
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardBody>
                    </Card>



                </Col>

            </Row>
        </>
    )
}