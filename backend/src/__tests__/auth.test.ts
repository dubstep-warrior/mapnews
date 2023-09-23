import supertest from "supertest";
import ApplicationWrapper from "../application";
import Bcrypt from "bcryptjs";
import AuthService from "../services/AuthService";
import mongoose from "mongoose";

const app = ApplicationWrapper.instance;
jest.setTimeout(30000);

const userPayload = {
  token: "",
  user: {
    _id: new mongoose.Types.ObjectId().toString(),
    email: "test@test.com",
  },
};

const loginInput = {
  email: "test@test.com",
  password: "password",
};

const registerInput = {
  ...loginInput,
  confirmPassword: loginInput.password,
};

describe("auth", () => {
  describe("auth login failure", () => {
    it("should return 401", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/api/v1/auth/login")
        .send({});
      expect(statusCode).toBe(401);
      expect(body.success).toBe(false);
      expect(body).toHaveProperty("error");
    });
  });

  describe("auth login success", () => {
    it("should return 200", async () => {
      const userLoginMock = jest
        .spyOn(AuthService, "userLogin")
        // @ts-ignore
        .mockReturnValueOnce(userPayload);

      const { statusCode, body } = await supertest(app)
        .post("/api/v1/auth/login")
        .send(loginInput);
      expect(statusCode).toBe(200);
      expect(body).toEqual({ success: true, data: userPayload });
      expect(userLoginMock).toHaveBeenCalledWith(loginInput);
    });
  });

  describe("auth registration failure", () => {
    it("should return 409", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/api/v1/auth/register")
        .send({});
      expect(statusCode).toBe(400);
      expect(body.success).toBe(false);
      expect(body).toHaveProperty("error");
    });
  });

  describe("auth registration success", () => {
    it("should return 200", async () => {
      const userRegistrationMock = jest
        .spyOn(AuthService, "createUser")
        // @ts-ignore
        .mockReturnValueOnce(userPayload);

      const { statusCode, body } = await supertest(app)
        .post("/api/v1/auth/register")
        .send(registerInput);
      expect(statusCode).toBe(200);
      expect(body).toEqual({ success: true, data: userPayload });
      expect(userRegistrationMock).toHaveBeenCalledWith(registerInput);
    });
  });
});
