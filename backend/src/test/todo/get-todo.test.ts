import request from "supertest";
import { app } from "../../app";
import "../setup";

describe("for getAllTodo methods", () => {
  it("should be defined", async () => {
    const res = await request(app).get("/api/v1/todo");
    expect(res).toBeDefined();
  });
  it("should Display the data present in database", async () => {
    const res = await request(app).get("/api/v1/todo");
    expect(res.body).toBeDefined();
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
    expect(res.body.data).toBeDefined();
    expect(typeof res.body.data).toBe("object");
  });
});
