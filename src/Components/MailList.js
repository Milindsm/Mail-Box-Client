import classes from "./MailList.module.css";
const MailList = (props) => {
    return (
        <div className={classes.list}>
            <div className={classes.to}>{props.to}</div>
            <div className={classes.to}>{props.subject} </div>
            <div>{props.message}</div>
        </div>
    );
};
export default MailList;