import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AuthState {
    token: string|null,
    errorMessage: string|null
}

const initialState: AuthState = {
    token:localStorage.getItem('token'),
    errorMessage:null
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onLoginSuccess: ( state, action: PayloadAction<string> ) => {
            state.token = action.payload
            state.errorMessage = null;
        },

        clearToken: ( state:AuthState ) => {
            state.token = null;
        },

        setErrorMessage : (state:AuthState,action:PayloadAction<string>) => {
            state.errorMessage = action.payload;

        },
        clearErrorMessage: ( state:AuthState ) => {
            state.errorMessage = null;
        }
    }
});


// Action creators are generated for each case reducer function
export const {
    onLoginSuccess,
    clearToken,
    setErrorMessage,
    clearErrorMessage
} = authSlice.actions;