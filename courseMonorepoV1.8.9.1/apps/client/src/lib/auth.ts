import jwt from "jsonwebtoken";

export function verifyUser(payload: string, secret: string) {
  const decoded = jwt.verify(payload, secret);
  if (decoded) {
    return decoded;
  }
  return undefined;
}
