export interface TaskRiskAssessmentResponse{
    id:string;
    taskRiskId:string;
    status:string;
    revision:number
    severityIndex:number;
    peopleExposedIndex:number;
    procedureIndex:number;
    trainingIndex:number;
    exposureIndex:number;
    riskLevelIndex:number;
    revisedAdminId:string|null;
    approvedAdminId:string|null;
    creatorId:string;
    updaterId: null;
    createdAt: string;
    updatedAt: string|null;


}