import request from "supertest";
import { jest } from "@jest/globals";
import app from "../src/server.js";

jest.setTimeout(15000);
describe("Task API", () => {
    let token_1, token_2;
    // Create a user and store the token before each test
    beforeEach(async () => {
        const userRes_1 = await request(app)
            .post("/api/v1/auth/register")
            .send({
                name: "Task Owner",
                email: "owner@test.com",
                password: "password123",
            });
        token_1 = userRes_1.body.data.token;

        const userRes_2 = await request(app)
            .post("/api/v1/auth/register")
            .send({
                name: "Other User",
                email: "user@test.com",
                password: "password123",
            });
        token_2 = userRes_2.body.data.token;
    });

    // All POST requests on /api/v1/tasks
    describe("POST /api/v1/tasks", () => {
        // Successful task creation
        it("should create a new task (201)", async () => {
            const res = await request(app)
                .post("/api/v1/tasks")
                .set("Authorization", `Bearer ${token_1}`)
                .send({
                    title: "Test Task",
                    description: "Test Description",
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data.title).toBe("Test Task");
        });

        // Task creation fails if title is less than 3 characters
        it("should fail if title is less than 3 characters (400)", async () => {
            const res = await request(app)
                .post("/api/v1/tasks")
                .set("Authorization", `Bearer ${token_1}`)
                .send({ title: "Ab" });

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toContain("shorter than the minimum allowed length");
        });

        // Task creation fails for not listed status (400)
        it("should fail if status is not in enum [PENDING, IN-PROGRESS, COMPLETED] (400)", async () => {
            const res = await request(app)
                .post("/api/v1/tasks")
                .set("Authorization", `Bearer ${token_1}`)
                .send({ title: "Valid Title", status: "DOING_STUFF" });

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toContain("is not a valid enum value");
        });

        // Task creation fails if no title is provided
        it("should fail to create task without title (400)", async () => {
            const res = await request(app)
                .post("/api/v1/tasks")
                .set("Authorization", `Bearer ${token_1}`)
                .send({
                    description: "No title",
                });

            expect(res.statusCode).toBe(400);
        });
    });

    // Task Ownership Security
    describe("PATCH /api/v1/tasks/:id\n    DELETE /api/v1/tasks/:id\n    (Task Ownership Security)", () => {
        let taskId;
        // Create a new task and store the task ID before each request
        beforeEach(async () => {
            // Create a task as the primary user
            const task = await request(app)
                .post("/api/v1/tasks")
                .set("Authorization", `Bearer ${token_1}`)
                .send({ title: "Private Task" });
            taskId = task.body.data._id;
        });

        // Prevents user B from updating user A's task
        it("should prevent User B from updating User A's task", async () => {
            const res = await request(app)
                .patch(`/api/v1/tasks/${taskId}`)
                .set("Authorization", `Bearer ${token_2}`)
                .send({ title: "Hacked Title" });

            expect(res.statusCode).toBe(404);
            
            // Verify title didn't actually change
            const checkTask = await request(app)
                .get("/api/v1/tasks")
                .set("Authorization", `Bearer ${token_1}`);
            const theTask = checkTask.body.data.find(t => t._id === taskId);
            expect(theTask.title).toBe("Private Task");
        });

        // Prevents user B from deleting user A's task
        it("should prevent User B from deleting User A's task", async () => {
            const res = await request(app)
                .delete(`/api/v1/tasks/${taskId}`)
                .set("Authorization", `Bearer ${token_2}`);

            expect(res.statusCode).toBe(404);
        });
    });

    // All GET requests on /api/v1/tasks
    describe("GET /api/v1/tasks", () => {
        // Successful tasks retrieve
        it("should fetch all tasks (200)", async () => {
            await request(app)
                .post("/api/v1/tasks")
                .set("Authorization", `Bearer ${token_1}`)
                .send({ title: "Task 1" });

            const res = await request(app)
                .get("/api/v1/tasks")
                .set("Authorization", `Bearer ${token_1}`);

            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    // All PATCH requests on /api/v1/tasks/:id
    describe("PATCH /api/v1/tasks/:id", () => {
        // Successful updation of a task
        it("should update a task (200)", async () => {
            const task = await request(app)
                .post("/api/v1/tasks")
                .set("Authorization", `Bearer ${token_1}`)
                .send({ title: "Old Title" });

            const taskId = task.body.data._id;

            const res = await request(app)
                .patch(`/api/v1/tasks/${taskId}`)
                .set("Authorization", `Bearer ${token_1}`)
                .send({ title: "Updated Title", status: "COMPLETED" });

            expect(res.statusCode).toBe(200);
            expect(res.body.data.title).toBe("Updated Title");
            expect(res.body.data.status).toBe("COMPLETED");
        });
    });

    // All DELETE requests on /api/v1/tasks/:id
    describe("DELETE /api/v1/tasks/:id", () => {
        // Successful deletion of a task
        it("should delete a task (200)", async () => {
            const task = await request(app)
                .post("/api/v1/tasks")
                .set("Authorization", `Bearer ${token_1}`)
                .send({ title: "To be deleted" });
            const taskId = task.body.data._id;

            const res = await request(app)
                .delete(`/api/v1/tasks/${taskId}`)
                .set("Authorization", `Bearer ${token_1}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.message).toContain("successfully");
        });

        // Task deletion fails for invalid task ID
        it("should fail for non-existent task ID (404)", async () => {
            const fakeId = "60d5f2f1f1d1f1d1f1d1f1d1";
            const res = await request(app)
                .delete(`/api/v1/tasks/${fakeId}`)
                .set("Authorization", `Bearer ${token_1}`);

            expect(res.statusCode).toBe(404);
        });
    });
});