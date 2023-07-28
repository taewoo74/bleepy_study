import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title: '',
    text: '',
    button:'',
    type: '',
    popupState:false,
}

const popupSlice = createSlice({
    name:'popup',
    initialState,
    reducers: {
        setPopup(state,action) {
            state.title = action.payload.title;
            state.text = action.payload.text;
            state.button = action.payload.button;
            state.type = action.payload.type;
            state.popupState = action.payload.popupState;
        }
    },
})

export const { setPopup } = popupSlice.actions;
export const selectPopup = (state: { popup: any; }) => state.popup;

export default popupSlice