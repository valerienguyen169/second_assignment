import { Request, Response } from 'express';
import {
  students,
  addStudent,
  getStudent,
  calculateFinalExamScore,
  getLetterGrade,
  updateStudentGrade,
} from '../models/StudentModel';

function getAllStudents(req: Request, res: Response): void {
  res.json(students);
}

function createNewStudent(req: Request, res: Response): void {
  const studentData: NewStudentRequest = req.body as NewStudentRequest;

  const didAddStudent: boolean = addStudent(studentData);

  if (!didAddStudent) {
    res.status(409).send('Could not add student data');
    return;
  }

  res.status(201).send('Student data added successfully');
}

function getStudentByName(req: Request, res: Response): void {
  const { studentName } = req.params as StudentNameParams;
  const student: Student | undefined = getStudent(studentName);

  if (!student) {
    res.status(404).send();
    return;
  }
  res.json(student);
}

function getFinalExamScores(req: Request, res: Response): void {
  // TODO: Get the student name from the path params
  const { studentName } = req.params as StudentNameParams;

  // TODO: Get the student's data from the dataset
  const student: Student | undefined = getStudent(studentName);

  // TODO: If the student was not found
  if (!student) {
    // TODO: responds with status 404 Not Found
    res.status(404).send('Student not found');
    // TODO: terminate the function
    return;
  }

  // TODO: Get the current average and weights from the student's data
  const { currentAverage, weights } = student;
  const { finalExamWeight } = weights;

  // TODO: Calculate the grade needed on the final to score a 90 in the class (this is the grade needed for an A)
  const scoreNeededForA: number = calculateFinalExamScore(currentAverage, finalExamWeight, 90);
  // TODO: Calculate the grade needed on the final to score a 80 in the class (this is the grade needed for a B)
  const scoreNeededForB: number = calculateFinalExamScore(currentAverage, finalExamWeight, 80);
  // TODO: Calculate the grade needed on the final to score a 70 in the class (this is the grade needed for a C)
  const scoreNeededForC: number = calculateFinalExamScore(currentAverage, finalExamWeight, 70);
  // TODO: Calculate the grade needed on the final to score a 60 in the class (this is the grade needed for a D)
  const scoreNeededForD: number = calculateFinalExamScore(currentAverage, finalExamWeight, 60);

  // TODO: Send a JSON response with an object containing the grades needed for an A through D
  res.json({
    A: scoreNeededForA,
    B: scoreNeededForB,
    C: scoreNeededForC,
    D: scoreNeededForD,
  });
}

function calcFinalScore(req: Request, res: Response): void {
  // TODO: Get the student name from the path params
  const { studentName } = req.params as StudentNameParams;

  // TODO: Get the student's data from the dataset
  const student: Student | undefined = getStudent(studentName);

  // TODO: If the student was not found
  if (!student) {
    // TODO: responds with status 404 Not Found
    res.status(404).send('Student not found');
    // TODO: terminate the function
    return;
  }

  // TODO: Get the grade data from the request body as the `AssignmentGrade` type
  const { grade } = req.body as AssignmentGrade;

  // TODO: Get the current average and weights from the student's data
  const { currentAverage, weights } = student;

  // TODO: Calculate the final score that would receive using their current average and the hypothetical final exam grade.
  const overallScore: number = currentAverage + (grade * weights.finalExamWeight) / 100;

  // TODO: Get the letter grade they would receive given this score
  const letterGrade: string = getLetterGrade(overallScore);

  // TODO: Send back a JSON response containing their `overallScore` and `letterGrade.
  res.json({ overallScore, letterGrade });
}

function updateGrade(req: Request, res: Response): void {
  // TODO: Get the student's name and assignment name from the path parameters as a `GradeUpdateParams`
  const { studentName, assignmentName } = req.params as GradeUpdateParams;
  // TODO: Get the grade from the request body as an `AssignmentGrade`
  const { grade } = req.body as AssignmentGrade;
  // TODO: Update the student's grade
  updateStudentGrade(studentName, assignmentName, grade);

  // TODO: If the update did not complete (this means the student or the assignment wasn't found)
  // TODO: respond with status 404 Not Found
  // TODO: terminate the function immediately
  if (!studentName) {
    res.status(404).send('Student not found');
    return;
  }

  if (!assignmentName) {
    res.status(404).send('Assignment not found');
    return;
  }

  // TODO: Respond with status 200 OK
  res.status(200).send('Grade updated successfully');
}

export {
  getAllStudents,
  createNewStudent,
  getStudentByName,
  getFinalExamScores,
  calcFinalScore,
  updateGrade,
};
