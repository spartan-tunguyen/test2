import React, { useState } from "react";
import "../style/surveyBuilder.css";

const SurveyBuilder = () => {
  const [year, setYear] = useState("");
  const [clss, setClss] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("short-answer");
  const [options, setOptions] = useState([""]);
  const [scale, setScale] = useState({
    min: 1,
    max: 5,
    minLabel: "",
    maxLabel: "",
  });
  const [selectedScales, setSelectedScales] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = options.slice();
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleScaleChange = (e) => {
    const { name, value } = e.target;
    setScale({ ...scale, [name]: value });
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText,
        questionType,
        options:
          questionType === "multiple-choice" || questionType === "checkboxes"
            ? options.filter((option) => option !== "")
            : [],
        scale: questionType === "linear-scale" ? scale : null,
      },
    ]);
    setQuestionText("");
    setQuestionType("short-answer");
    setOptions([""]);
    setScale({ min: 1, max: 5, minLabel: "", maxLabel: "" });
    setSelectedScales({});
  };

  const handleDeleteQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
    setSelectedScales((prev) => {
      const newScales = { ...prev };
      delete newScales[index];
      return newScales;
    });
  };

  const handleEditQuestion = (index) => {
    const questionToEdit = questions[index];
    setQuestionText(questionToEdit.questionText);
    setQuestionType(questionToEdit.questionType);
    setOptions(questionToEdit.options || [""]);
    setScale(
      questionToEdit.scale || { min: 1, max: 5, minLabel: "", maxLabel: "" }
    );
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Survey Questions:", questions);
  };

  const handleSliderChange = (index, value) => {
    setSelectedScales((prev) => ({
      ...prev,
      [index]: Number(value),
    }));
  };

  if (submitted) {
    return <h2>Survey created successfully!</h2>;
  }

  return (
    <div className="survey-builder">
      <h1>Survey Builder</h1>
      <form onSubmit={handleSubmit} className="surveyBuilder-form">
        <div className="input-group">
          <label>Year:</label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Class:</label>
          <input
            type="text"
            value={clss}
            onChange={(e) => setClss(e.target.value)}
          />
        </div>

        <div className="question-section">
          <div className="question-input-group">
            <label>Question:</label>
            <input
              type="text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
          </div>
          <div className="question-type-group">
            <label>Question Type:</label>
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
            >
              <option value="short-answer">Short Answer</option>
              <option value="multiple-choice">Multiple Choice</option>
              <option value="checkboxes">Checkboxes</option>
              <option value="linear-scale">Linear Scale</option>
            </select>
          </div>
        </div>

        {(questionType === "multiple-choice" ||
          questionType === "checkboxes") &&
          options.map((option, index) => (
            <div className="option-group" key={index}>
              <label>Option {index + 1}:</label>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            </div>
          ))}

        {(questionType === "multiple-choice" ||
          questionType === "checkboxes") && (
          <button
            type="button"
            onClick={handleAddOption}
            className="add-option-button"
          >
            Add Option
          </button>
        )}

        {questionType === "linear-scale" && (
          <div className="scale-group">
            <label>Scale:</label>
            <input
              type="number"
              name="min"
              value={scale.min}
              onChange={handleScaleChange}
              placeholder="Min"
            />
            <label>to</label>
            <input
              type="number"
              name="max"
              value={scale.max}
              onChange={handleScaleChange}
              placeholder="Max"
            />
            <div className="scale-labels">
              <label>Min Label:</label>
              <input
                type="text"
                name="minLabel"
                value={scale.minLabel}
                onChange={handleScaleChange}
              />
              <label>Max Label:</label>
              <input
                type="text"
                name="maxLabel"
                value={scale.maxLabel}
                onChange={handleScaleChange}
              />
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={handleAddQuestion}
          className="add-question-button"
        >
          + Add Question
        </button>

        <button type="submit" className="submit-button">
          Submit Survey
        </button>
        <div className="survey-preview">
          <h2>Survey Preview</h2>
          {questions.map((q, index) => (
            <div key={index} className="question-preview">
              <span
                className="delete-question"
                onClick={() => handleDeleteQuestion(index)}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3976/3976961.png"
                  alt="delete"
                  className="trash-can-icon"
                />
                <span className="tooltip-text">Delete</span>
              </span>
              <span
                className="edit-question"
                onClick={() => handleEditQuestion(index)}
              >
                <img
                  src="https://static.thenounproject.com/png/2473159-200.png"
                  alt="edit"
                  className="edit-icon"
                />
                <span className="tooltip-text">Edit</span>
              </span>
              <p className="question-text">{q.questionText}</p>
              {q.questionType === "multiple-choice" ? (
                q.options.map((option, idx) => (
                  <div key={idx} className="option-preview">
                    <input type="radio" name={`question-${index}`} />
                    <span>{option}</span>
                  </div>
                ))
              ) : q.questionType === "checkboxes" ? (
                q.options.map((option, idx) => (
                  <div key={idx} className="option-preview">
                    <input type="checkbox" name={`question-${index}`} />
                    <span>{option}</span>
                  </div>
                ))
              ) : q.questionType === "linear-scale" ? (
                <div className="scale-preview">
                  <label>{q.scale.minLabel}</label>
                  <input
                    type="range"
                    min={q.scale.min}
                    max={q.scale.max}
                    value={selectedScales[index] || q.scale.min}
                    onChange={(e) => handleSliderChange(index, e.target.value)}
                  />
                  <label>{q.scale.maxLabel}</label>
                  <div>Selected Value: {selectedScales[index]}</div>
                </div>
              ) : q.questionType === "short-answer" ? (
                <textarea
                  className="short-answer-textarea"
                  placeholder="Your answer here"
                />
              ) : null}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default SurveyBuilder;
