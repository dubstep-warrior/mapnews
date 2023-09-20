import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { JwtPayload } from "../interfaces/jwtpayload.interface";
import bypass from "../resolvers/bypass-resolver";
dotenv.config();

export const Auth = (userAttName?: string) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const req = args[0];
      const token = req.headers.authorization?.split(" ")[1];

      try {
        if (!token) throw "No token provided";
        const decoded = jwt.verify(
          token,
          process.env.SECRET_JWT_CODE!,
        ) as JwtPayload;
        if (userAttName) {
          req.body[userAttName] = decoded.id;
        }

        return originalMethod.apply(this, args);
      } catch (err) {
        if (bypass(req.path)) {
          console.log(propertyKey, req.path);
          console.log("yes we are bypassing");
          return originalMethod.apply(this, args);
        } else throw "Invalid token:" + err;
      }
    };

    return descriptor;
  };
};
