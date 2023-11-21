const mongoose = require("mongoose");
const Student = mongoose.model(
  "Student",
  require("../models/Student").studentSchema
);

module.exports.addNewStudent = async (req, res) => {
  try {
    let newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();

    console.log("Saved Student:", savedStudent);

    // Retrieve the saved document from the database
    const fullDocument = await Student.findById(savedStudent._id).exec();

    res.json(fullDocument);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports.getAllStudents = (req, res) => {
  Student.find({})
    .exec()
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

module.exports.getStudentByID = (req, res) => {
  Student.findById(req.params.studentID)
    .exec()
    .then((student) => {
      if (!student) {
        res.status(404).json({ message: "Student not found" });
      } else {
        res.json(student);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

module.exports.updateStudentByID = (req, res) => {
  Student.findByIdAndUpdate(req.params.studentID, req.body, { new: true })
    .exec()
    .then((updatedStudent) => {
      if (!updatedStudent) {
        res.status(404).json({ message: "Student not found" });
      } else {
        res.json(updatedStudent);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

module.exports.deleteStudentByID = (req, res) => {
  Student.findByIdAndDelete(req.params.studentID)
    .exec()
    .then((deletedStudent) => {
      if (!deletedStudent) {
        res.status(404).json({ message: "Student not found" });
      } else {
        res.json({ message: "Successfully deleted student from records" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};
