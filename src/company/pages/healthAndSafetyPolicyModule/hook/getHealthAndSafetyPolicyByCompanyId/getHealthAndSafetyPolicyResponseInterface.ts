export interface GetHealthAndSafetyPolicyResponseInterface{
    id:string;
    companyId:string;
    status:string;
    documentResource:string;
    numberOfWorkers:number;
    active:boolean;
    approvedAdminId:string|null;
    creatorId:string;
    updaterId: string|null;
    createdAt: string;
    updatedAt: string|null;
}