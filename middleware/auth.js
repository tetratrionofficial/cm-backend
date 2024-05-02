const jwt = require("jsonwebtoken");
exports.auth = async (req, res, next) => {
  const { authorization } = req.headers;
  const token=authorization;
  if (!token) {
    res.status(403).json({
      status: 1,
      message: "UnAuhorized",
    });
  }
  console.log(token,"-------",process.env.ACCESS_TOKEN_SECRET);
  const verifyToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  console.log(verifyToken,"verifyToken");
  if (!verifyToken) {
    res.json({
      status: 1,
      message: "Invalid token",
    });
  }
  req.user = verifyToken;
  next();
};
