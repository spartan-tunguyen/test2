import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';

// // Mock data
// const classes = [
//   { id: 1, name: 'Math 101' },
//   { id: 2, name: 'History 201' },
//   { id: 3, name: 'Science 301' },
// ];

// const students = {
//   1: [
//     { name: 'Alice', net_id: 'a123' },
//     { name: 'Bob', net_id: 'b456' },
//   ],
//   2: [
//     { name: 'Charlie', net_id: 'c789' },
//     { name: 'David', net_id: 'd012' },
//   ],
//   3: [
//     { name: 'Eve', net_id: 'e345' },
//     { name: 'Frank', net_id: 'f678' },
//   ],
// };

// const quizzes = {
//   1: [
//     { id: 1, name: 'Quiz 1' },
//     { id: 2, name: 'Quiz 2' },
//   ],
//   2: [
//     { id: 3, name: 'Quiz A' },
//     { id: 4, name: 'Quiz B' },
//   ],
//   3: [
//     { id: 5, name: 'Quiz Alpha' },
//     { id: 6, name: 'Quiz Beta' },
//   ],
// };

// const completionStatus = {
//   1: {
//     1: { a123: true, b456: false },
//     2: { a123: false, b456: true },
//   },
//   2: {
//     3: { c789: true, d012: true },
//     4: { c789: false, d012: false },
//   },
//   3: {
//     5: { e345: true, f678: true },
//     6: { e345: true, f678: false },
//   },
// };

// // Set up the mock API
// const mock = new MockAdapter(axios);

// mock.onGet('/api/classes').reply(200, classes);

// mock.onGet(/\/api\/classes\/\d+\/students/).reply((config) => {
//   const classId = config.url.match(/\/api\/classes\/(\d+)\/students/)[1];
//   return [200, students[classId] || []];
// });

// mock.onGet(/\/api\/classes\/\d+\/quizzes/).reply((config) => {
//   const classId = config.url.match(/\/api\/classes\/(\d+)\/quizzes/)[1];
//   return [200, quizzes[classId] || []];
// });

// mock.onGet(/\/api\/classes\/\d+\/quizzes\/\d+\/completion-status/).reply((config) => {
//   const [classId, quizId] = config.url.match(/\/api\/classes\/(\d+)\/quizzes\/(\d+)\/completion-status/).slice(1);
//   return [200, completionStatus[classId][quizId] || {}];
// });
