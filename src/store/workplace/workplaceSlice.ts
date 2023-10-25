import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ActionWorkplace {
    id:string;
    companyId:string
    name:string;
    contactPhone:string
    address:string;
    numberOfWorkers:number,
    active:boolean
    creatorId: string,
    updaterId: string,
    createdAt:string,
    updatedAt:string
}

export interface WorkplaceSessionResponse {
    actionWorkplace: ActionWorkplace;
}

export interface WorkplaceSessionState {
    workplaceError: boolean
    actionWorkplace: ActionWorkplace|null
}

const initialState:WorkplaceSessionState = {
    workplaceError: false,
    actionWorkplace : null
}
// @ts-ignore
// @ts-ignore
export const workplaceSlice = createSlice({
    name: 'workplace',
    initialState: localStorage.getItem('workplaceSession') ? JSON.parse(localStorage.getItem('workplaceSession')!) : initialState,
    reducers: {
        setWorkplaceSession: (state: WorkplaceSessionState, action: PayloadAction<WorkplaceSessionResponse>) => {
            state.workplaceError = false;
            state.actionWorkplace = action.payload.actionWorkplace
        },
        clearWorkplaceSession: (state:WorkplaceSessionState) => {
            state.workplaceError = false;
            state.actionWorkplace = null;
        },
        setWorkplaceSessionError : (state:WorkplaceSessionState) => {
            state.workplaceError = true;
        }
    }

});

// Action creators are generated for each case reducer function
export const {
    setWorkplaceSession,
    setWorkplaceSessionError,
    clearWorkplaceSession
} = workplaceSlice.actions;