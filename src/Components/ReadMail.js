import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from "./ReadMail.module.css";

const ReadMail = () => {
    const Navigate = useNavigate();
    const inbox = useSelector((state) => state.mail.inbox);
    const currentMail = useSelector((state) => state.mail.currentMail);
    console.log(currentMail);
    const closeMailHandler = () => {
        Navigate("/mail-box");
    };
    return (
        <div className={classes.mail}>
            <div className={classes.header}>
                <div>
                    <button>Archive</button>
                    <button>Move</button>
                    <button>Delete</button>
                    <button>Spam</button>
                </div>
                <div>
                    <button onClick={closeMailHandler}> X</button>
                </div>
            </div>
            <div>
            <div className={classes.to}>
                    {inbox ? `From:${currentMail.to}` : `To:${currentMail.to}`}
                </div>
                <div className={classes.subject}>{currentMail.subject}</div>
                <div className={classes.message}>{currentMail.message}</div>
                <div className={classes.actions}>
                    <button>Reply</button>
                    <button>Forward</button>
                </div>
            </div>
        </div>
    );
};

export default ReadMail;