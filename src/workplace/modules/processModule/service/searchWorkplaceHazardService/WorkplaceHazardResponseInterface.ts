export interface WorkplaceHazardResponseInterface{
    id:string;
    workplaceId:string;
    name:string;
    description:string|null;
    categoryName:string;
    active:boolean;
    creatorId:string;
    updaterId: null;
    createdAt: string;
    updatedAt: string|null;
}