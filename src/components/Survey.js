import React, { useState, useEffect } from "react";
import "survey-core/defaultV2.min.css";
import { Survey } from "survey-react-ui";
import { Model } from "survey-core";
import "../style/survey.css";

const Survey1 = ({ survey }) => {
  // Initialize states
  const [toggle, setToggle] = useState(false);
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState("MIS 111");
  const [textAreaValue, setTextAreaValue] = useState("");

  const questions = [
    {
      id: 1,
      questionText: "How satisfied are you with our service?",
      options: [
        "Very satisfied",
        "Satisfied",
        "Neutral",
        "Dissatisfied",
        "Very dissatisfied",
      ],
    },
    {
      id: 2,
      questionText: "How likely are you to recommend us to a friend?",
      options: [
        "Very likely",
        "Likely",
        "Neutral",
        "Unlikely",
        "Very unlikely",
      ],
    },
    {
      id: 3,
      questionText: "Any additional comments or suggestions?",
      options: [],
    },
  ];

  // Clear text area value whenever selectedSurvey changes
  useEffect(() => {
    setTextAreaValue("");
    setResponses((prevResponses) => ({
      ...prevResponses,
      [3]: "", // Assuming questionId 3 is the text area question
    }));
  }, [selectedSurvey]);

  const handleClassClick = (surveyName) => {
    setSelectedSurvey(surveyName);
  };

  const handleChange = (questionId, value) => {
    setResponses({
      ...responses,
      [questionId]: value,
    });
  };

  const handleTextAreaChange = (e) => {
    const value = e.target.value;
    setTextAreaValue(value);
    handleChange(3, value); // Assuming questionId 3 is the text area question
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Survey Responses:", responses);
    setSubmitted(true);
  };

  if (submitted) {
    return <h2 className="thank-you-message">Thank you for your feedback!</h2>;
  }

  return (
    <div className="layout">
      <div className="sidebar">
        <h2>Table of Contents</h2>
        <div
          className="class-option"
          onClick={() => handleClassClick("MIS 111")}
        >
          MIS 111
        </div>
        <div
          className="class-option"
          onClick={() => handleClassClick("ACCT 200")}
        >
          ACCT 200
        </div>
        <div
          className="class-option"
          onClick={() => handleClassClick("MGMT 202")}
        >
          MGMT 202
        </div>
      </div>
      <div className="content">
        <div className={toggle ? "survey_closed" : "survey_opened"}>
          <form onSubmit={handleSubmit} className="survey-form">
            {questions.map((q) => (
              <div key={q.id} className="question-container">
                <label className="question-label">{q.questionText}</label>
                {q.options.length > 0 ? (
                  <select
                    className="question-select"
                    onChange={(e) => handleChange(q.id, e.target.value)}
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {q.options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <textarea
                    className="question-textarea"
                    value={textAreaValue}
                    onChange={handleTextAreaChange}
                  />
                )}
              </div>
            ))}
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Survey1;
