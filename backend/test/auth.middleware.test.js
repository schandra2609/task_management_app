import request from "supertest";
import { jest } from "@jest/globals";
import app from "../src/server.js";

jest.setTimeout(15000);
describe("Auth Middleware (verifyJWT)", () => {
    let token;
    // Create a user and store the token before each test
    beforeEach(async () => {
        const res = await request(app)
            .post("/api/v1/auth/register")
            .send({
                name: "Test User",
                email: "user@test.com",
                password: "password123",
            });
        token = res.body.data.token;
    });

    // Successful task creation
    it("should allow request with valid token (201)", async () => {
        const res = await request(app)
            .post("/api/v1/tasks")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Authorized Task",
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data.title).toBe("Authorized Task");
    });

    // Task creation fails without token
    it("should reject request without token (401)", async () => {
        const res = await request(app)
            .post("/api/v1/tasks")
            .send({
                title: "Test Task",
            });
        
        expect(res.statusCode).toBe(401);
        expect(res.body.success).toBe(false);
    });

    // Task creation fails for invalid token
    it("should reject request for invalid token (401)", async () => {
        const res = await request(app)
            .post("/api/v1/tasks")
            .set("Authorization", "Bearer invalidtoken")
            .send({
                title: "Test Task",
            });

        expect(res.statusCode).toBe(401);
        expect(res.body.success).toBe(false);
    });
});