import { createSlice } from "@reduxjs/toolkit";

const initialMailState = { mails: [] };

const mailSlice = createSlice({
    name: "mails",
    initialState: initialMailState,
    reducers: {
        addMail(state, action) {
            state.mails = action.payload;
        },
    },
});

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;