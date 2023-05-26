import { createSlice } from "@reduxjs/toolkit";

const initialMailState = {
    mails: [],
    unread: 0,
    currentMail: {},
    inbox: true,
};

const mailSlice = createSlice({
    name: "mails",
    initialState: initialMailState,
    reducers: {
        setInboxTrue(state, action) {
            state.inbox = action.payload;
        },
        addMail(state, action) {
            state.mails = action.payload;
            state.unread = 0;
            state.mails.forEach((mail) => {
                if (!mail.isRead) {
                    state.unread++;
                }
                
            });
        },
        sentMail(state, action) {
            state.mails = action.payload;
        },
        addMailToList(state, action) {
            if (
                localStorage.getItem("email").replace(/[@,.]/g, "") ===
                localStorage.getItem("reciever")
            ) {
                const newMail = action.payload;
                state.mails.push({
                    subject: newMail.subject,
                    message: newMail.message,
                    id: newMail.id,
                    to: newMail.to,
                    isRead: newMail.isRead,
                });
                state.unread++;
            }
        },
        deleteMail(state, action) {
            const id = action.payload;
            state.mails = state.mails.filter((mail) => mail.id !== id);
        },
        updateMail(state, action) {
            const updatedMail = action.payload;
            state.currentMail = updatedMail;
            const existingMail = state.mails.find(
                (mail) => mail.id === updatedMail.id
            );
            const existingMailIndex = state.mails.findIndex(
                (mail) => mail.id === updatedMail.id
            );
            if (state.inbox && !existingMail.isRead) {
                state.unread--;
                state.mails.splice(existingMailIndex, 1, updatedMail);
            }
            if (!state.inbox && !existingMail.isRead) {
                state.mails.splice(existingMailIndex, 1, updatedMail);
            }
        },
    },
});

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;