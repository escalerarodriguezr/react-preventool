export interface CompanyResponseInterface{
    id:        string;
    name:      string;
    legalName:  string;
    legalDocument:  string;
    address: string;
    sector:string;
    active:    boolean;
    updaterId: null;
    createdAt: string;
    updatedAt: string|null;
}