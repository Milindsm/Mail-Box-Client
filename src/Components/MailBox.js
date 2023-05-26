import MailHeader from "./MailHeader";
import Button from "./Button";
import MailList from "./MailList";
import { useSelector } from "react-redux";
import classes from "./MailBox.module.css";
import { Fragment } from "react";


const MailBox = () => {
    const mails = useSelector((state) => state.mail.mails);
    const inbox = useSelector((state) => state.mail.inbox);
    const sentmails = useSelector((state) => state.mail.sentmails);

    let mailList;
    if (inbox) {
        mailList = mails.map((mail) => (
            <MailList
                key={mail.id}
                subject={mail.subject}
                to={mail.to}
                id={mail.id}
                message={mail.message}
                isRead={mail.isRead}
            />
        ));
    }
    if (!inbox) {
        mailList = sentmails.map((mail) => (
            <MailList
                key={mail.id}
                subject={mail.subject}
                to={mail.to}
                id={mail.id}
                message={mail.message}
                isRead={mail.isRead}
            />
        ));
    }
    
    return (
        <Fragment>
            <MailHeader />
            <div className={classes.main}>
                <div className={classes.buttons}>
                    <Button />
                </div>
                <div className={classes.list}>{mailList}</div>
            </div>
        </Fragment>
    );
};

export default MailBox;