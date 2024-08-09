const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    questions_list: [
      {
        question: {
          type: String,
          required: true,
        },
        options: [
          String,
          // {
          //   type: String,
          //   required: true,
          // },
        ],
        timer: {
          type: Number,
          required: true,
        },
        answer: {
          type: Number,
          required: true,
        },
      },
    ],

    created_by: {
      type: mongoose.Types.ObjectId,
    },
    is_published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Quiz = mongoose.model("quiz", quizSchema);
module.exports = Quiz;
