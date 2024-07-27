import { createSlice } from "@reduxjs/toolkit";


const initialState={
    search:null
}

export const searchSlice=createSlice({
    name:"Search",
    initialState,
    reducers:{
        Search:(state,action)=>{
            state.search=action.payload
        }
    }
})

export const {Search}=searchSlice.actions
export default searchSlice.reducer