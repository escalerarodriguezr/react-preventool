export interface GetBaselineStudyComplianceResponseInterface {
    id:string;
    workplaceId:string;
    totalCompliance:number;
    compromisoCompliance:number;
    politicaCompliance:number;
    planeamientoCompliance:number;
    implementacionCompliance:number;
    evaluacionCompliance:number;
    verificacionCompliance:number;
    controlCompliance:number;
    revisionCompliance:number;
    creatorId:string;
    updaterId: null;
    createdAt: string;
    updatedAt: string|null;
}