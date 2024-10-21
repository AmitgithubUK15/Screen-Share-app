import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    S_ID:null
}

 const Userslice = createSlice({
    name:"user",
    initialState,
    reducers:{
        loginsuccess:(state,action)=>{
        state.S_ID = action.payload;
        },
        logout:(state)=>{
            state.S_ID = null;
        }
    }
});

export const {loginsuccess,logout} = Userslice.actions;
export default Userslice.reducer;




