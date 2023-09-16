import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  // let { token } = req.headers;
  let token = req.cookies?.token;
  !token && res.status(401).json({ Msg: "please provide a token" });
  let decoded = jwt.verify(token, "cr7");
  if (decoded) {
    next();
  } else {
    res.status(401).json({ Msg: "invalid token" });
  }
};
export default auth;
