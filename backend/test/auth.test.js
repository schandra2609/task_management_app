import request from "supertest";
import app from "../src/server.js";
import { beforeEach, jest } from "@jest/globals";

jest.setTimeout(15000);
describe("Auth API", () => {
    // Register tests
    describe("POST /api/v1/auth/register", () => {
        // Successful user registration
        it("should register a new user successfully (201)", async () => {
            const res = await request(app)
                .post("/api/v1/auth/register")
                .send({
                    name: "Test User",
                    email: "register@test.com",
                    password: "password123",
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data.token).toBeDefined();
            expect(res.body.data.newUser.email).toBe("register@test.com");
        });

        // Registration fails for missing fields
        it("should fail for missing fields (400)", async () => {
            const res = await request(app)
                .post("/api/v1/auth/register")
                .send({
                    name: "",
                    email: "register@test.com",
                    password: "password123",
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.success).toBe(false);
        });

        // Registration fails for existing user
        it("should fail for existing user (409)", async () => {
            await request(app)
                .post("/api/v1/auth/register")
                .send({
                    name: "Test User",
                    email: "register@test.com",
                    password: "password123",
                });
            const res = await request(app)
                .post("/api/v1/auth/register")
                .send({
                    name: "Test User",
                    email: "register@test.com",
                    password: "password123",
                });
            
            expect(res.statusCode).toBe(409);
            expect(res.body.success).toBe(false);
        });
    });

    // Login tests
    describe("POST /api/v1/auth/login", () => {
        // Create a user before logging in
        beforeEach(async () => {
            await request(app)
                .post("/api/v1/auth/register")
                .send({
                    name: "Login User",
                    email: "login@test.com",
                    password: "password123",
                });
        });

        // Successful user login
        it("should login successfully with valid credentials (200)", async () => {
            const res = await request(app)
                .post("/api/v1/auth/login")
                .send({
                    email: "login@test.com",
                    password: "password123",
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data).toBeDefined();
        });

        // Login fails for invalid credentials
        it("should fail for invalid credentials (401)", async () => {
            const res = await request(app)
                .post("/api/v1/auth/login")
                .send({
                    email: "login@test.com",
                    password: "wrongpassword",
                });
            
            expect(res.statusCode).toBe(401);
            expect(res.body.success).toBe(false);
        });
        
        // Login fails for missing fields
        it("should fail for missing fields (400)", async () => {
            const res = await request(app)
                .post("/api/v1/auth/login")
                .send({
                    email: "",
                    password: "password123",
                });
            
            expect(res.statusCode).toBe(400);
            expect(res.body.success).toBe(false);
        });
    });
});