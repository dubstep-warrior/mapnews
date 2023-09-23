import supertest from "supertest";
import ApplicationWrapper from "../application";
import AuthService from "../services/AuthService";
import mongoose from "mongoose";
import JsonWebToken from "jsonwebtoken";
import ArticleService from "../services/ArticleService";
import RedisHandler from "../clients/redis.client";

const app = ApplicationWrapper.instance;
jest.setTimeout(30000);

const user = {
  id: new mongoose.Types.ObjectId().toString(),
  email: "test@test.com",
};

const articleInput = {
  category: "emergency",
  title: "emergency",
  location: {
    coordinates: [103.694179, 1.336777],
  },
  tags: ["test"],
  description: "Hello world",
};

const articlePayload = {
  ...articleInput,
  time: Date.now(),
  posted_by: user.id,
  likes: [],
};

beforeAll(async () => {
  return await RedisHandler.setup();
});

afterAll(async () => {
  return await RedisHandler.teardown();
});

describe("article", () => {
  describe("create article", () => {
    describe("not authenticated", () => {
      it("should return 401", async () => {
        const { statusCode, body } = await supertest(app)
          .post("/api/v1/article")
          .send({});
        expect(statusCode).toBe(401);
        expect(body.success).toBe(false);
        expect(body).toHaveProperty("error");
      });
    });

    describe("authenticated", () => {
      const jwt = JsonWebToken.sign(user, process.env.SECRET_JWT_CODE!);

      describe("When not all required fields are filled", () => {
        it("should return 500", async () => {
          const { statusCode, body } = await supertest(app)
            .post("/api/v1/article")
            .set("Authorization", `Bearer ${jwt}`)
            .send({});
          expect(statusCode).toBe(500);
          expect(body.success).toBe(false);
          expect(body).toHaveProperty("error");
        });
      });

      describe("When all required fields are filled", () => {
        it("should return 200", async () => {
          jest
            .spyOn(ArticleService, "createArticle")
            // @ts-ignore
            .mockReturnValueOnce(articlePayload);
          const { statusCode, body } = await supertest(app)
            .post("/api/v1/article")
            .set("Authorization", `Bearer ${jwt}`)
            .send(articleInput);
          expect(statusCode).toBe(200);
          expect(body).toEqual({ success: true, data: articlePayload });
        });
      });
    });
  });

  describe("retrieve article", () => {
    describe("not authenticated", () => {
      it("should return 401", async () => {
        const { statusCode, body } = await supertest(app).get(
          "/api/v1/article/self",
        );
        expect(statusCode).toBe(401);
        expect(body.success).toBe(false);
        expect(body).toHaveProperty("error");
      });

      it("should return 200 for bypassed checks", async () => {
        jest
          .spyOn(ArticleService, "resolveArticles")
          // @ts-ignore
          .mockReturnValueOnce([articlePayload]);
        const { statusCode, body } = await supertest(app).get(
          "/api/v1/article/relevant",
        );
        expect(statusCode).toBe(200);
        expect(body).toEqual({ success: true, data: [articlePayload] });
      });
    });

    describe("authenticated", () => {
      const jwt = JsonWebToken.sign(user, process.env.SECRET_JWT_CODE!);

      it("should return 200", async () => {
        jest
          .spyOn(ArticleService, "resolveArticles")
          // @ts-ignore
          .mockReturnValueOnce([articlePayload]);
        const { statusCode, body } = await supertest(app)
          .get("/api/v1/article/self")
          .set("Authorization", `Bearer ${jwt}`);
        expect(statusCode).toBe(200);
        expect(body).toEqual({ success: true, data: [articlePayload] });
      });
    });
  });
});
