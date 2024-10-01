import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BlogState {
    cachedBlog : any[]
}

const initialState : BlogState = {
    cachedBlog : []
}

const blogSlice = createSlice({
    name : "blogCache" ,
    initialState   ,
    reducers : {
        storeBlogCache : (state , action : PayloadAction<any>) => {
            state.cachedBlog.push(action.payload)
        }
    }
})


export const { storeBlogCache } = blogSlice.actions
export default blogSlice.reducer;