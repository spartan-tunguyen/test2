import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Popup from "./Popup";
import "../style/topbar.css";
const Topbar = (props) => {
  const { admin, netID, setNetID, setToken } = props;
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);
  const [popupData, setPopupData] = useState(null);

  // let backend_url = process.env.REACT_APP_BACKEND_URL;
  let backend_url = "http://localhost:9000";
  let login_url = `${backend_url}/routes/login`;

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logout = () => {
    localStorage.setItem("netID", null);
    localStorage.setItem("token", null);
    setNetID(null);
    setToken(null);
    navigate("/");
  };

  const toggleDropdown = () => {
    console.log(dropdownOpen);
    setDropdownOpen(!dropdownOpen);
  };

  const UserDropdownMenu = () => {
    return (
      <div className={`user_dropdown_menu ${dropdownOpen ? "show" : ""}`}>
        <button
          type="button"
          className="user_dropdown_button"
          onClick={() => {
            navigate("/admin");
            setDropdownOpen(false);
          }}
        >
          {" "}
          Admin Panel
        </button>
        <button
          type="button"
          className="user_dropdown_button"
          onClick={() => {
            setDropdownOpen(false);
          }}
        >
          Survey Builder
        </button>
        <button
          type="button"
          className="user_dropdown_button"
          onClick={() => {
            logout();
            setDropdownOpen(false);
          }}
        >
          {" "}
          Log Out
        </button>
      </div>
    );
  };

  useEffect(() => {
    if (!netID || netID === "null") {
      console.log("no netID found");
    }
  }, [netID]);

  return (
    <>
      {/* <Popup popupData={popupData} popup={popup} setPopup={setPopup} /> */}
      <header className="topbar">
        <div className="red_banner">
          <img className="mini_logo" src={require("../images/logo.webp")} />
          {
            <>
              {!netID || netID === "null" ? (
                <a href={login_url}>
                  <button className="other_menu_button">
                    Log in
                    {/* <i className="material-symbols-outlined inline-icon" style={{ color: "white" }}>login</i> */}
                  </button>
                </a>
              ) : (
                <button className="netid_menu_button" onClick={toggleDropdown}>
                  {netID}
                </button>
              )}
            </>
          }
        </div>

        <div className="white_banner">
          <div className="logo_container">
            <img className="logo" src={require("../images/logo.webp")} />
          </div>
          <div className="menu_button_container">
            <button
              type="button"
              className="menu_button"
              onClick={() => {
                navigate("/survey");
              }}
            >
              Survey
            </button>
            <button
              type="button"
              className="menu_button"
              onClick={() => {
                navigate("/surveyContainer");
              }}
            >
              Survey Tracker
            </button>
            <button
              type="button"
              className="menu_button"
              onClick={() => {
                navigate("/surveyBuilder");
              }}
            >
              Survey Builder
            </button>
            {/* <button type="button" className="menu_button" onClick={() => {setPopupData({title: "Enter passcode"}); setPopup(true)}}>Survey Builder</button> */}
          </div>
        </div>

        <UserDropdownMenu />
      </header>
    </>
  );
};

export default Topbar;
