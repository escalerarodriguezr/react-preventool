import {WorkplaceSessionState} from "../../../../store/workplace/workplaceSlice";
import {useUiStore} from "../../../../store/ui/useUiStore";
import {
    GetBaselineStudyIndicatorByCategoryService
} from "../hook/getBaselineStudyIndicatotByCategory/GetBaselineStudyIndicatorByCategoryService";
import {useEffect} from "react";
import {
    BaselineStudyIndicatorInterface
} from "../hook/getBaselineStudyIndicatotByCategory/BaselineStudyIndicatorInterface";
import {BaselineStudyIndicator} from "./BaselineSetudyIndicator";

interface BaselineStudyIndicatorProps{
    workplaceSession:WorkplaceSessionState,
    category:string
}
export const BaselineStudyCategoryIndicators = (
    {
        workplaceSession,
        category

    }:BaselineStudyIndicatorProps
) => {
    const {appLoading, appLoaded, loading} = useUiStore();

    const {indicators, getBaselineStudyIndicatorsByCategoryAction} = GetBaselineStudyIndicatorByCategoryService();

    useEffect(()=>{

        if(category && workplaceSession.actionWorkplace?.id){
            appLoading()
            getBaselineStudyIndicatorsByCategoryAction(category,workplaceSession.actionWorkplace?.id).then(appLoaded)
        }

    },[category]);

    return(
        <>
            {
                !loading && indicators.length &&
                indicators.map((indicator:BaselineStudyIndicatorInterface) => (
                    <BaselineStudyIndicator
                        key={indicator.id}
                        id={indicator.id}
                        name={indicator.name}
                        category={indicator.category}
                        description={indicator.description}
                        compliancePercentage={indicator.compliancePercentage}
                        observations={indicator.observations || ""}
                    />
                ))
            }
        </>
    )
}