const adminAuth = (req, res, next) => {
  console.log("admin auth is getting checked");
  const token = "xyz";
  const isAdmin = token === "xyz";
  if (!isAdmin) {
    res.status(401).send("UnAuthorized");
  } else {
    next();
  }
};
const userAuth = (req, res, next) => {
  console.log("user auth is getting checked");
  const token = "xyz1";
  const isUser = token === "xyz2";
  if (!isUser) {
    res.status(401).send("UnAuthorized");
  } else {
    next();
  }
};
module.exports = {
  adminAuth,
  userAuth,
};
