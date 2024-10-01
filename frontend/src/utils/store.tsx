import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./blogSlice";

const store = configureStore({
    reducer : {
        blogCache : blogSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export default store