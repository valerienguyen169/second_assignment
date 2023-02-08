/*
 *   index.ts
 *   Project: Second Assignment Part 1 and 2
 *
 *   Author: Tran Nguyen
 *   Created on: February 3, 2023
 */

// Import express
import express, { Express } from 'express';

// Import functions from StudentController
import {
  getAllStudents,
  createNewStudent,
  getStudentByName,
  getFinalExamScores,
  calcFinalScore,
  updateGrade,
} from './controllers/StudentController';

// Create your app object
const app: Express = express();
const PORT = 8080;

// Activate json parsing for the request body
app.use(express.json());

// Register your route handlers for the specified endpoints
app.get('/', getAllStudents);
app.post('/students', createNewStudent);
app.get('/students/:studentName', getStudentByName);
app.get('/students/:studentName/finalExam', getFinalExamScores);
app.post('/students/:studentName/finalExam', calcFinalScore);
app.post('/students/:studentName/grades/:assignmentName', updateGrade);

// Start listening on the chosen port
app.listen(PORT, () => {
  console.log(`Listening on port http://127.0.0.1:${PORT}`);
});
