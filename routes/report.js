const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const authenticateToken = require("../middleware/auth");

router.get("/", authenticateToken, async (req, res) => {
  try {
    const students = await Student.find();
    const report = students
      .map((student) => {
        const averageScore =
          student.scores.reduce((sum, sub) => sum + sub.score, 0) /
          student.scores.length;
        return {
          id: student.id,
          name: student.name,
          averageScore,
        };
      })
      .sort((a, b) => b.averageScore - a.averageScore);

    res.json({ report });
  } catch (err) {
    res.status(500).json({ error: "Error generating report.", details: err });
  }
});

router.get("/top/:n", authenticateToken, async (req, res) => {
  const n = parseInt(req.params.n, 10);
  try {
    const students = await Student.find();
    const topStudents = students
      .map((student) => {
        const averageScore =
          student.scores.reduce((sum, sub) => sum + sub.score, 0) /
          student.scores.length;
        return {
          id: student.id,
          name: student.name,
          averageScore,
        };
      })
      .sort((a, b) => b.averageScore - a.averageScore)
      .slice(0, n);

    res.json({ topStudents });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching top students.", details: err });
  }
});

router.get("/below/:threshold", authenticateToken, async (req, res) => {
  const threshold = parseFloat(req.params.threshold);
  try {
    const students = await Student.find();
    const belowThreshold = students.filter((student) => {
      const averageScore =
        student.scores.reduce((sum, sub) => sum + sub.score, 0) /
        student.scores.length;
      return averageScore < threshold;
    });

    res.json({ belowThreshold });
  } catch (err) {
    res.status(500).json({
      error: "Error fetching students below threshold.",
      details: err,
    });
  }
});

router.get("/subject-averages", authenticateToken, async (req, res) => {
  try {
    const students = await Student.find();

    const subjectScores = {};
    students.forEach((student) => {
      student.scores.forEach(({ subject, score }) => {
        if (!subjectScores[subject]) {
          subjectScores[subject] = { total: 0, count: 0 };
        }
        subjectScores[subject].total += score;
        subjectScores[subject].count += 1;
      });
    });

    const subjectAverages = Object.keys(subjectScores).map((subject) => ({
      subject,
      average: subjectScores[subject].total / subjectScores[subject].count,
    }));

    res.json({ subjectAverages });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error calculating subject averages.", details: err });
  }
});

router.get("/full-report", authenticateToken, async (req, res) => {
  try {
    const students = await Student.find();
    const rankedStudents = students
      .map((student) => {
        const averageScore =
          student.scores.reduce((sum, sub) => sum + sub.score, 0) /
          student.scores.length;
        return {
          id: student.id,
          name: student.name,
          averageScore,
          scores: student.scores,
        };
      })
      .sort((a, b) => b.averageScore - a.averageScore)
      .map((student, index) => ({
        rank: index + 1,
        ...student,
      }));

    res.json({ rankedStudents });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error generating full report.", details: err });
  }
});

module.exports = router;
