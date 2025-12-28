import request from "supertest";
import app from "../src/app.js";
import mongoose from "mongoose";

const testUser = {
  name: "Test User",
  email: `testuser_${Date.now()}@example.com`,
  password: "password123",
};


describe("Auth API", () => {

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/v1/auth/register")
      .send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe(testUser.email);
  });

  it("should login user and return tokens", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.accessToken).toBeDefined();
    expect(res.body.refreshToken).toBeDefined();
  });
});
