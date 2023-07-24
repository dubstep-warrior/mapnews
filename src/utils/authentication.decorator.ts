import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { JwtPayload } from "./interfaces/jwtpayload.interface";
dotenv.config();

export const Auth = (userAttName?: string, articleResolution?: boolean) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const req = args[0];

      if (
        articleResolution &&
        ["/new", "/relevant", "/search"].includes(req.path)
      )
        return originalMethod.apply(this, args);

      const token = req.headers.authorization?.split(" ")[1];
      if (!token) throw "No token provided";

      try {
        const decoded = jwt.verify(
          token,
          process.env.SECRET_JWT_CODE!,
        ) as JwtPayload;
        if (userAttName) {
          req.body[userAttName] = JSON.stringify(
            new mongoose.Types.ObjectId(decoded.id),
          );
        }

        return originalMethod.apply(this, args);
      } catch (err) {
        throw "Invalid token";
      }
    };

    return descriptor;
  };
};
