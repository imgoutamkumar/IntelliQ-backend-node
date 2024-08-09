const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv").config({ path: "./.env" });
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const Db = require("./config/db");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const authRoute = require("./routes/authRoute");
app.use("/auth", authRoute);

const userRoute = require("./routes/userRoute");
app.use("/user", userRoute);

const quizRoute = require("./routes/quizRoute");
app.use("/quiz", quizRoute);

const examRoute = require("./routes/examRoute");
app.use("/exam", examRoute);

const resultRoute = require("./routes/resultRoute");
app.use("/result", resultRoute);

app.listen(process.env.PORT, async () => {
  await Db.connectDb();
  console.log("Server Connected On Port : ", process.env.PORT);
});
