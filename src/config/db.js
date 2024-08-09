const mongoose = require("mongoose");
// "mongodb+srv://admin:admin123@cluster0.fayn6vz.mongodb.net/quizDB?retryWrites=true&w=majority";
const mongodbUrl = process.env.MONGODB_URL;
/* "mongodb+srv://Intelliq:IntelliQ123456789@cluster0.rwjfoyk.mongodb.net/QuizDB?retryWrites=true&w=majority&appName=Cluster0" */

const connectDb = () => {
  return mongoose
    .connect(mongodbUrl)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((error) => console.log(error));
};

module.exports = { connectDb };
