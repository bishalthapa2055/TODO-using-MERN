import request from "supertest";
import { app } from "../../app";

import "../setup";

describe("For Delete methods", () => {
  it("should be defined", async () => {
    const res = await request(app).delete("/api/v1/todo");
    expect(res).toBeDefined();
  });
  it("should return 200 after sucessfully deleted", async () => {
    const todoData = {
      title: "task-test",
      description: "there is window i dont know",
    };

    const createTodo = await request(app).post("/api/v1/todo").send(todoData);
    expect(createTodo).toBeDefined();
    expect(createTodo.statusCode).toBe(200);
    expect(createTodo.body.data).toHaveProperty("id");
    console.log(createTodo.body.data.id);

    const deleteTodo = await request(app).delete(
      `/api/v1/todo/${createTodo.body.data.id}`
    );
    expect(deleteTodo.statusCode).toBe(200);
    expect(deleteTodo.body.status).toBeTruthy();
    expect(deleteTodo.body.message).toBe("Todo Deleted Sucessfully");
  });
  it("should return 400 if invalid ID is proveided", async () => {
    const todoData = {
      title: "task-test",
      description: "there is window i dont know",
    };

    const createTodo = await request(app).post("/api/v1/todo").send(todoData);
    expect(createTodo).toBeDefined();
    expect(createTodo.statusCode).toBe(200);
    expect(createTodo.body.data).toHaveProperty("id");
    console.log(createTodo.body.data.id);

    const notId = "6416741d80a1ccd678999922";
    const res = await request(app).delete(`/api/v1/todo/${notId}`);
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBeFalsy();
    expect(res.body.message).toBe("Todo doesnot exists");
  });
});
