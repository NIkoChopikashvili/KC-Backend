import supertest from "supertest";
import { initializeDatabase } from "../db";
import { registerUser, verifyOtp } from "../services";
import { sampleUser } from "./sampleData";
import { describe, beforeAll, test, expect } from "@jest/globals";

import { app } from "../index";

describe("auth Endpoints", () => {
  beforeAll(async () => {
    await initializeDatabase();
  });

  describe("auth required tests", () => {
    let token: string;
    beforeAll(async () => {
      const { otpId, otp } = await registerUser(sampleUser.phone);
      const verifyData = await verifyOtp(otpId, otp);
      token = verifyData.token;
    });

    test("check token", async () => {
      const res = await supertest(app)
        .get("/check-token")
        .set({ Authorization: `Bearer ${token}` });

      expect(res.statusCode).toEqual(200);
    });

    test("should give 401 if token is wrong while checking token", async () => {
      const res = await supertest(app)
        .get("/check-token")
        .set({ Authorization: "Bearer WrongToken" });
      expect(res.statusCode).toEqual(401);
    });

    test("should give 401 if token is not set while checking token", async () => {
      const res = await supertest(app).get("/check-token");
      expect(res.statusCode).toEqual(401);
    });

    test("me", async () => {
      const res = await supertest(app)
        .get("/me")
        .set({ Authorization: `Bearer ${token}` });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("result");
      expect(res.body).toHaveProperty("user");
    });

    test("should give 401 if token is wrong on /me", async () => {
      const res = await supertest(app)
        .get("/me")
        .set({ Authorization: "Bearer WrongToken" });
      expect(res.statusCode).toEqual(401);
    });

    test("should give 401 if token is not set on /me", async () => {
      const res = await supertest(app).get("/me");
      expect(res.statusCode).toEqual(401);
    });
  });
});
