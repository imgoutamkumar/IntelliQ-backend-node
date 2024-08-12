const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);
  try {
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      res.send("user already exist with this email");
      throw new Error("user already exist with this email");
    }
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 86400000,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUserExist = await User.findOne({ email });
    if (!isUserExist) {
      return res.status(400).send("User not registered");
    } else {
      const match = await bcrypt.compare(password, isUserExist.password);
      if (match) {
        const token = jwt.sign(
          {
            userId: isUserExist._id,
            role: isUserExist.role,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1d" }
        );
        /* await res.cookie("token", token, {
          httpOnly: true,
        }); */

        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          maxAge: 86400000,
        });

        return res.status(200).send({
          message: "login success",
          userId: isUserExist._id,
          jwt: token,
          role: isUserExist.role,
        });
      } else {
        return res.status(400).send("incorrect password");
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("something went wrong");
  }
};

const logOut = (req, res) => {
  console.log("logout called");
  res.cookie("token", "", {
    expires: new Date(0),
  });
  res.status(200).send({ message: "logout" });
};

const isUserLoggedIn = (req, res) => {
  try {
    console.log(req.cookies["token"]);
    /* token = req.cookie("token");
    //const token = authHeader.split(" ")[1];
    console.log(req.cookies.token);
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decodeToken.userId;
    req.role = decodeToken.role;
    if (req.userId && req.role) {
      res.status(200).send({
        userId: req.userId,
        role: req.role,
      });
    } */
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registerUser, loginUser, logOut, isUserLoggedIn };
