import React,{useRef,useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {authActions} from "../Components/Store/AuthSlice";
import classes from "./SignUp.module.css";

const SignUp = () => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const Navigate = useNavigate();

    const loaderHandler = () => {
        setIsLoading(true);
    };

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        let url;

        if (!isLogin) {
            const confirmPassword = confirmPasswordInputRef.current.value;

            if (enteredPassword === confirmPassword) {
                url =
                    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDC9rWzDa4XH-ZCaTTgpN4F7zIIVSS62bw";
            } else {
                alert("Both passwords doesn't match");
            }
        } else {
            url =
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDC9rWzDa4XH-ZCaTTgpN4F7zIIVSS62bw";
        }

        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(async (res) => {
                if (res.ok) {
                    const data = await res.json();
                    dispatch(authActions.login(data.idToken));
                    dispatch(authActions.setUserId(enteredEmail));
                    event.target.reset();
                    Navigate ("/mail-box");
                    return data;
                } else {
                    await res.json();
                    let errorMessage = "Authentication failed!";
                    setIsLoading(false);
                    throw new Error(errorMessage);
                }
            })
            .then(() => {
                if (!isLogin) {
                    console.log("user has successfully signed up");
                } else {
                    console.log("user has successfully logged in");
                }
            })

            .catch((err) => {
                alert(err.message);
            });
    };

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? "LOGIN" : "SIGN UP"}</h1>
            <p>Please enter the following credentials!</p>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="text"
                        id="email"
                        required
                        ref={emailInputRef}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        required
                        ref={passwordInputRef}
                    />
                </div>
                {!isLogin && (
                    <div className={classes.control}>
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            required
                            ref={confirmPasswordInputRef}
                        />
                    </div>
                )}
                <div className={classes.actions}>
                    {!isLogin && (
                        <div>
                            <button
                                className={classes.actionButton}
                                onClick={loaderHandler}
                            >
                                {!isLoading ? " SignUp" : "Sending Request..."}
                            </button>
                            <p>
                                Already have an account?
                                <button
                                    className={classes.actionToggle}
                                    onClick={switchAuthModeHandler}
                                >
                                    Login
                                </button>
                            </p>
                        </div>
                    )}
                    {isLogin && (
                        <div>
                            <button
                                className={classes.actionButton}
                                onClick={loaderHandler}
                            >
                                {!isLoading ? "Login" : "Sending Request..."}
                            </button>
                            <p>
                                Don't have an account?
                                <button
                                    className={classes.actionToggle}
                                    onClick={switchAuthModeHandler}
                                >
                                    SignUp
                                </button>
                            </p>
                        </div>
                    )}
                </div>
            </form>
        </section>
    );
};
export default SignUp;