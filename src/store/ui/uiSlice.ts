import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface UiState {
    loading: boolean,

}

const initialState: UiState = {
    loading: false
}
export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        loadingOn: ( state) => {
            state.loading = true;
        },
        loadingOff: ( state) => {
            state.loading = false;
        },

    }
});


// Action creators are generated for each case reducer function
export const {
    loadingOn,
    loadingOff
} = uiSlice.actions;