const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const corss = require("cors");
const port = 3000;

//env config
dotenv.config();

//import routes
const authRoute = require("./routes/auth");
const studentRoute = require("./routes/student");

//connect to db
mongoose.connect(
  "mongodb+srv://admin:AqQuIbf9iihIZduw@cluster0.mgexj.mongodb.net/Data?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    console.log("connected to db!");
  }
);

//Middleware
app.use(express.json());
app.use(corss());

//Route Middlewares
app.use("/api", authRoute);
app.use("/api/student", studentRoute);

app.listen(process.env.PORT || 3003, () =>
  console.log("server is up and running")
);
