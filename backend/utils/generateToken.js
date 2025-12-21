import jwt from "jsonwebtoken";

export const generateToken = (id) => {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error("JWT_ACCESS_SECRET missing");
  }

  return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "1d",
  });
};
