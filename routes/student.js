const router = require("express").Router();
const Students = require("../models/studentdata");
const verifyToken = require("../verifyToken");

router.post("/add-new-student", verifyToken, async (req, res) => {
  try {
    student = new Students({
      studentFirstName: req.body.studentFirstName,
      studentMiddleName: req.body.studentMiddleName,
      studentLastName: req.body.studentLastName,
      studentEmail: req.body.studentEmail,
      studentContactNumber: req.body.studentContactNumber,
      studentBirthdate: req.body.studentBirthdate,
      studentGender: req.body.studentGender,
    });

    await student.save();

    res.status(200).send({
      status: 200,
      message: "Success",
    });
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: e,
    });
  }
});

router.get("/get-students", verifyToken, async (req, res) => {
  try {
    const students = await Students.find();

    res.status(200).send({
      status: 200,
      data: students,
      message: "Success",
    });
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: e,
    });
  }
});

router.delete("/delete-student/:id", verifyToken, async (req, res) => {
  try {
    const deleteStudent = await Students.deleteOne({ _id: req.params.id });
    if (deleteStudent) {
      res.status(200).send({
        status: 200,
        message: "Delete Success",
      });
    }
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: e,
    });
  }
});

router.post("/update-student", verifyToken, async (req, res) => {
  try {
    var updateObject = req.body;
    await Students.updateOne({ _id: req.body.id }, { $set: updateObject });

    res.status(200).send({
      status: 200,
      message: "Update Success",
    });
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: e,
    });
  }
});

module.exports = router;
