export interface ProcessActivityTaskResponse{
    id:string;
    processActivityId:string
    name:string;
    description:string|null;
    taskOrder:number;
    active:boolean;
    creatorId:string;
    updaterId: null;
    createdAt: string;
    updatedAt: string|null;
}