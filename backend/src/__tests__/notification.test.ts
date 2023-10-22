import supertest from "supertest";
import ApplicationWrapper from "../application";
import mongoose, { ConnectOptions } from "mongoose";
import JsonWebToken from "jsonwebtoken";
import RedisHandler from "../clients/redis.client";

const app = ApplicationWrapper.instance;
jest.setTimeout(30000);

const user = {
  id: new mongoose.Types.ObjectId().toString(),
  email: "test@test.com",
};

beforeAll(async () => {
  await RedisHandler.setup();
  await mongoose.connect(process.env.MONGODB_CLUSTER_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);
});

afterAll(async () => {
  await RedisHandler.teardown();
  await mongoose.connection.close();
});

describe("notification", () => {
  describe("not authenticated", () => {
    describe("retrieve notifications", () => {
      it("should return 401", async () => {
        const { statusCode, body } = await supertest(app).get(
          "/api/v1/notification",
        );
        expect(statusCode).toBe(401);
        expect(body.success).toBe(false);
        expect(body).toHaveProperty("error");
      });
    });
  });

  describe("authenticated", () => {
    const jwt = JsonWebToken.sign(user, process.env.SECRET_JWT_CODE!);

    describe("retrieve notification", () => {
      it("should return 200", async () => {
        const { statusCode, body } = await supertest(app)
          .get("/api/v1/notification")
          .set("Authorization", `Bearer ${jwt}`);
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty("success");
        expect(body.success).toBe(true);
        expect(body).toHaveProperty("data");
        expect(body.data).toBeInstanceOf(Array);
      });
    });
  });
});
