const Student = require("../models/Student");

async function sortStudentsByScore() {
  const students = await Student.find();
  return students
    .map((student) => {
      const averageScore =
        student.scores.reduce((sum, sub) => sum + sub.score, 0) /
        student.scores.length;
      return { ...student.toObject(), averageScore };
    })
    .sort((a, b) => b.averageScore - a.averageScore);
}

async function displayRankedStudents(students) {
  return students.map((student, index) => ({
    rank: index + 1,
    id: student.id,
    name: student.name,
    averageScore: student.averageScore,
    scores: student.scores,
  }));
}

module.exports = { sortStudentsByScore, displayRankedStudents };
