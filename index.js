const express = require("express");
const {
  addNewStudent,
  getAllStudents,
  getStudentByID,
  updateStudentByID,
  deleteStudentByID,
} = require("./controller/studentController");
const mongoose = require("mongoose");
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json()); // Use express.json() for JSON parsing
app.use(express.urlencoded({ extended: true })); // Use express.urlencoded() for URL-encoded bodies
app.use(express.static("students"));

app
  .route("/student")
  .get((req, res, next) => {
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);
    next();
  }, getAllStudents)
  .post(addNewStudent);

app
  .route("/student/:studentID")
  .get(getStudentByID)
  .put(updateStudentByID)
  .delete(deleteStudentByID);

app.listen(3300, () => {
  console.log(`Application is running on http://127.0.0.1:3300/student`);
});
