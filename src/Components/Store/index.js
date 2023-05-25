import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import mailReducer from "./MailSlice"

const store = configureStore({
    reducer: { auth: authReducer, mail: mailReducer },
});

export default store;