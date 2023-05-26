import { useNavigate } from "react-router-dom";
import classes from "./Button.module.css";
import { useSelector } from "react-redux";

const Button = () => {
    const totalMail = useSelector((state) => state.mail.totalmail);
    const Navigate = useNavigate();
    const composeButtonHandler = () => {
        Navigate ("/compose-mail");
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
                    <button>Inbox</button>
                    <span>{`[${totalMail}]`}</span>
                </div>
                <div>
                    <button>Unread</button>
                </div>
                <div>
                    <button>Starred</button>
                </div>
                <div>
                    <button>Drafts</button>
                </div>
                <div>
                    <button>Sent</button>
                </div>
                <div>
                    <button>Archive</button>
                </div>
                <div>
                    <button>Spam</button>
                </div>
                <div>
                    <button>Deleted Items</button>
                </div>
            </div>
            <div className={classes.views}>
                <div>VIEWS</div>
                <div>
                    <button>Photos</button>
                </div>
                <div>
                    <button>Documents</button>
                </div>
                <div>
                    <button>Subscription</button>
                </div>
                <div>
                    <button>Deals</button>
                </div>
                <div>
                    <button>Travel</button>
                </div>
            </div>
            <div className={classes.views}>
                <div>FOLDERS</div>
                <div>
                    <button>+New Folder</button>
                </div>
            </div>
        </div>
    );
};

export default Button;