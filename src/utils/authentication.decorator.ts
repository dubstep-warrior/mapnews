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
      ) {
        console.log("auth bypassed");
        return originalMethod.apply(this, args);
      }

      const token = req.headers.authorization?.split(" ")[1];
      console.log("Auth decorator called ", req.headers);
      if (!token) {
        console.log("Auth decorator called 2");
        throw "No token provided";
      }

      try {
        const decoded = jwt.verify(
          token,
          process.env.SECRET_JWT_CODE!
        ) as JwtPayload;
        // You can perform additional checks or operations here
        // based on the decoded token if needed
        console.log("decoded: ", decoded);
        console.log(" args", req.body);
        if (userAttName) {
          req.body[userAttName] = JSON.stringify(
            new mongoose.Types.ObjectId(decoded.id)
          );
        }

        return originalMethod.apply(this, args);
      } catch (err) {
        console.log("Auth decorator called 3");
        throw "Invalid token";
      }
    };

    return descriptor;
  };
};
