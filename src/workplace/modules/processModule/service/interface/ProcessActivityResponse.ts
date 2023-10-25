export interface ProcessActivityResponse{
    id:string;
    processId:string
    name:string;
    description:string|null;
    activityOrder:number;
    active:boolean;
    creatorId:string;
    updaterId: null;
    createdAt: string;
    updatedAt: string|null;
}