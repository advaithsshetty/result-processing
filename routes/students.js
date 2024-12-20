const express = require("express");
const Student = require("../models/Student");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

router.post("/", authenticateToken, async (req, res) => {
  const { id, name, scores } = req.body;
  if (!id || !name || !Array.isArray(scores) || scores.length === 0) {
    return res
      .status(400)
      .json({ error: "ID, name, and scores are required." });
  }

  const student = new Student({ id, name, scores });
  try {
    await student.save();
    res.status(201).json({ message: "Student added successfully.", student });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error adding student.", details: err.message });
  }
});

router.get("/", authenticateToken, async (req, res) => {
  try {
    const students = await Student.find();
    const sortedStudents = students
      .map((student) => {
        const averageScore =
          student.scores.reduce((sum, sub) => sum + sub.score, 0) /
          student.scores.length;
        return { ...student.toObject(), averageScore };
      })
      .sort((a, b) => b.averageScore - a.averageScore);

    const rankedStudents = sortedStudents.map((student, index) => ({
      rank: index + 1,
      id: student.id,
      name: student.name,
      averageScore: student.averageScore,
      scores: student.scores,
    }));

    res.json(rankedStudents);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching students.", details: err.message });
  }
});

router.get("/:id", authenticateToken, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const student = await Student.findOne({ id });
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ error: "Student not found." });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error searching for student.", details: err.message });
  }
});

router.put("/:id", authenticateToken, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, scores } = req.body;

  try {
    const student = await Student.findOne({ id });
    if (!student) {
      return res.status(404).json({ error: "Student not found." });
    }

    if (name) student.name = name;
    if (Array.isArray(scores)) student.scores = scores;

    await student.save();
    res.json({ message: "Student updated successfully.", student });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error updating student.", details: err.message });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const student = await Student.findOneAndDelete({ id });
    if (student) {
      res.json({ message: "Student deleted successfully.", student });
    } else {
      res.status(404).json({ error: "Student not found." });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error deleting student.", details: err.message });
  }
});

module.exports = router;
