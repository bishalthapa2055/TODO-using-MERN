import request from "supertest";
import { app } from "../../app";

import "../setup";

describe("Create Todo Methods", () => {
  it("should be defined", async () => {
    const res = await request(app).post("/api/v1/todo");
    expect(res).toBeDefined();
  });
  it("should create Todo sucessfully", async () => {
    const todoData = {
      title: "Task-test",
      description: "There is window but I dont knnow",
    };
    const res = await request(app).post("/api/v1/todo").send(todoData);

    expect(res).toBeDefined();
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
    expect(res.body.data).toBeDefined();
    expect(res.body.message).toBe("Todo Created Sucessfully");
    expect(res.body.data).toHaveProperty("id");
    expect(typeof res.body.data.title).toBe("string");

    expect(res.body.data.title).toBe(todoData.title);
    expect(res.body.data.description).toBe(todoData.description);
  });
  it("should check title  is provided or not", async () => {
    const todoData = {
      description: "thekjadfjajfadkfj",
    };
    const res = await request(app).post("/api/v1/todo").send(todoData);

    expect(res.statusCode).toBe(400);
    expect(res.body).toBeDefined();
    expect(res.body.status).toBeFalsy();
    expect(res.body.message).toBe("Title Field is required");
  });
  it("should check Description  is provided or not", async () => {
    const todoData = {
      title: "task-test",
    };
    const res = await request(app).post("/api/v1/todo").send(todoData);

    expect(res.statusCode).toBe(400);
    expect(res.body).toBeDefined();
    expect(res.body.status).toBeFalsy();
    expect(res.body.message).toBe("Description field is required");
  });
  it("should return 400 if title is less than 4 character", async () => {
    const todoData = {
      title: "tas",
      description: "jhadhfadfjdaj",
    };
    const res = await request(app).post("/api/v1/todo").send(todoData);

    expect(res.statusCode).toBe(400);
    expect(res.body).toBeDefined();
    expect(res.body.status).toBeFalsy();
    expect(res.body.message).toBe("Title must be greater than 4 character");
  });
  it("should return 400 if title is less than 4 character", async () => {
    const todoData = {
      title: "tas",
      description: "jhadhfadfjdaj",
    };
    const res = await request(app).post("/api/v1/todo").send(todoData);

    expect(res.statusCode).toBe(400);
    expect(res.body).toBeDefined();
    expect(res.body.status).toBeFalsy();
    expect(res.body.message).toBe(
      "Descritpion must be greater than 10 character"
    );
  });
});
