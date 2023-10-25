export interface EditAdminResponseInterface{
    id:        string;
    name:      string;
    lastName:  string;
    email:     string;
    type:      string;
    role:      string;
    active:    boolean;
    updaterId: null;
    createdAt: string;
    updatedAt: string|null;
}