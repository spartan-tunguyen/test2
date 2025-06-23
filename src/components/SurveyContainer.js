import React, { useState, useEffect } from "react";
import "survey-core/defaultV2.min.css";
import "../style/surveyContainer.css";

const SurveyContainer = () => {
  const [selectedClass, setSelectedClass] = useState("MIS 111");
  const [surveyResponses, setSurveyResponses] = useState({});
  const [surveySubmitted, setSurveySubmitted] = useState({});
  const [textAreaValues, setTextAreaValues] = useState({});
  const [unfinishedSurveys, setUnfinishedSurveys] = useState({});

  const classes = {
    "MIS 111": [
      { id: 1, dueDate: "September 30, 2024" },
      { id: 2, dueDate: "October 5, 2024" },
    ],
    "ACCT 200": [
      { id: 1, dueDate: "October 15, 2024" },
      { id: 2, dueDate: "November 1, 2024" },
    ],
    "MGMT 202": [
      { id: 1, dueDate: "November 1, 2024" },
      { id: 2, dueDate: "December 5, 2024" },
    ],
  };

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

  useEffect(() => {
    const initializeState = () => {
      const surveyCounts = Object.keys(classes).reduce((acc, className) => {
        acc[className] = classes[className].length;
        return acc;
      }, {});

      setUnfinishedSurveys(surveyCounts);
      setTextAreaValues((prevValues) => ({
        ...prevValues,
        [selectedClass]: classes[selectedClass].reduce((acc, survey) => {
          acc[survey.id] = "";
          return acc;
        }, {}),
      }));
      setSurveyResponses((prevResponses) => ({
        ...prevResponses,
        [selectedClass]: classes[selectedClass].reduce((acc, survey) => {
          acc[survey.id] = {};
          return acc;
        }, {}),
      }));
      setSurveySubmitted((prevSubmitted) => ({
        ...prevSubmitted,
        [selectedClass]: {},
      }));
    };

    initializeState();
  }, [selectedClass]);

  const handleClassClick = (className) => {
    setSelectedClass(className);
  };

  const handleChange = (surveyId, questionId, value) => {
    setSurveyResponses((prevResponses) => ({
      ...prevResponses,
      [selectedClass]: {
        ...prevResponses[selectedClass],
        [surveyId]: {
          ...prevResponses[selectedClass][surveyId],
          [questionId]: value,
        },
      },
    }));
  };

  const handleTextAreaChange = (surveyId, e) => {
    const value = e.target.value;
    setTextAreaValues((prevValues) => ({
      ...prevValues,
      [selectedClass]: {
        ...prevValues[selectedClass],
        [surveyId]: value,
      },
    }));
    handleChange(surveyId, 3, value);
  };

  const handleSubmit = (surveyId, e) => {
    e.preventDefault();
    console.log(
      `Survey Responses for ${selectedClass} Survey ${surveyId}:`,
      surveyResponses[selectedClass][surveyId]
    );
    setSurveySubmitted((prevSubmitted) => ({
      ...prevSubmitted,
      [selectedClass]: {
        ...prevSubmitted[selectedClass],
        [surveyId]: true,
      },
    }));
    setUnfinishedSurveys((prevCounts) => ({
      ...prevCounts,
      [selectedClass]: prevCounts[selectedClass] - 1,
    }));
  };

  return (
    <div className="layout">
      <div className="sidebar">
        <h2>Table of Contents</h2>
        {Object.keys(classes).map((className) => (
          <div
            key={className}
            className="class-option"
            onClick={() => handleClassClick(className)}
          >
            {className}
            <span className="survey-count">
              {unfinishedSurveys[className] > 0
                ? unfinishedSurveys[className]
                : "✔️"}
            </span>
          </div>
        ))}
      </div>
      <div className="content">
        <h2 className="survey-title">{selectedClass}</h2>
        {classes[selectedClass].map((survey) => (
          <div key={survey.id} className="survey-section">
            <p className="due-date">Due: {survey.dueDate}</p>
            {surveySubmitted[selectedClass]?.[survey.id] ? (
              <h2 className="thank-you-message">
                Thank you for your feedback!
              </h2>
            ) : (
              <form
                onSubmit={(e) => handleSubmit(survey.id, e)}
                className="surveyContainer-form"
              >
                {questions.map((q) => (
                  <div key={q.id} className="question-container">
                    <label className="question-label">{q.questionText}</label>
                    {q.options.length > 0 ? (
                      <select
                        className="question-select"
                        onChange={(e) =>
                          handleChange(survey.id, q.id, e.target.value)
                        }
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
                        value={textAreaValues[selectedClass]?.[survey.id] || ""}
                        onChange={(e) => handleTextAreaChange(survey.id, e)}
                      />
                    )}
                  </div>
                ))}
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveyContainer;
