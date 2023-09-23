import supertest from "supertest";
import ApplicationWrapper from "../application";
import Bcrypt from "bcryptjs";
import AuthService from "../services/AuthService";
import mongoose, { ConnectOptions } from "mongoose";

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
  password: "test",
};

const registerInput = {
  ...loginInput,
  confirmPassword: loginInput.password,
};

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_CLUSTER_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);
});

afterAll(async () => {
  await mongoose.connection.close();
});

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
      const { statusCode, body } = await supertest(app)
        .post("/api/v1/auth/login")
        .send(loginInput);
      expect(statusCode).toBe(200);
      expect(body).toHaveProperty("success");
      expect(body.success).toBe(true);
      expect(body).toHaveProperty("data");
      expect(body.data).toHaveProperty("token");
      expect(typeof body.data.token).toBe("string");
      expect(body.data).toHaveProperty("user");
      expect(body.data.user).toBeInstanceOf(Object);
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
