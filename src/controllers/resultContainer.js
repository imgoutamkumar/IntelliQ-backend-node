const Result = require("../models/result");

const getResult = async (req, res) => {
  try {
    const result = await Result.findById(req.params.resultId);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getResult };
