const User = require("../modal/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");

//signup
exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  console.log(req.body);

  const user = new User(req.body);

  user.save((err, user) => {
    if (err) {
      if (err.keyPattern.email === 1) {
        return res.status(400).json({
          error: "Email already exit",
        });
      }
      return res.status(400).json({
        error: "Not able save user in db",
      });
    }
    //creating jwt token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    //putting token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //sending response to frontend
    const { _id, name, email } = user;

    return res.json({ token, user: { _id, name, email } });
  });
};

//signin
exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;
  console.log(req.body);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Users email does not exists",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match",
      });
    }

    //creating jwt token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    //putting token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //sending response to frontend
    const { _id, name, email } = user;
    return res.json({ token, user: { _id, name, email } });
  });
};

//signout
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfully",
  });
};

//authorization checking middleware
exports.isSignedIn = expressjwt({
  secret: process.env.SECRET,
  requestProperty: "auth",
  // getToken: (req) => {
  //   return req.cookies.token;
  // },
  algorithms: ["sha1", "RS256", "HS256"],
});
