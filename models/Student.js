const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  scores: [
    {
      subject: { type: String, required: true },
      score: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Student", studentSchema);
