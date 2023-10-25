export interface GetWorkplaceProcessByIdResponse{
    id:string;
    name:string;
    description:string;
    revisionNumber:number;
    revisionOf:string|null;
    revisedBy:string|null;
    active:boolean;
    creatorId:string;
    updaterId: null;
    createdAt: string;
    updatedAt: string|null;
}