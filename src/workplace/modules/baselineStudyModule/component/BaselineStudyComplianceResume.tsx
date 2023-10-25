import {SessionState} from "../../../../store/session/sessionSlice";
import {WorkplaceSessionState} from "../../../../store/workplace/workplaceSlice";


import ReactApexChart from "react-apexcharts";
import {useUiStore} from "../../../../store/ui/useUiStore";
import {GetBaselineStudyComplianceService} from "../hook/getBaselineStudyCompliance/GetBaselineStudyComplianceService";
import {useEffect} from "react";
import {Card, CardBody, Col, Row, Table} from "reactstrap";


interface BaselineStudyComplianceResumeProps {
    session:SessionState,
    workplaceSession: WorkplaceSessionState
}
export const BaselineStudyComplianceResume = (
    { session, workplaceSession}: BaselineStudyComplianceResumeProps
) => {
    const {appLoading,appLoaded} = useUiStore();
    const {baselineStudyCompliance, getBaselineStudyComplianceAction} = GetBaselineStudyComplianceService();

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


    useEffect(()=>{
        if(workplaceSession.actionWorkplace?.id){
            appLoading();
            getBaselineStudyComplianceAction(workplaceSession.actionWorkplace.id).then(appLoaded);
        }
    },[]);


    // @ts-ignore
    return(
        <>
            <Row>

                <Col xl="6">
                    <Card>
                        <CardBody>

                            <div className="table-responsive mt-4">
                                <Table className="table align-middle mb-0">
                                    <tbody>
                                            <tr key={'compromiso'}>
                                                <td>
                                                    <h5 className="font-size-14 mb-1">
                                                        Compromiso
                                                    </h5>
                                                    <p className="text-muted mb-0">
                                                        Compromiso e Involucramiento
                                                    </p>
                                                </td>

                                                <td>
                                                    <div className="apex-charts">
                                                        {
                                                            baselineStudyCompliance &&
                                                            baselineStudyCompliance.compromisoCompliance != undefined &&
                                                            <ReactApexChart
                                                                options={getChartOptions(baselineStudyCompliance.compromisoCompliance)}
                                                                series={[baselineStudyCompliance?.compromisoCompliance!]}
                                                                type="radialBar"
                                                                height={50}
                                                                width={50}
                                                            />
                                                        }

                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="text-muted mb-1">Cumplimiento</p>
                                                    <h5 className="mb-0">{baselineStudyCompliance?.compromisoCompliance} %</h5>
                                                </td>
                                            </tr>

                                            <tr key={'planeamiento'}>
                                                <td>
                                                    <h5 className="font-size-14 mb-1">
                                                        Planeamiento
                                                    </h5>
                                                    <p className="text-muted mb-0">
                                                        Planeamiento y aplicación
                                                    </p>
                                                </td>

                                                <td>
                                                    <div className="apex-charts">
                                                        {
                                                            baselineStudyCompliance &&
                                                            baselineStudyCompliance.planeamientoCompliance != undefined &&
                                                            <ReactApexChart
                                                                options={getChartOptions(baselineStudyCompliance.planeamientoCompliance)}
                                                                series={[baselineStudyCompliance?.planeamientoCompliance!]}
                                                                type="radialBar"
                                                                height={50}
                                                                width={50}
                                                            />
                                                        }

                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="text-muted mb-1">Cumplimiento</p>
                                                    <h5 className="mb-0">{baselineStudyCompliance?.planeamientoCompliance} %</h5>
                                                </td>
                                            </tr>

                                            <tr key={'evaluacion'}>
                                                <td>
                                                    <h5 className="font-size-14 mb-1">
                                                        Evaluación
                                                    </h5>
                                                    <p className="text-muted mb-0">
                                                        Evaluación normativa
                                                    </p>
                                                </td>

                                                <td>
                                                    <div className="apex-charts">
                                                        {
                                                            baselineStudyCompliance &&
                                                            baselineStudyCompliance.evaluacionCompliance != undefined &&
                                                            <ReactApexChart
                                                                options={getChartOptions(baselineStudyCompliance.evaluacionCompliance)}
                                                                series={[baselineStudyCompliance?.evaluacionCompliance!]}
                                                                type="radialBar"
                                                                height={50}
                                                                width={50}
                                                            />
                                                        }
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="text-muted mb-1">Cumplimiento</p>
                                                    <h5 className="mb-0">{baselineStudyCompliance?.evaluacionCompliance} %</h5>
                                                </td>
                                            </tr>

                                            <tr key={'control'}>
                                                <td>
                                                    <h5 className="font-size-14 mb-1">
                                                        Control
                                                    </h5>
                                                    <p className="text-muted mb-0">
                                                        Control de información y documentos
                                                    </p>
                                                </td>

                                                <td>
                                                    <div className="apex-charts">
                                                        {
                                                            baselineStudyCompliance &&
                                                            baselineStudyCompliance.controlCompliance != undefined &&
                                                            <ReactApexChart
                                                                options={getChartOptions(baselineStudyCompliance.controlCompliance)}
                                                                series={[baselineStudyCompliance?.controlCompliance!]}
                                                                type="radialBar"
                                                                height={50}
                                                                width={50}
                                                            />
                                                        }
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="text-muted mb-1">Cumplimiento</p>
                                                    <h5 className="mb-0">{baselineStudyCompliance?.controlCompliance} %</h5>
                                                </td>
                                            </tr>

                                    </tbody>
                                </Table>
                            </div>
                        </CardBody>
                    </Card>
                </Col>

                <Col xl="6">
                    <Card>
                        <CardBody>

                            <div className="table-responsive mt-4">
                                <Table className="table align-middle mb-0">
                                    <tbody>

                                        <tr key={'politica'}>
                                            <td>
                                                <h5 className="font-size-14 mb-1">
                                                    Política
                                                </h5>
                                                <p className="text-muted mb-0">
                                                    Política de seguridad y salud ocupacional
                                                </p>
                                            </td>

                                            <td>
                                                <div className="apex-charts">
                                                    {
                                                        baselineStudyCompliance &&
                                                        baselineStudyCompliance.politicaCompliance != undefined &&
                                                        <ReactApexChart
                                                            options={getChartOptions(baselineStudyCompliance.politicaCompliance)}
                                                            series={[baselineStudyCompliance?.politicaCompliance!]}
                                                            type="radialBar"
                                                            height={50}
                                                            width={50}
                                                        />
                                                    }
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-muted mb-1">Cumplimiento</p>
                                                <h5 className="mb-0">{baselineStudyCompliance?.politicaCompliance} %</h5>
                                            </td>
                                        </tr>

                                        <tr key={'implementacion'}>
                                            <td>
                                                <h5 className="font-size-14 mb-1">
                                                    Implementación
                                                </h5>
                                                <p className="text-muted mb-0">
                                                    Implementación y operación
                                                </p>
                                            </td>

                                            <td>
                                                <div className="apex-charts">
                                                    {
                                                        baselineStudyCompliance &&
                                                        baselineStudyCompliance.implementacionCompliance != undefined &&
                                                        <ReactApexChart
                                                            options={getChartOptions(baselineStudyCompliance.implementacionCompliance)}
                                                            series={[baselineStudyCompliance?.implementacionCompliance!]}
                                                            type="radialBar"
                                                            height={50}
                                                            width={50}
                                                        />
                                                    }
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-muted mb-1">Cumplimiento</p>
                                                <h5 className="mb-0">{baselineStudyCompliance?.implementacionCompliance} %</h5>
                                            </td>
                                        </tr>

                                        <tr key={'verificacion'}>
                                            <td>
                                                <h5 className="font-size-14 mb-1">
                                                    Verificación
                                                </h5>
                                                <p className="text-muted mb-0">
                                                    Verificación
                                                </p>
                                            </td>

                                            <td>
                                                <div className="apex-charts">
                                                    {
                                                        baselineStudyCompliance &&
                                                        baselineStudyCompliance.verificacionCompliance != undefined &&
                                                        <ReactApexChart
                                                            options={getChartOptions(baselineStudyCompliance.verificacionCompliance)}
                                                            series={[baselineStudyCompliance?.verificacionCompliance!]}
                                                            type="radialBar"
                                                            height={50}
                                                            width={50}
                                                        />
                                                    }
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-muted mb-1">Cumplimiento</p>
                                                <h5 className="mb-0">{baselineStudyCompliance?.verificacionCompliance} %</h5>
                                            </td>
                                        </tr>


                                        <tr key={'revision'}>
                                            <td>
                                                <h5 className="font-size-14 mb-1">
                                                    Revisión
                                                </h5>
                                                <p className="text-muted mb-0">
                                                    Revisión por la dirección
                                                </p>
                                            </td>

                                            <td>
                                                <div className="apex-charts">
                                                    {
                                                        baselineStudyCompliance &&
                                                        baselineStudyCompliance.revisionCompliance != undefined &&
                                                        <ReactApexChart
                                                            options={getChartOptions(baselineStudyCompliance.revisionCompliance)}
                                                            series={[baselineStudyCompliance?.revisionCompliance!]}
                                                            type="radialBar"
                                                            height={50}
                                                            width={50}
                                                        />
                                                    }
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-muted mb-1">Cumplimiento</p>
                                                <h5 className="mb-0">{baselineStudyCompliance?.revisionCompliance} %</h5>
                                            </td>
                                        </tr>

                                    </tbody>
                                </Table>
                            </div>
                        </CardBody>
                    </Card>
                </Col>

            </Row>

            <Row>

                <Col xl={{size: 6, offset: 6}}>
                    <Card>
                        <CardBody>

                            <div className="table-responsive mt-4">
                                <Table className="table align-middle mb-0">
                                    <tbody>
                                        <tr key={'total'}>
                                            <td>
                                                <h5 className="font-size-14 mb-1">
                                                    Total
                                                </h5>
                                                <p className="text-muted mb-0">
                                                    Cumplimiento total del estudio de líena base
                                                </p>
                                            </td>

                                            <td>
                                                <div className="apex-charts">
                                                    {
                                                        baselineStudyCompliance &&
                                                        baselineStudyCompliance.totalCompliance != undefined &&
                                                        <ReactApexChart
                                                            options={getChartOptions(baselineStudyCompliance.totalCompliance)}
                                                            series={[baselineStudyCompliance?.totalCompliance!]}
                                                            type="radialBar"
                                                            height={75}
                                                            width={75   }
                                                        />

                                                    }
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-muted mb-1">Cumplimiento</p>
                                                <h5 className="mb-0">{baselineStudyCompliance?.totalCompliance} %</h5>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}