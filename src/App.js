import React, { useState, useEffect } from "react";
import {
  useLocation,
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import axios from "axios";

import Home from "./components/Home";
import Admin from "./components/Admin";
import Survey from "./components/Survey";
import Topbar from "./components/Topbar";
import SurveyContainer from "./components/SurveyContainer";
import SurveyBuilder from "./components/SurveyBuilder";
import StudentList from "./components/StudentList";
import Chat from "./components/Chat";
import ChatBot from "./components/ChatBot";
import "./App.css";
// const App = (props) => {

//   const [state, setState] = useState({ apiResponse: "" });

//   return (
//     <div className="app-container">
//       <BrowserRouter>
//         <Content />
//       </BrowserRouter>
//     </div>
//   );
// }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }
  render() {
    return (
      <div className="app-container">
        <BrowserRouter>
          <Content />
        </BrowserRouter>
      </div>
    );
  }
}

const Content = () => {
  // Initialize state variables
  const [netID, setNetID] = useState(localStorage.getItem("netID") || null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const location = useLocation();

  // Read query string with login data
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const netID = queryParams.get("netID");
    const token = queryParams.get("token");

    if (netID && token) {
      // store the netID and token in local storage
      localStorage.setItem("netID", netID);
      localStorage.setItem("token", token);
      setNetID(localStorage.getItem("netID"));
      console.log(netID);
      // Redirect to the homepage
      window.location.href = "/";
    }
  }, [location]);

  // Update theme colors
  useEffect(() => {
    if (theme === "dark") {
      // todo: add dark theme colors
    } else {
      // todo: add light theme colors
    }
  }, [theme]);

  return (
    <>
      <Topbar netID={netID} setNetID={setNetID} setToken={setToken} />
      <Routes>
        <Route path="*" exact element={<Navigate to="/" />} />
        <Route path="/" exact element={<Home />} />
        <Route path="/survey" exact element={<Survey />} />
        <Route path="/admin" exact element={<Admin />} />
        <Route path="/surveyContainer" exact element={<SurveyContainer />} />
        <Route path="/surveyBuilder" exact element={<SurveyBuilder />} />
        <Route path="/studentList" exact element={<StudentList />} />
        <Route path="/chat" exact element={<Chat />} />
      </Routes>
      <ChatBot></ChatBot>
    </>
  );
};

export default App;
