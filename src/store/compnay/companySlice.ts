import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ActionCompany {
    id: string;
    name: string;
    legalName: string;
    legalDocument: string;
    address: string;
    sector: string,
    creatorId: string,
    updaterId: string,
    createdAt:string,
    updatedAt:string
}

export interface CompanySessionResponse {
    actionCompany: ActionCompany;
}

export interface CompanySessionState {
    companyError: boolean
    actionCompany: ActionCompany|null
}

const initialState:CompanySessionState = {
    companyError: false,
    actionCompany : null
}
// @ts-ignore
// @ts-ignore
export const companySlice = createSlice({
    name: 'company',
    initialState: localStorage.getItem('companySession') ? JSON.parse(localStorage.getItem('companySession')!) : initialState,
    reducers: {
        setCompanySession: (state: CompanySessionState, action: PayloadAction<CompanySessionResponse>) => {
            state.companyError = false;
            state.actionCompany = action.payload.actionCompany
        },
        clearCompanySession: (state:CompanySessionState) => {
            state.companyError = false;
            state.actionCompany = null;
        },
        setCompanySessionError : (state:CompanySessionState) => {
            state.companyError = true;
        }
    }

});

// Action creators are generated for each case reducer function
export const {
    setCompanySession,
    setCompanySessionError,
    clearCompanySession
} = companySlice.actions;