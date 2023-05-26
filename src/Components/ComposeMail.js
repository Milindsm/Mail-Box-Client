import {Editor} from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import {useSelector ,useDispatch} from "react-redux";
import { mailActions } from "./Store/MailSlice";
import { useRef } from "react";
import axios from "axios";
import classes from "./ComposeMail.module.css";

import { useNavigate } from "react-router-dom";

const ComposeMail = () => {
    const Navigate = useNavigate();
    const recieverIdRef = useRef();
    const subjectRef = useRef();
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.userId);
    const sender = localStorage.getItem("email");
    const editorState = EditorState.createEmpty();
    let message;
    const onEditorStateChange = (event) => {
        message = event.getCurrentContent().getPlainText();
    };
    const submitHandler = (event) => {
        event.preventDefault();
        const recieverId = recieverIdRef.current.value;
        const subject = subjectRef.current.value;
        const reciever = recieverId.replace(/[@,.]/g, "");
       

        const mailDetails = {
            to: recieverId,
            subject: subject,
            message: message,
        };

        const mailDetail = {
            to: sender,
            subject: subject,
            message: message,
        };

        axios.post(
            `https://mail-box-client-b834a-default-rtdb.firebaseio.com/mails/${reciever}inbox.json`,
            mailDetail
        );
        axios
            .post(
                `https://mail-box-client-b834a-default-rtdb.firebaseio.com/mails/${userId}sentbox.json`,
                mailDetails
            )

            .then((res) => {
                // console.log(res.data);
                alert("Successful");
                Navigate ("/mail-box"); 
                dispatch(
                    mailActions.addMailToList({
                        to: recieverId,
                        subject: subject,
                        message: message,
                        isRead: false,
                        id: res.data.name,
                    })
                );
            })
            .catch((err) => alert(err));
            
           
    };
    

    return (
        <div className={classes.mailBox}>
            <form onSubmit={submitHandler}>
                <div className={classes.reciever}>
                    <p>To</p>
                    <input
                        type="text"
                        id="toAddress"
                        required
                        ref={recieverIdRef}
                    />
                </div>
                <div className={classes.subject}>
                    <input
                        placeholder="subject"
                        type="text"
                        id="subject"
                        ref={subjectRef}
                    />
                </div>
                <div className={classes.footer}>
                    <div>
                        <Editor
                            EditorState={editorState}
                            onEditorStateChange={onEditorStateChange}
                            wrapperClassName={classes.wrapper}
                            editorClassName={classes.editor}
                            toolbarClassName={classes.toolBar}
                            toolbar={{
                                inline: { inDropdown: true },
                                list: { inDropdown: true },
                                textAlign: { inDropdown: true },
                                link: { inDropdown: true },
                                history: { inDropdown: true },
                            }}
                        />
                        <button className={classes.sendButton}>send</button>
                    </div>
                </div>
            </form>
        </div>
        
    );
};

export default ComposeMail;