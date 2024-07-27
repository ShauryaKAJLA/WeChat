import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../components/Conversations/chatSlice";
import  searchReducer  from "../components/SearchInput/search";


export const store=configureStore({
    reducer:{
        chat:chatReducer,
        search:searchReducer
    }
})