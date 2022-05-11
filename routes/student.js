const router = require("express").Router();
const Students = require("../models/studentdata");

router.post("/addNewStudent", async (req, res) => {
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
      message: "success",
    });
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: e,
    });
  }
});

router.get("/getStudents", async (req, res) => {
  try {
    const students = await Students.find();

    res.status(200).send({
      status: 200,
      data: students,
      message: "success",
    });
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: e,
    });
  }
});

router.delete("/deleteStudent/:id", async (req, res) => {
  try {
    const deleteStudent = await Students.deleteOne({ _id: req.params.id });
    if (deleteStudent) {
      res.status(200).send({
        status: 200,
        message: "delete success",
      });
    }
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: e,
    });
  }
});

router.post("/updateStudent", async (req, res) => {
  try {
    var updateObject = req.body;
    await Students.updateOne({ _id: req.body.id }, { $set: updateObject });

    res.status(200).send({
      status: 200,
      message: "update success",
    });
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: e,
    });
  }
});

module.exports = router;
