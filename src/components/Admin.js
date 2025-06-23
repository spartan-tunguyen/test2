import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [completionStatus, setCompletionStatus] = useState({});
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    // Fetch classes from the backend
    axios.get('/api/classes')
      .then(response => {
        setClasses(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the classes!', error);
      });
  }, []);

  const handleClassClick = (classId) => {
    setSelectedClass(classId);
    setSelectedQuiz(null); // Reset selected quiz when a new class is selected

    // Fetch students for the selected class from the backend
    axios.get(`/api/classes/${classId}/students`)
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the students!', error);
      });

    // Fetch quizzes for the selected class from the backend
    axios.get(`/api/classes/${classId}/quizzes`)
      .then(response => {
        setQuizzes(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the quizzes!', error);
      });
  };

  const handleQuizClick = (quizId) => {
    setSelectedQuiz(quizId);

    // Fetch completion status for the selected quiz
    axios.get(`/api/classes/${selectedClass}/quizzes/${quizId}/completion-status`)
      .then(response => {
        setCompletionStatus(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the completion status!', error);
      });
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '30%', borderRight: '1px solid #ccc', padding: '10px' }}>
        <h2>Classes</h2>
        <ul>
          {classes.map((classItem) => (
            <li key={classItem.id} onClick={() => handleClassClick(classItem.id)} style={{ cursor: 'pointer', marginBottom: '5px' }}>
              {classItem.name}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ width: '35%', borderRight: '1px solid #ccc', padding: '10px' }}>
        <h2>Students in Class: {selectedClass}</h2>
        {students.length > 0 ? (
          <ul>
            {students.map((student) => (
              <li key={student.net_id}>{student.name} ({student.net_id})</li>
            ))}
          </ul>
        ) : (
          <p>No students found.</p>
        )}

        <h2>Quizzes in Class: {selectedClass}</h2>
        {quizzes.length > 0 ? (
          <ul>
            {quizzes.map((quiz) => (
              <li key={quiz.id} onClick={() => handleQuizClick(quiz.id)} style={{ cursor: 'pointer', marginBottom: '5px' }}>
                {quiz.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No quizzes found.</p>
        )}
      </div>
      <div style={{ width: '35%', padding: '10px' }}>
        <h2>Completion Status for Quiz: {selectedQuiz}</h2>
        {selectedQuiz && (
          <ul>
            {students.map((student) => (
              <li key={student.net_id}>
                {student.name} ({student.net_id}): {completionStatus[student.net_id] ? 'Completed' : 'Not Completed'}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Admin;
