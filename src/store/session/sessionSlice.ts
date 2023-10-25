import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ActionAdmin {
    id: string;
    email: string;
    type: string;
    role: string;
    name: string;
    lastName: string
}

export interface SessionState {
    sessionError: boolean
    actionUserId: string|null,
    actionAdmin: ActionAdmin|null
}

const initialState:SessionState = {
    sessionError: false,
    actionUserId: null,
    actionAdmin : null
}
// @ts-ignore
// @ts-ignore
export const sessionSlice = createSlice({
    name: 'session',
    initialState: localStorage.getItem('session') ? JSON.parse(localStorage.getItem('session')!) : initialState,
    reducers: {
        setSession: (state: SessionState, action: PayloadAction<SessionState>) => {
            state.actionUserId = action.payload.actionUserId;
            state.actionAdmin = action.payload.actionAdmin
        },
        clearSession: (state:SessionState) => {
            state.actionUserId = null;
            state.actionAdmin = null;
            state.sessionError = false;
        },
        setHasSessionError : (state:SessionState) => {
            state.sessionError = true;
        }
    }

});


// Action creators are generated for each case reducer function
export const {
    setSession,
    clearSession,
    setHasSessionError
} = sessionSlice.actions;