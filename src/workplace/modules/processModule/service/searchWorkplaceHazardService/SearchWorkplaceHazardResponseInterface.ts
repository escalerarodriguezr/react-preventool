import {WorkplaceHazardResponseInterface} from "./WorkplaceHazardResponseInterface";

export interface SearchWorkplaceHazardResponseInterface{
    currentPage: number;
    pages:number;
    total:number;
    items:WorkplaceHazardResponseInterface[];
}