/*
 *   index.ts
 *   Project: Second Assignment
 *
 *   Author: Tran Nguyen
 *   Created on: February 3, 2023
 */

// Import express
import express, { Express } from 'express';

// Import functions from StudentController
import StudentController from './controllers/StudentController';

// Create your app object
const app: Express = express();
const PORT = 8000;

// Activate json parsing for the request body
app.use(express.json());

// Register your route handlers for the specified endpoints
app.post('/api/students', StudentController.createNewStudent);
app.get('/api/students/:studentName', StudentController.getStudentByName);

// Start listening on the chosen port
app.listen(PORT, () => console.log(`Listening on port http://127.0.0.1:${PORT}`));