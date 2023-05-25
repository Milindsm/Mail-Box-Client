import {createSlice} from "@reduxjs/toolkit";

const initialAuthState = {
    isAuthenticated: false,
    token: "",
    userId: "",
    recieverId: "",
};
const authSlice = createSlice({
    name: "authentication",
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        },
        logout(state) {
            state.isAuthenticated = false;
            state.token = "";
            localStorage.removeItem("token");
            localStorage.removeItem("email");
        },
        setUserId(state, action) {
            localStorage.setItem("email", action.payload);
            state.userId = action.payload.replace(/[@,.]/g, "");
        },
        setRecieverId(state, action) {
            localStorage.setItem("reciever", action.payload);
            state.recieverId = action.payload.replace(/[@,.]/g, "");
        },
        setIsAuth(state) {
            if (localStorage.getItem("token")) {
                state.isAuthenticated = true;
                state.token = localStorage.getItem("token");
                const email = localStorage.getItem("email");
                state.userId = email.replace(/[@,.]/g, "");
            }
        },
    },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;