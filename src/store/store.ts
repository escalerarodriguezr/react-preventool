import { configureStore } from '@reduxjs/toolkit';
import {authSlice} from "./auth/authSlice";
import {uiSlice} from "./ui/uiSlice";
import {sessionSlice} from "./session/sessionSlice";
import {companySlice} from "./compnay/companySlice";
import {workplaceSlice} from "./workplace/workplaceSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        session: sessionSlice.reducer,
        company: companySlice.reducer,
        workplace: workplaceSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch