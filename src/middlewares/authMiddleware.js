const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    const token = authHeader.split(" ")[1];

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decodeToken.userId;
    req.role = decodeToken.role;
    if (req.userId) {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

/* const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies["token"];
    if (!token) {
      return res.status(401).json({
        message: "unauthorized",
      });
    }

    const decodeToken = jwt.verify(token, "longtoughsecretkey");
    req.userId = decodeToken.userId;
    req.role = decodeToken.role;
    if (req.userId) {
      next();
    }
  } catch (error) {
    console.log(error);
  }
}; */

const isRoleAdmin = (req, res, next) => {
  try {
    const role = req.role;
    if (role === "admin") {
      next();
    } else {
      console.log("Authorization Denied");
    }
  } catch (error) {
    console.log(error);
  }
};

const isRoleUser = (req, res, next) => {
  try {
    const role = req.role;
    if (role === "user") {
      next();
    } else {
      console.log("Authorization Denied");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { isAuthenticated, isRoleAdmin, isRoleUser };
