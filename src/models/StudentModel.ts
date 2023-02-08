const students: StudentManager = {};

function calculateAverage(weights: CourseGrades): number {
  let totalWeight: number = 0;
  let gradeSum: number = 0;
  weights.assignmentWeights.forEach((courseGrade: CourseGrade) => {
    totalWeight += courseGrade.weight;
    gradeSum += courseGrade.weight * courseGrade.grade;
  });
  return gradeSum / totalWeight;
}

function addStudent(newStudentData: NewStudentRequest): boolean {
  // Destructure the name and weights
  const { name, weights } = newStudentData;

  // if the name is already in `students`
  // then return false
  if (name in students) {
    return false;
  }

  // Calculate the student's current average (use the function previously defined)
  const currentAverage: number = calculateAverage(weights);

  // Create a `Student` object using the `name`, `weights` and `currentAverage`
  const newStudent: Student = { name, weights, currentAverage };

  // Add the new Student to the `students` object. The student's name is the key
  students[name] = newStudent;

  // Finally, return true since the student was added
  return true;
}

function getStudent(studentName: string): Student | undefined {
  // If the student's name is not in `students`
  // then return undefined
  if (!(studentName in students)) {
    return undefined;
  }

  // Return the student's information (their name is the key for `students`)
  return students[studentName];
}

function calculateFinalExamScore(
  currentAverage: number,
  finalExamWeight: number,
  targetScore: number
): number {
  // TODO: Calculate the final exam score needed to get the targetScore in the class
  const totalWeight: number = 100 - finalExamWeight;
  return (targetScore * 100 - currentAverage * totalWeight) / finalExamWeight;
}

function getLetterGrade(score: number): string {
  // TODO: Return the appropriate letter grade
  if (score >= 90) {
    return 'A';
  }
  if (score >= 80) {
    return 'B';
  }
  if (score >= 70) {
    return 'C';
  }
  if (score >= 60) {
    return 'D';
  }
  return 'F';
}

function updateStudentGrade(
  studentName: string,
  assignmentName: string,
  newGrade: number
): boolean {
  // TODO: Get the student name from the path params
  // TODO: Get the student's data from the dataset
  const student: Student | undefined = students[studentName];

  // TODO: If the student was not found
  if (!student) {
    // TODO: return false
    return false;
  }

  // TODO: Search the student's `assignmentWeights` and find the assignment with the matching name using the .find() method
  const assignment: CourseGrade | undefined = student.weights.assignmentWeights.find(
    (a) => a.name === assignmentName
  );

  // TODO: If the assignment was not found
  if (!assignment) {
    // TODO: return false
    return false;
  }

  // TODO: Set the assignment's grade to the newGrade
  assignment.grade = newGrade;

  // TODO: Then recalculate the student's currentAverage
  student.currentAverage = calculateAverage(student.weights);

  // TODO: return true since the update completed successfully
  return true;
}

export {
  students,
  addStudent,
  getStudent,
  calculateFinalExamScore,
  getLetterGrade,
  updateStudentGrade,
};
