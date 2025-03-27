const blacklistTokenModel = require("../models/blacklistToken.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports.authUser = async function (req, res, next) {
  const token = req.cokkies.token || header.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const isBlacklisted = await blacklistTokenModel.findOne({ token: token });

  if (!isBlacklisted) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  const user = await user.findById(decodedToken?._id);

  if (!user) {
    throw new Error("Unauthorized");
  }

  req.user = user;

  return next();
};
