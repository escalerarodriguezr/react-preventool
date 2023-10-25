export interface GetWorkplaceByIdResponseInterface{
    id:string;
    name:string;
    contactPhone:string;
    address:string;
    numberOfWorkers:number;
    active:boolean;
    creatorId:string;
    updaterId: null;
    createdAt: string;
    updatedAt: string|null;

}