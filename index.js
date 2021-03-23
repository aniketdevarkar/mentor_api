require("dotenv").config();
const express = require("express");
const app = express();
const mongodb = require("mongodb");

const mongoClient = mongodb.MongoClient;
// const dbUrl = "mongodb://127.0.0.1:27017";
//7a6yOjjMXcxWCRBB
const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017";
const port = process.env.PORT || 8080;
let globalIdCount = 1;
app.use(express.json());

// const { students, mentors } = require("./api");

app.get("/", async (req, res) => {
  try {
    let clientInfo = await mongoClient.connect(dbUrl);
    let db = clientInfo.db("mentor_api");
    let data = await db.collection("students").find().toArray();
    res.status(200).json(data);
    clientInfo.close();
  } catch (error) {
    console.log(error);
  }
});

app.get("/students", async (req, res) => {
  try {
    let clientInfo = await mongoClient.connect(dbUrl);
    let db = clientInfo.db("mentor_api");
    let data = await db.collection("students").find().toArray();
    res.status(200).json(data);
    clientInfo.close();
  } catch (error) {
    console.log(error);
  }
});

app.get("/mentors", async (req, res) => {
  try {
    let clientInfo = await mongoClient.connect(dbUrl);
    let db = clientInfo.db("mentor_api");
    let data = await db.collection("mentors").find().toArray();
    res.status(200).json(data);
    clientInfo.close();
  } catch (error) {
    console.log(error);
  }
});

//To create mentor in mentor api
app.post("/createMentor", async (req, res) => {
  try {
    let clientInfo = await mongoClient.connect(dbUrl);
    let db = clientInfo.db("mentor_api");
    let data = await db.collection("mentors").insertOne(req.body);
    res.status(200).json({ mentor: "created" });
    clientInfo.close();
  } catch (error) {
    console.log(error);
  }
});

// //To create student in student api

app.post("/createStudent", async (req, res) => {
  try {
    let clientInfo = await mongoClient.connect(dbUrl);
    let db = clientInfo.db("mentor_api");
    let data = await db.collection("students").insertOne(req.body);
    res.status(200).json({ student: "created" });
    clientInfo.close();
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => console.log("app is running on 8080"));

// //assign students to mentor

// app.put("/assignStudents/:mentor_name", async (req, res) => {
//   try {
//     const mentor_name = req.params.mento_name;
//     const students = req.body;
//     let clientInfo = await mongoClient.connect(dbUrl);
//     let db = clientInfo.db("mentor_api");
//     await db
//       .collection("mentors")
//       .findOneAndUpdate({ mentor_name: `${mentor_name}` }, students);
//     res.status(200).json({ students: "assigned" });
//     clientInfo.close();
//   } catch (error) {
//     console.log(error);
//   }
// });

// // to change mentor or assign mentor to particular student
// app.put("/changeMentor/:mentor_name", async (req, res) => {
//   const mentor_name = req.params.mentor_name;
//   const mentorPresent = mentors.find(
//     (mentor) => mentor.mentor_name === mentor_name
//   );
//   if (!mentorPresent) {
//     return res.status(400).send("mentor is not present with this name");
//   }
//   const student_name = req.query.student_name;

//   const studentPresent = students.find(
//     (student) => student.student_name === student_name
//   );

//   console.log("quer=>>>", student_name);
//   let studentPresentInMentor, mentorIndexToDelete, studentIndexToDelete;
//   await mentors.forEach((mentor, index) => {
//     const dummy = mentor.students_assigned.find(
//       (student, studentIndex) => student.student_name === student_name
//     );
//     if (dummy) {
//       studentPresentInMentor = dummy;
//       mentorIndexToDelete = index;
//       studentIndexToDelete = mentor.students_assigned.indexOf(dummy);
//       mentor.students_assigned.splice(studentIndexToDelete, 1);
//     }
//   });

//   if (!(studentPresentInMentor || studentPresent)) {
//     return res.status(400).send("student is not present");
//   }

//   const mentorIndex = mentors.indexOf(mentorPresent);
//   const studentIndex = students.indexOf(studentPresent);
//   let actualStudent, actualIndex;

//   if (studentPresentInMentor) {
//     actualStudent = studentPresentInMentor;
//     actualIndex = studentIndexToDelete;
//     mentors[mentorIndex].students_assigned.splice(actualIndex, 1);
//   } else {
//     actualIndex = studentIndex;
//     actualStudent = studentPresent;
//     students.splice(actualIndex, 1);
//   }

//   mentors[mentorIndex].students_assigned.push(actualStudent);
//   res.send(actualStudent);
// });

// // to get students assigned to particular mentor
// app.get("/studentsAssigned/:mentor_name", (req, res) => {
//   const mentor_name = req.params.mentor_name;
//   const mentorPresent = mentors.find(
//     (mentor) => mentor.mentor_name === mentor_name
//   );
//   if (!mentorPresent) {
//     return res.status(400).send("Mentor with this name is not present");
//   }
//   res.send(mentorPresent.students_assigned);
// });
