const User = require("../modal/user");
exports.Data = async (req, res) => {
  try {
    let Result = await User.find();
    res.status(200).send(Result);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
