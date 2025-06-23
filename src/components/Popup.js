import React, { useState } from "react";
import axios from "axios";

const Popup = ( props ) => {
    const { setNetID, popup, setPopup, popupData, setThreadID } = props;

    const [input, setInput] = useState('');
    const [error, setError] = useState(false);

    // Handles passcode login
    const passcodeLogin = async () => {
        try {
            const response = await axios({
                url: `${process.env.REACT_APP_BACKEND_URL}/routes/passcode-login`,
                method: 'POST',
                responseType: 'json',
                data: { passcode: input },
            });

            // Store the temporary netID and token in local storage
            localStorage.setItem('netID', response.data.NetID);
            localStorage.setItem('token', response.data.token);
            setNetID(localStorage.getItem('netID'))

            setError(false);
            setInput('');
            setPopup(false)
        } catch (error) {
            setInput('');
            setError(true);
            console.error('Error in login:', error);
        }
    }

    return (
        <>
        <div className={popup ? "popup_bg popup_bg_open" : "popup_bg"}></div>
        <div className={popup ? "popup popup_open" : "popup"}>
            <div className="popup_top_bar">
                <div className="popup_title">{popupData?.title}</div><br/>
                <button type="button" className="close_popup_button" onClick={() => {setPopup(false)}}><i className="material-symbols-outlined" style={{ color: "var(--chat000)" }}>close</i></button>
            </div>

            <div className="popup_container">
                {popupData?.title === "Enter passcode" ? <>
                    <span style={{ color: !error ? "var(--chat000)" : "#e75151", fontSize: "17px" }}>{!error ? "Enter a passcode to continue." : "Passcode is incorrect."}</span><br/><br/>

                    <input name="input" type="password" className="form_chatui" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => {if (e.key === 'Enter' && !e.shiftKey) {passcodeLogin()}}}/>

                    <br/><button className="gpt_button_green" onClick={() => {passcodeLogin()}}>Log in</button>
                </>
                : <>
                    {popupData?.text}<br/>

                    {popupData?.button_text && <><br/><br/>
                        <button className="gpt_button" onClick={() => {setPopup(false)}}>Cancel</button>
                        <button className="gpt_button_red" onClick={popupData?.button_function}>{popupData?.button_text}</button>
                </>}
                </>}
            </div>
        </div>
        </>
    )
}

export default Popup;