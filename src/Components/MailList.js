import classes from "./MailList.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "./Store/MailSlice";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";

const MailList = (props) => {
    // console.log(props);
    const userId = useSelector((state) => state.auth.userId);
    const inbox = useSelector((state) => state.mail.inbox);
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const readMessageHandler = () => {
        if (inbox) {
            const mailDetails = {
                to: props.to,
                subject: props.subject,
                message: props.message,
                isRead: true,
            };

            axios
                .put(
                    `https://mail-box-client-b834a-default-rtdb.firebaseio.com/mails/${userId}inbox/${props.id}.json`,
                    mailDetails
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
        } else {
            const mailDetails = {
                to: props.to,
                subject: props.subject,
                message: props.message,
                isRead: true,
            };

            axios
                .put(
                    `https://mail-box-client-b834a-default-rtdb.firebaseio.com/mails/${userId}sentbox/${props.id}.json`,
                    mailDetails
                )

                .then((res) => {
                    dispatch(
                        mailActions.updateSentMail({
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
        }
    };
    const deleteMailHandler = () => {
        
            if (inbox) {
                axios
                    .delete(
                        `https://mail-box-client-b834a-default-rtdb.firebaseio.com/mails/${userId}inbox/${props.id}.json`
                    )

                    .then((res) => {
                        dispatch(mailActions.deleteMail(props.id));
                    })
                    .catch((err) => alert(err));
            } else {
                axios
                    .delete(
                        `https://mail-box-client-b834a-default-rtdb.firebaseio.com/mails/${userId}sentbox/${props.id}.json`
                    )
                    .then(() => {
                        dispatch(mailActions.deleteSentMail(props.id));
                    });
            }
    };
    return (
        <Fragment>
        <div className={classes.list}>
                <div className={classes.symbolTo} onClick={readMessageHandler}>
                    {!props.isRead && <div className={classes.circle} />}
                    <div className={classes.to}>{props.to}</div>
                </div>
                <div className={classes.subject}>{props.subject}</div>
                <div className={classes.delete}>
                    <button onClick={deleteMailHandler}>Delete</button>
                </div>
        </div>
    </Fragment>
    );
};
export default MailList;