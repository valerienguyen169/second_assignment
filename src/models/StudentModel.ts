const students: StudentManager = {};

function calculateAverage(weights: CourseGrades): number {
    let totalWeight: number = 0;
    let gradeSum: number = 0;
    const total = weights.assignmentWeights.forEach((courseGrade: CourseGrade) => {
        totalWeight += courseGrade.weight;
        gradeSum += courseGrade.weight * courseGrade.grade;
    })
    return parseFloat((gradeSum / totalWeight).toFixed(2));
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
    const newStudent: Student = {name, weights, currentAverage};

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

  export { students, addStudent, getStudent };