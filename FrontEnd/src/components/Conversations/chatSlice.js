import {createSlice} from '@reduxjs/toolkit'


const initialState={
        receiver:null,
        chat:null
}


export const chatSlice=createSlice({
    name:"Chat",
    initialState,
    reducers:{
        setChat:(state,action)=>{
                state.receiver=action.payload.receiver
                state.chat=action.payload.chat
        },
        addChat:(state,action)=>{
            state.chat.push(action.payload)
        },
        clearChat:(state,action)=>{
            state.chat=null
            state.receiver=null
        }
    }
})

export const {setChat,addChat,clearChat}=chatSlice.actions
export default chatSlice.reducer