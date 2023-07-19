import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const Auth = () => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const req = args[0];
      const token = req.headers.authorization?.split(" ")[1];
      console.log("Auth decorator called ", req.headers);
      if (!token) {
        console.log("Auth decorator called 2");
        throw "No token provided";
      }

      try {
        const decoded = jwt.verify(token, process.env.SECRET_JWT_CODE!);
        // You can perform additional checks or operations here
        // based on the decoded token if needed
        console.log(decoded);

        return originalMethod.apply(this, args);
      } catch (err) {
        console.log("Auth decorator called 3");
        throw "Invalid token"
      }
    };

    return descriptor;
  };
};
