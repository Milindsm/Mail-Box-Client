import { useNavigate } from "react-router-dom";
import classes from "./Button.module.css";
import { useSelector,useDispatch } from "react-redux";
import { mailActions } from "./Store/MailSlice";
import axios from "axios";

const Button = () => {
    const dispatch = useDispatch();
    const unRead = useSelector((state) => state.mail.unread);
    const userId = useSelector((state) => state.auth.userId);
    const Navigate = useNavigate();
    const composeButtonHandler = () => {
        Navigate ("/compose-mail");
    };
    const inboxHandler = () => {
        dispatch(mailActions.setInboxTrue(true));
        axios
            .get(
                `https://mail-box-client-b834a-default-rtdb.firebaseio.com/mails/${userId}inbox.json`
            )
            .then((res) => {
                let datas = res.data;

                let mailArray = [];
                for (let id in datas) {
                    let mails = datas[id];
                    mails.id = id;
                    mailArray.push(mails);
                }
                dispatch(mailActions.addMail(mailArray));
            });
        
    };
    const sentMailHandler = () => {
        dispatch(mailActions.setInboxTrue(false));
        axios
            .get(
                `https://mail-box-client-b834a-default-rtdb.firebaseio.com/mails/${userId}sentbox.json`
            )
            .then((res) => {
                let datas = res.data;

                let mailArray = [];
                for (let id in datas) {
                    let mails = datas[id];
                    mails.id = id;
                    mailArray.push(mails);
                }
                dispatch(mailActions.sentMail(mailArray));
            });
        
    };
    return (
        <div>
            <button
                className={classes.composeButton}
                onClick={composeButtonHandler}
            >
                Compose
            </button>

            <div className={classes.views}>
            <div className={classes.unread}>
            <button onClick={inboxHandler}>Inbox</button>
                    <span>{`[unread:${unRead}]`}</span>
                </div>
                <div>
                    
                <button onClick={sentMailHandler}>Sent box</button>
                </div>
            </div>
        </div>
    );
};

export default Button;