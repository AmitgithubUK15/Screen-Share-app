import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    errormsg:null
}

const errorSlice = createSlice({
    name:'error',
    initialState,
    reducers:{
    listenerror: (state,action) =>{
        // console.log(action.payload);
        state.errormsg = action.payload;
    }
    }
})

export const {listenerror} = errorSlice.actions;
export default errorSlice.reducer;