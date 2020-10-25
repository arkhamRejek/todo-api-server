import jwt from "jsonwebtoken";

export function verifyAuth(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;

    next();
  } catch (err) {
    // err
    return res.status(401).send(err);
  }
}
