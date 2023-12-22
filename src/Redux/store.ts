import{configureStore} from "@reduxjs/toolkit"
 import authReducer from "./features/userAuthSlice"

export const store= configureStore({
    reducer:{

        authReducer,
     
    }
})
export type Rootstate =ReturnType<typeof store.getState>
export type Dispatch =typeof store.dispatch