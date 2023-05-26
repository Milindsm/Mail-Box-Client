import classes from "./MailHeader.module.css";
import React from "react";
import { useDispatch } from "react-redux";
import { authActions  } from "./Store/AuthSlice";
    

const MailHeader = () => {
    const dispatch = useDispatch();
    const userId = localStorage.getItem("email");
    const logoutHandler = () => {
        dispatch(authActions.logout());
    };
    return (
        <div className={classes.header}>
            <h3>MailBox!</h3>
            {/* <div className={classes.findText}>
                <input type="text" placeholder="Search here.." />
                <button className={classes.searchButton}>Search</button>
            </div> */}

            <div className={classes.userId}>{userId}</div>
            <div>
                <button className={classes.logout} onClick={logoutHandler}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default MailHeader;