import MailHeader from "./MailHeader";
import Button from "./Button";
import MailList from "./MailList";
import { useSelector } from "react-redux";
import classes from "./MailBox.module.css";


const MailBox = () => {
    const mails = useSelector((state) => state.mail.mails);

    const mailList = mails.map((mail) => (
        <MailList
            key={mail.id}
            subject={mail.subject}
            to={mail.to}
            id={mail.id}
            message={mail.message}
        />
    ));
    return (
        <div>
            <MailHeader />
            <div className={classes.main}>
                <div className={classes.buttons}>
                    <Button />
                </div>
                <div className={classes.list}>{mailList}</div>
            </div>
        </div>
    );
};

export default MailBox;