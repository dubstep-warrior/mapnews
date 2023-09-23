import supertest from "supertest";
import ApplicationWrapper from "../application";
import mongoose, { ConnectOptions } from "mongoose";

const app = ApplicationWrapper.instance;
jest.setTimeout(30000);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_CLUSTER_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("config", () => {
  describe("retrieve configs", () => {
    it("should return 200", async () => {
      const { statusCode, body } = await supertest(app).get("/api/v1/config");
      expect(statusCode).toBe(200);
      expect(body).toHaveProperty("success");
      expect(body.success).toBe(true);
      expect(body).toHaveProperty("data");
      expect(body.data).toBeInstanceOf(Array);
    });
  });
});
