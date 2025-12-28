import request from "supertest";
import app from "../src/app.js";

let token;

const testUser = {
  name: "Project User",
  email: "projectuser@example.com",
  password: "password123",
};

describe("Projects API", () => {
  beforeAll(async () => {
    // Register user first
    await request(app)
      .post("/api/v1/auth/register")
      .send(testUser);

    // Login
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    token = res.body.accessToken;
  });

  it("should create a project", async () => {
    const res = await request(app)
      .post("/api/v1/projects")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Project",
        description: "Test description",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Test Project");
  });

  it("should list user projects", async () => {
    const res = await request(app)
      .get("/api/v1/projects")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
