import { Request, Response } from 'express';
import { students, addStudent, getStudent } from '../models/StudentModel';

function getAllStudents(req: Request, res: Response): void {
  res.json(students);
}

function createNewStudent(req: Request, res: Response): void {
    const studentData = req.body as NewStudentRequest;
  
    const didAddStudent = addStudent(studentData);
  
    if (!didAddStudent) {
      res.status(409).send("Could not add student data");
      return;
    }
  
    res.status(201).send("Student data added successfully");
  }

  function getStudentByName(req: Request, res: Response): void {
    const { studentName } = req.params as StudentNameParams;
    const student = getStudent(studentName);
  
    if (!student) {
      res.status(404).send();
      return;
    }
    res.json(student);
  }

export default {getAllStudents, createNewStudent, getStudentByName};