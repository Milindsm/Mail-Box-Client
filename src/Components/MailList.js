import classes from "./MailList.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "./Store/MailSlice";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";

const MailList = (props) => {
    console.log(props);
    const userId = useSelector((state) => state.auth.userId);
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const readMessageHandler = () => {
        axios
            .put(
                `https://mail-box-client-b834a-default-rtdb.firebaseio.com/mails/${userId}inbox/${props.id}.json`,
                {
                    to: props.to,
                    subject: props.subject,
                    message: props.message,
                    isRead: true,
                }
            )

            .then((res) => {
                dispatch(
                    mailActions.updateMail({
                        id: props.id,
                        to: props.to,
                        subject: props.subject,
                        message: props.message,
                        isRead: true,
                    })
                );
            })
            .catch((err) => alert(err));
        Navigate("/read-mail");
    };
    return (
        <Fragment>
        <div className={classes.list} onClick={readMessageHandler}>
            {!props.isRead && <div className={classes.circle} />}
            <div className={classes.to}>{props.to}</div>
            <div>{props.subject}</div>
        </div>
    </Fragment>
    );
};
export default MailList;